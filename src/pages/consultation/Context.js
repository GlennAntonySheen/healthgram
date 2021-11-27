import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { useHistory } from 'react-router-dom';

const SocketContext = createContext();

const socket = io('http://localhost:5000');
// const socket = io('https://warm-wildwood-81069.herokuapp.com');

const ContextProvider = ({ children }) => {
	const [callAccepted, setCallAccepted] = useState(false);
	const [callEnded, setCallEnded] = useState(false);
	const [stream, setStream] = useState();
	const [name, setName] = useState('');
	const [call, setCall] = useState({});
	const [me, setMe] = useState('');
	const [prescriptions, setPrescriptions] = useState('');
	const [showPrescriptions, setShowPrescriptions] = useState(false);

	const myVideo = useRef();
	const userVideo = useRef();
	const connectionRef = useRef();
	
    const history = useHistory();

	// const bookingDetails = async () => {
    //     let response= await fetch("http://localhost:8080/healthgram/test.php",{
    //         method:"POST",
    //         header:{"Content-Type": "application/json"},
    //         body:JSON.stringify({"query":`SELECT Booking_Id, tbl_booking.Pat_Id, tbl_booking.Doc_Id, Pres_Id, Booking_Amount, Booking_Date, Booking_Status, tbl_patient.Username AS Pat_Username, Pat_Name, Pat_Phone_No, Pat_Gender, Sp_Name, tbl_doctor.Username AS Doc_Username, Doc_Name, Doc_Phone_No, Doc_Gender, Doc_Fee FROM tbl_booking JOIN tbl_patient ON tbl_patient.Pat_Id = tbl_booking.Pat_Id JOIN tbl_doctor ON tbl_doctor.Doc_Id=tbl_booking.Doc_Id JOIN tbl_doctor_category on tbl_doctor_category.Sp_Id=tbl_doctor.Sp_Id WHERE tbl_booking.Booking_Id=${bookingDetails[0].Booking_Id}`})
    //     });
    //     let table = await response.json();
    //     setPaymentDetails(table)
    //     console.log('Got payment details')
    //     console.log(paymentDetails)
	// }

	useEffect(() => {

		// Reload page at first time
		if (sessionStorage.getItem('Refreshed') == null) {
			sessionStorage.setItem('Refreshed', 'true')
			console.log('reloaded');
			window.location.reload();
		}

		navigator.mediaDevices.getUserMedia({ video: true, audio: true })
			.then((currentStream) => {
				setStream(currentStream);

				myVideo.current.srcObject = currentStream;
			});

		socket.on('me', async (id) => {
			setMe(id)
			
			// Posting join link
            if (sessionStorage.getItem('UserType') == 'doctor') {
                let res= await fetch("http://localhost:8080/healthgram/test.php",{
                    method:"POST",
                    header:{"Content-Type": "application/json"},
                    body:JSON.stringify({"query":`SELECT Doc_Name FROM tbl_doctor WHERE Doc_Id=(SELECT Doc_Id FROM tbl_booking WHERE Booking_Id=${window.location.href.split('/')[4]}); 
					UPDATE tbl_booking SET Consultation_Link='${id}' WHERE Booking_Id=${window.location.href.split('/')[4]};
					UPDATE tbl_prescription SET Pres_Date = current_timestamp() WHERE tbl_prescription.Pres_Id =(SELECT Pres_Id FROM tbl_booking WHERE Booking_Id=${window.location.href.split('/')[4]}); `})
                });
                let table = await res.json();
                setName(`Dr. ${table[0].Doc_Name}`)   
            } else if (sessionStorage.getItem('UserType') == 'patient') {
                let response= await fetch("http://localhost:8080/healthgram/test.php",{
                    method:"POST",
                    header:{"Content-Type": "application/json"},
                    body:JSON.stringify({"query":`SELECT Pat_Name FROM tbl_patient WHERE Pat_Id=(SELECT Pat_Id FROM tbl_booking WHERE Booking_Id=${window.location.href.split('/')[4]});`})
                });   
                let table = await response.json();
                setName(table[0].Pat_Name)            
            }	
		});

		socket.on('callUser', ({ from, name: callerName, signal }) => {
			setCall({ isReceivingCall: true, from, name: callerName, signal });
			
				// answerCall()
			  
		});
	}, []);

	const answerCall = () => {
		setCallAccepted(true);

		const peer = new Peer({ initiator: false, trickle: false, stream });

		peer.on('signal', (data) => {
			socket.emit('answerCall', { signal: data, to: call.from });
		});

		peer.on('stream', (currentStream) => {
			userVideo.current.srcObject = currentStream;
		});

		peer.signal(call.signal);

		connectionRef.current = peer;
	};

	const callUser = (id) => {
		const peer = new Peer({ initiator: true, trickle: false, stream });

		peer.on('signal', (data) => {
			socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
		});

		peer.on('stream', (currentStream) => {
			userVideo.current.srcObject = currentStream;
		});

		socket.on('callAccepted', (signal) => {
			setCallAccepted(true);

			peer.signal(signal);
		});

		connectionRef.current = peer;
	};

	const leaveCall = async () => {
		setCallEnded(true);

        if (connectionRef.current !== undefined) {
            connectionRef.current.destroy()
        }

		// window.location.reload();
        
        sessionStorage.removeItem('Refreshed');
        
        if (sessionStorage.getItem('UserType') == 'doctor') {
            let res= await fetch("http://localhost:8080/healthgram/test.php",{
                method:"POST",
                header:{"Content-Type": "application/json"},
                body:JSON.stringify({"query":`UPDATE tbl_booking SET Consultation_Link=NULL, Booking_Status='completed' WHERE Booking_Id=${window.location.href.split('/')[4]};`})
            });
            history.push('/doctor');
        } else if (sessionStorage.getItem('UserType') == 'patient') {
            history.push('/patient');
        }
	};

	return (
		<SocketContext.Provider value={{
			call,
			callAccepted,
			myVideo,
			userVideo,
			stream,
			name,
			setName,
			callEnded,
			me,
			callUser,
			leaveCall,
			answerCall,
			prescriptions, 
			setPrescriptions,
			showPrescriptions, 
			setShowPrescriptions
		}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export { ContextProvider, SocketContext };
