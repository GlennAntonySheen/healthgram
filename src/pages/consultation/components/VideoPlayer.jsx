import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'
import { SocketContext } from '../Context';
import LogoImg from '../../../assets/logo/Technology to Customize Your Design _ GraphicSprings - Brave 20-Jun-21 11_44_14 AM.png';
import TextField from '@mui/material/TextField';
import jsPDF from 'jspdf';

const Wrapper = styled.div`
	height: 89vh;
	width: 100%;
	display: flex;
	align-items: center;
	margin-left: auto;
	margin-right: auto;
	/* background-color: grey; */
`;

const VideoWrapper = styled.div`
    height: 100%;
    width: auto;
    display: flex;
	flex: 1;
	flex-wrap: wrap;
    justify-content: ${ props => props.showPrescriptions ? 'flex-end' : 'center'};
	align-items: center;
    /* background-color: red; */
`;

const Canvas = styled.div`
	/* max-height: 600px; */
    height: ${ props => props.showPrescriptions ? '40%' : 'fit-content'}; 
    width: ${ props => props.showPrescriptions ? '70%' : 'fit-content'};;
	display: flex;
	align-items: center;
	margin: 30px;
	overflow: hidden;
	border-radius: 1rem;
	background-color: transparent;
    box-shadow: 0 4px 14px 0 rgb(0 118 255 / 39%);

    video {
        height: 150%;
		width: 100%;
    }
`;

const Prescription = styled.div`
	max-height: 560px;
    /* height: 100%;  */
	width: 500px;
	margin: 30px;
	padding: 15px;
	display: flex;
	flex-direction: column;
	flex: 1;
	flex-grow: 1;
	border-radius: 1rem;
	/* background-color: pink; */
    box-shadow: 0 9px 24px rgb(0 0 0 / 12%), 0 9px 24px rgb(0 0 0 / 12%);
	overflow:auto ;
`;

const PrescriptionHeader = styled.div`
	height: 100px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	/* background-color: green; */
`;

const LogoWrapper = styled.div`
    height: 100%;
    width: fit-content;
    display: flex;
    align-items: center;
    /* background-color: red; */

    img {
        height: 100%;
        flex-grow: 1;
        border-radius: 1rem;
    }

    h1 {
        height: auto;
        margin-left: 5px;
        font-size: 30px;
        color: #006DB6;
    }
`;

const BookingDetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-end;
	/* background-color: #F5F5F5; */

	span {
		/* margin-top: 5px; */
	}
`;

const DetailsWrapper = styled.div`
	margin-top: 15px;
	display: flex;
	justify-content: space-between;
	/* background-color: orange; */
`;

const Details = styled.div`
	width: fit-content;
	/* margin: 0 10px; */
	padding: 10px 15px 15px;
	display: flex;
	flex: 1;
	flex-direction: column;
	color: white;
	border-radius: 1rem;
	background-color: #006DB6;	
	box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

	h1 {
		margin: 0px 0px;
		font-size: 30px;
		font-weight: lighter;
	}

	span {
		font-size: 15px;

	}
`;

const VideoPlayer = () => {
	const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, prescriptions, setPrescriptions, showPrescriptions, setShowPrescriptions } = useContext(SocketContext);
	const [bookingDetails, setBookingDetails] = useState([]);

	const getBookingDetails = async () => {
        let response= await fetch("http://localhost:8080/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`SELECT Booking_Id, tbl_booking.Pat_Id, tbl_booking.Doc_Id, tbl_patient.Username AS Pat_Username, Pat_Name, Pat_Phone_No, Pat_Dob, Pat_Gender, Sp_Name, tbl_doctor.Username AS Doc_Username, Doc_Name, Doc_Phone_No, Doc_Gender, tbl_prescription.Pres_Id, Pres_Date, Prescription FROM tbl_booking JOIN tbl_patient ON tbl_patient.Pat_Id = tbl_booking.Pat_Id JOIN tbl_doctor ON tbl_doctor.Doc_Id=tbl_booking.Doc_Id JOIN tbl_doctor_category ON tbl_doctor_category.Sp_Id=tbl_doctor.Sp_Id JOIN tbl_prescription ON tbl_prescription.Pres_Id=tbl_booking.Pres_Id WHERE tbl_booking.Booking_Id=${window.location.href.split('/')[4]}`})
        });
        let table = await response.json();
        setBookingDetails(table)
		setPrescriptions(table[0].Prescription);
	}

	useEffect(() => {
		getBookingDetails();
	}, [])

	useEffect(() => {
		if (sessionStorage.getItem('UserType') == 'doctor') {
			const interval = setTimeout(async () => {
				let response= await fetch("http://localhost:8080/healthgram/test.php",{
					method:"POST",
					header:{"Content-Type": "application/json"},
					body:JSON.stringify({"query":`UPDATE tbl_prescription SET Prescription='${prescriptions}' WHERE tbl_prescription.Pres_Id=(SELECT Pres_Id FROM tbl_booking WHERE Booking_Id=${window.location.href.split('/')[4]})`})
				});
				console.log('Updated prescription to database');
			}, 3000);
			return () => clearInterval(interval);
		}
	}, [prescriptions]);

	useEffect(() => {
		if (sessionStorage.getItem('UserType') == 'patient') {
			const interval = setInterval(async () => {
				let response= await fetch("http://localhost:8080/healthgram/test.php",{
					method:"POST",
					header:{"Content-Type": "application/json"},
					body:JSON.stringify({"query":`SELECT Prescription FROM tbl_prescription WHERE Pres_Id=(SELECT Pres_Id FROM tbl_booking WHERE Booking_Id=${window.location.href.split('/')[4]})`})
				});
				let table = await response.json();
				setPrescriptions(table[0].Prescription);
			}, 3000);		
			return () => clearInterval(interval); 
		}
	}, [])

	const generatePDF = () => {
		// const pdf = new jsPDF('p', 'pt', 'a4');
		// pdf.html(document.querySelector('#pres'), {
		// 	callback: function (pdf) {
		// 		pdf.save('Prescription.pdf');
		// 	}
		// })

		// html2canvas(element, {
		// 	onrendered: function (canvas) {
		// 	  $("#previewImage").append(canvas);
		// 	  getCanvas = canvas;
		// 	}
		//   });
	}

	return (
		<Wrapper>
			<VideoWrapper showPrescriptions={showPrescriptions}>
				{stream && (
					<Canvas showPrescriptions={showPrescriptions}>
						<video playsInline muted ref={myVideo} autoPlay />
					</Canvas>
				)}
				{callAccepted && !callEnded && (
					<Canvas showPrescriptions={showPrescriptions}>
						<video playsInline ref={userVideo} autoPlay />
					</Canvas>
				)}
			</VideoWrapper>
			{showPrescriptions && ( <Prescription id="pres">
				<PrescriptionHeader>						
					<LogoWrapper>
						<img src={LogoImg} alt=""/>
						<h1>PRESCRIPTIONS</h1>
					</LogoWrapper>
					<BookingDetailsContainer>
						<span>{`Booking ID: ${bookingDetails[0].Booking_Id}`}</span>			
						<span>{`Prescription ID: ${bookingDetails[0].Pres_Id}`}</span>						
						<span>{`Time: ${bookingDetails[0].Pres_Date.substr(0, 16)}`}</span>

					</BookingDetailsContainer>
				</PrescriptionHeader>
				<DetailsWrapper>
					<Details style={{marginRight: '30px'}}>
						<h1>{`${sessionStorage.getItem('UserType') == 'doctor' ? 'Your' : 'Doctor'} Details`}</h1>
						<span>{`Doc ID: ${bookingDetails[0].Doc_Id}`}</span>
						<span>{`Name: ${bookingDetails[0].Doc_Name.toUpperCase()}`}</span>
						<span>{`Specialization: ${bookingDetails[0].Sp_Name.toUpperCase()}`}</span>
						<span>{`Gender: ${bookingDetails[0].Doc_Gender.toUpperCase()}`} <i class={`bx bx-${bookingDetails[0].Doc_Gender}`}></i></span>
						<span>{`Mail ID: ${bookingDetails[0].Doc_Username}`}</span>
					</Details>
					<Details>
						<h1>{`${sessionStorage.getItem('UserType') == 'patient' ? 'Your' : 'Patient'} Details`}</h1>
						<span>{`Pat ID: ${bookingDetails[0].Pat_Id}`}</span>
						<span>{`Name: ${bookingDetails[0].Pat_Name.toUpperCase()}`}</span>
						<span>{`Age: ${new Date().getFullYear() - bookingDetails[0].Pat_Dob.substr(0, 4)} Years Old`}</span>
						<span>{`Gender: ${bookingDetails[0].Pat_Gender.toUpperCase()}`} <i class={`bx bx-${bookingDetails[0].Pat_Gender}`}></i></span>
						<span>{`Mail ID: ${bookingDetails[0].Pat_Username}`}</span>
					</Details>
				</DetailsWrapper>
				<TextField
					label="Prescription"
					multiline
					focused
					autoFocus 
					disabled={!(sessionStorage.getItem('UserType') == 'doctor')}
					sx={{ mt: '35px' }}
					value={prescriptions} 
					onChange={(event) => {
						setPrescriptions(event.target.value)
					}}
				/>
				{/* <button onClick={ () => generatePDF()}>Get Booking Details</button> */}
			</Prescription> )}
		</Wrapper>
	);
};

export default VideoPlayer;
