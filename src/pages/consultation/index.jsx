import React, { useEffect, useRef, useState } from "react"
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';
import App from './App';
import { ContextProvider } from './Context';
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import io from "socket.io-client"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import CallEndIcon from '@mui/icons-material/CallEnd';
import PhoneIcon from "@material-ui/icons/Phone"


export function Consultation(props) {
    document.title = "Consultation"

    return ( <>
        <ContextProvider>
            <App />
        </ContextProvider>
        {/* <ControlWrapper>
            {(<IconButton color="primary" size="456px" onClick={() => leaveCall()}><CallEndIcon /></IconButton>)}
        </ControlWrapper> */}
    </>)
//     const history = useHistory();
//     const [me, setMe] = useState("")
//     const [stream, setStream] = useState()
//     const [receivingCall, setReceivingCall] = useState(false)
//     const [caller, setCaller] = useState("")
//     const [callerSignal, setCallerSignal] = useState()
//     const [callAccepted, setCallAccepted] = useState(false)
//     const [idToCall, setIdToCall] = useState("")
//     const [callEnded, setCallEnded] = useState(false)
//     const [name, setName] = useState("")
//     const myVideo = useRef()
//     const userVideo = useRef()
//     const connectionRef = useRef()
    
    

// // let socket = io.connect('http://localhost:5000')
// const socket = io('https://warm-wildwood-81069.herokuapp.com');
//     // Reload page at first time
//     // if (sessionStorage.getItem('Refreshed') == null) {
//     //     sessionStorage.setItem('Refreshed', 'true')
//     //     window.location.reload();
//     // }

//     useEffect(async () => {
// 		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
// 			setStream(stream)
// 			myVideo.current.srcObject = stream
// 		})

// 	    socket.on("me", async (id) => {
// 			setMe(id)
//             console.log('mmmmmme')
//             // Posting join link
//             if (sessionStorage.getItem('UserType') == 'doctor') {
//                 let res= await fetch("http://localhost/healthgram/test.php",{
//                     method:"POST",
//                     header:{"Content-Type": "application/json"},
//                     body:JSON.stringify({"query":`UPDATE tbl_booking SET Consultation_Link='${id}' WHERE Booking_Id=${window.location.href.split('/')[4]};`})
//                 });
//             } else if (sessionStorage.getItem('UserType') == 'patient') {
//                 let response= await fetch("http://localhost/healthgram/test.php",{
//                     method:"POST",
//                     header:{"Content-Type": "application/json"},
//                     body:JSON.stringify({"query":`SELECT Consultation_Link FROM tbl_booking WHERE Booking_Id=${window.location.href.split('/')[4]};`})
//                 });
//                 let table = await response.json();
//                 console.log(table[0].Consultation_Link)
//                 // callUser(table[0].Consultation_Link)
//                 // answerCall()
                
//             }		
//         })

// 		socket.on("callUser", (data) => {
// 			setReceivingCall(true)
// 			setCaller(data.from)
// 			setName(data.name)
// 			setCallerSignal(data.signal)
// 		})
// 	}, [])

//     const callUser = (id) => {
// 		const peer = new Peer({
// 			initiator: true,
// 			trickle: false,
// 			stream: stream
// 		})
// 		peer.on("signal", (data) => {
// 			socket.emit("callUser", {
// 				userToCall: id,
// 				signalData: data,
// 				from: me,
// 				name: name
// 			})
// 		})
// 		peer.on("stream", (stream) => {	
//             console.log('this is inside peer funciton')		
// 			userVideo.current.srcObject = stream			
// 		})
// 		socket.on("callAccepted", (signal) => {
// 			setCallAccepted(true)
// 			peer.signal(signal)
// 		})

// 		connectionRef.current = peer
// 	}

//     const answerCall =() =>  {
// 		setCallAccepted(true)
// 		const peer = new Peer({
// 			initiator: false,
// 			trickle: false,
// 			stream: stream
// 		})
// 		peer.on("signal", (data) => {
// 			socket.emit("answerCall", { signal: data, to: caller })
// 		})
// 		peer.on("stream", (stream) => {
//             // console.log(stream);
// 			userVideo.current.srcObject = stream
// 		})

// 		peer.signal(callerSignal)
// 		connectionRef.current = peer
// 	}

//     const leaveCall = async () => {
//         setCallEnded(true)
//         if (connectionRef.current !== undefined) {
//             connectionRef.current.destroy()
//         }
        
//         sessionStorage.removeItem('Refreshed');
        
//         if (sessionStorage.getItem('UserType') == 'doctor') {
//             // let res= await fetch("http://localhost/healthgram/test.php",{
//             //     method:"POST",
//             //     header:{"Content-Type": "application/json"},
//             //     body:JSON.stringify({"query":`UPDATE tbl_booking SET Consultation_Link=NULL WHERE Booking_Id=${window.location.href.split('/')[4]};`})
//             // });
//             history.push('/doctor');
//         } else if (sessionStorage.getItem('UserType') == 'patient') {
//             history.push('/patient');
//         }
//     }

//     return (
//         <>
//         <ConstulationWrapper> 
//             <button onClick={() => console.log(me)}>hfdhfvbj</button>
//             {/* <VideoWrapper>
//                 <Video>
//                     {stream && <video playsInline muted ref={myVideo} autoPlay style={{ height: "200px" }} />}
//                 </Video>
//                 <Video>
//                     {callAccepted && !callEnded ? <video playsInline ref={userVideo} autoPlay  /> : null}
//                 </Video>
//             </VideoWrapper> */}
//             <ControlWrapper>
//                 {(<IconButton color="primary" size="456px" onClick={() => leaveCall()}><CallEndIcon /></IconButton>)}
//             </ControlWrapper>
//         </ConstulationWrapper>
//         <>
//         <div className="container">
// 			<div className="video-container">
// 				<div className="video">
// 					{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
// 				</div>
// 				<div className="video">
// 					{callAccepted && !callEnded ?
// 					<video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
// 					null}
// 				</div>
// 			</div>
// 			<div className="myId">
// 				<TextField
// 					id="filled-basic"
// 					label="Name"
// 					variant="filled"
// 					value={name}
// 					onChange={(e) => setName(e.target.value)}
// 					style={{ marginBottom: "20px" }}
// 				/>
// 				<CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
// 					<Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
// 						Copy ID
// 					</Button>
// 				</CopyToClipboard>

// 				<TextField
// 					id="filled-basic"
// 					label="ID to call"
// 					variant="filled"
// 					value={idToCall}
// 					onChange={(e) => setIdToCall(e.target.value)}
// 				/>
// 				<div className="call-button">
// 					{callAccepted && !callEnded ? (
// 						<Button variant="contained" color="secondary" onClick={leaveCall}>
// 							End Call
// 						</Button>
// 					) : (
// 						<IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
// 							<PhoneIcon fontSize="large" />
// 						</IconButton>
// 					)}
// 					{idToCall}
// 				</div>
// 			</div>
// 			<div>
// 				{receivingCall && !callAccepted ? (
// 						<div className="caller">
// 						<h1 >{name} is calling...</h1>
// 						<Button variant="contained" color="primary" onClick={answerCall}>
// 							Answer
// 						</Button>
// 					</div>
// 				) : null}
// 			</div>
// 		</div>
//         </>
//         </>
//     )
}