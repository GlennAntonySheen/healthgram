import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/navbar'
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Lottie from 'react-lottie';
import NewNotification from '../../assets/lottie animations/new-notification.json'
import VideoCall from '../../assets/lottie animations/video-call.json'

import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import NoPatients from '../../assets/images/noPatients.jpg';

const DoctorPanelWrapper = styled.div`
    /* height: 200vh; */
    /* width: 100vw; */
    margin-top: 90px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    /* background-color: green; */
`;

const CardsWrapper = styled.div`
    width: 100%;
    display: flex;

`;

const IsConsulting = styled.div`
    height: 120px;
    width: 300px;
    margin: 11px;
    padding:30px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    transition: .3s ;
    border-radius: 1rem;
    background-color: white;
    box-shadow: 0 9px 24px rgb(0 0 0 / 12%), 0 9px 24px rgb(0 0 0 / 12%);

    h1 {
        margin-top: 0;
        font-weight: lighter;
    }

    div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        /* background-color: pink; */
    }
`;

const TokenContainer = styled.div`
    height: 120px;
    width: 300px;
    margin: 8px;
    padding:30px;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    box-shadow: 0 9px 24px rgb(0 0 0 / 12%), 0 9px 24px rgb(0 0 0 / 12%);

    span {
        color: rgba(0, 0, 0, 0.6);
    }

    p {
        height: 100%;
        margin: 0px;
        padding: 0px;
        font-size: 5rem;
        text-align: center;
        /* background-color: yellow; */
    }
`;

const BookingRequests = styled.div`
    height: fit-content;
    width: fit-content;
    margin: 10px;
    border-radius: 1rem;
    
    /* background-color: yellow; */
`;

const RequestContainer = styled.div`
    height: fit-content;
    width: fit-content;
    margin-bottom: 20px;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    /* flex: 1; */
    align-items: center;
    border-radius: 1rem;
    /* background-color: orangered; */
    /* border: 2px solid black; */
    box-shadow: 0 9px 24px rgb(0 0 0 / 12%), 0 9px 24px rgb(0 0 0 / 12%);

`;

const RequestText = styled.div`
    height: 100%;
    width: 250px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    color: #006db6;
    /* flex: 1; */
    /* background-color: yellow; */

    h3 {
        font-family: 'poppins';
        font-size: 1.1rem;
        font-weight: lighter;
        margin: 2px 0;
        padding: 0px 6px;
        /* color: #006db6; */
        background-color: white;
        border-radius: .3rem;
    }
`;

const RequestControls = styled.div`
    height: 100%;
    width: fit-content;
    margin-left: 90px;
    /* right: 10px; */
    display: flex;
    /* flex: 1; */
    /* background-color: grey; */
    
`;

const ConstulationWrapper = styled.div`
    margin: 8px;
    padding: 8px;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    border-radius: 1rem;
    box-shadow: 0 9px 24px rgb(0 0 0 / 12%), 0 9px 24px rgb(0 0 0 / 12%);
    background-color: white;

    h1 {
        width: 100%;
        text-align: center;
    }

    img {
        width: 60%;
    }
`;

const Consultation = styled.div`
    width: 560px;
    margin: 8px;
    padding: 8px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 1rem;
    background-color: #006db6;    
`;

const ConsultationControls = styled(Link)`
    height: fit-content;
    width: fit-content;
    cursor: pointer;
`;

export function DoctorPanel (props) {
    document.title = "Doctor Panel"
  
    const history = useHistory();
    const [showTokens, setShowTokens] = useState(false)
    const [noOfTokens, setNoOfTokens] = useState(1)
    const [bookingRequests, setBookingRequest] = useState([])
    const [consultations, setConsultations] = useState([])
    const [tokens, setTokens] = useState([{Doc_No_Of_Tokens: "0"}])

    
    const checkBookingRequest = async () => {
        let response = await fetch("http://localhost:8080/healthgram/test.php", {
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query": `SELECT tbl_patient.Pat_Id, Booking_Id, Doc_Id , Pat_Name, Username, Pat_Dob, Pat_Gender FROM tbl_booking JOIN tbl_patient ON tbl_booking.Pat_Id=tbl_patient.Pat_Id WHERE Booking_Status LIKE 'not confirmed' AND Doc_Id=(SELECT Doc_Id FROM tbl_doctor WHERE Username='${sessionStorage.getItem('Username')}') ORDER BY Booking_Date DESC;`})
        });
        let table = await response.json();
        setBookingRequest(table)
        // console.log(bookingRequests)
    }

    const getNoOfTokens = async () => {
        let response = await fetch("http://localhost:8080/healthgram/test.php", {
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query": `SELECT Doc_No_Of_Tokens FROM tbl_doctor WHERE Username='${sessionStorage.getItem('Username')}';`})
        });
        let table = await response.json();
        setTokens(table)
    }

    const checkConsultations = async () => {
        let response = await fetch("http://localhost:8080/healthgram/test.php", {
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query": `SELECT * FROM tbl_booking JOIN tbl_patient ON tbl_patient.Pat_Id= tbl_booking.Pat_Id WHERE Booking_Status LIKE 'paid' AND Doc_Id=(SELECT Doc_Id FROM tbl_doctor WHERE Username LIKE '${sessionStorage.getItem('Username')}');`})
        });
        let table = await response.json();
        setConsultations(table)
    }
    
    useEffect(() => {        
        sessionStorage.removeItem('Refreshed');

        getNoOfTokens()
        checkConsultations()
        const interval = setInterval(() => {
            getNoOfTokens()
            checkBookingRequest()
            checkConsultations()
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return <DoctorPanelWrapper>
        
		<Navbar opaque={true} type={'doctor'} />
        <CardsWrapper>
            <IsConsulting>
                <h1>Consulting Now?</h1>
                <div>
                    <Switch 
                        defaultChecked={false}
                        onChange = { async (event) => {
                            let response = await fetch("http://localhost:8080/healthgram/test.php", {
                                method:"POST",
                                header:{"Content-Type": "application/json"},
                                body:JSON.stringify({"query": event.target.checked ? 
                                    `SELECT Doc_No_Of_Tokens FROM tbl_doctor WHERE Username='${sessionStorage.getItem('Username')}';` :  
                                    `UPDATE tbl_doctor SET Doc_No_Of_Tokens=0 WHERE Username='${sessionStorage.getItem('Username')}';`
                                })
                            });
                            let table = await response.json();
                            if (table[0] !== undefined) {
                                setNoOfTokens(table[0].Doc_No_Of_Tokens > 0 ? table[0].Doc_No_Of_Tokens : 1)                                        
                            } else {
                                getNoOfTokens()
                            }
                            setShowTokens(event.target.checked)
                        }}
                    />
                    {showTokens && <>
                        <TextField
                            label="Tokens"
                            size="small"
                            fullWidth={false}
                            defaultValue={noOfTokens}
                            sx={{ width: '80px' }}
                            inputProps={{ 
                                type: 'number',
                                min: 1,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => setNoOfTokens(event.target.value)}
                        />
                        <IconButton 
                            color="primary"
                            onClick={ async () => {
                                let response = await fetch("http://localhost:8080/healthgram/test.php", {
                                    method:"POST",
                                    header:{"Content-Type": "application/json"},
                                    body:JSON.stringify({"query": `UPDATE tbl_doctor SET Doc_No_Of_Tokens=${noOfTokens} WHERE Username='${sessionStorage.getItem('Username')}';`})
                                })
                                getNoOfTokens()
                            }}
                        >
                            <DoneIcon />
                        </IconButton>
                    </>}
                </div>

            </IsConsulting>
            <TokenContainer>
                <span>Number Of Tokens</span>
                <p>{tokens[0]?.Doc_No_Of_Tokens }</p>
            </TokenContainer>
        </CardsWrapper>        
        
        <BookingRequests>
            {bookingRequests.map((patient, index) => 
                <RequestContainer>
                    <Lottie 
                        options={{
                            loop: false,
                            autoplay: true,
                            speed: .030,
                            animationData: NewNotification,
                            rendererSettings: {
                                preserveAspectRatio: "xMidYMid slice"
                            }
                        }}
                        height={100}
                        width={110}
                    /> 
                    <RequestText>
                        <h3>{patient.Pat_Name.toUpperCase()}</h3>
                        <h3>
                            {patient.Pat_Gender.toUpperCase()}                            
                            <i class={`bx bx-${patient.Pat_Gender}`}></i>
                        </h3>
                        <h3>{`${new Date().getFullYear() - patient.Pat_Dob.substr(0, 4)} Years old`}</h3>
                        <h3>{patient.Username}</h3>
                    </RequestText>
                    <RequestControls>
                        <Button 
                            variant="contained" 
                            startIcon={<DoneAllIcon />}
                            onClick={async () => {
                                let response = await fetch("http://localhost:8080/healthgram/test.php", {
                                    method:"POST",
                                    header:{"Content-Type": "application/json"},
                                    body:JSON.stringify({"query": `UPDATE tbl_booking SET Booking_Status = 'confirmed' WHERE tbl_booking.Booking_Id = ${patient.Booking_Id };
                                        UPDATE tbl_doctor SET Doc_No_Of_Tokens=((SELECT Doc_No_Of_Tokens FROM tbl_doctor WHERE Username='${sessionStorage.getItem('Username')}')-1) WHERE Username='${sessionStorage.getItem('Username')}'; `})
                                });
                                checkBookingRequest()
                                getNoOfTokens()
                            }}
                        >Confirm</Button>
                        <Button 
                            variant="outlined" 
                            startIcon={<CancelScheduleSendIcon />} 
                            sx={{ml: 3}}
                            onClick={async () => {
                                let response = await fetch("http://localhost:8080/healthgram/test.php", {
                                    method:"POST",
                                    header:{"Content-Type": "application/json"},
                                    body:JSON.stringify({"query": `UPDATE tbl_booking SET Booking_Status = 'rejected' WHERE tbl_booking.Booking_Id = ${patient.Booking_Id };`})
                                });
                                checkBookingRequest()
                            }}
                        >Cancel</Button>
                    </RequestControls>
            
                </RequestContainer>

            )}
        </BookingRequests>
        <ConstulationWrapper>
            {consultations.length == 0 && <>
                <h1>No Consultations</h1>
                <img src={NoPatients} alt="No Consultation" />
            </>}
            {consultations.length != 0 && <>
                <h1>Pending Consultations</h1>
                {consultations.map((booking, index) => 
                    <Consultation>
                        <RequestText>
                            <h3>{booking.Pat_Name.toUpperCase()   }</h3>
                            <h3>
                                {booking.Pat_Gender.toUpperCase()}                            
                                <i class={`bx bx-${booking.Pat_Gender}`}></i>
                            </h3>
                            {/* <h3>{`${new Date().getFullYear() - booking.Pat_Dob.substr(0, 4)} Years old`}</h3> */}
                            <h3>{booking.Booking_Id}</h3>
                            <h3>{booking.Username}</h3>
                        </RequestText>       
                        <ConsultationControls 
                            to={`/consultation/${booking.Booking_Id}`}
                            // onClick={async () => {
                            //     sessionStorage.setItem('BookingId', booking.Booking_Id);
                            //     // history.push('./consultation');
                            // }}
                        >           
                            <Lottie 
                                options={{
                                    loop: true,
                                    autoplay: true,
                                    speed: .030,
                                    animationData: VideoCall,
                                    rendererSettings: {
                                        preserveAspectRatio: "xMidYMid slice"
                                    }
                                }}
                                height={100}
                                width={110}                            
                            /> 
                        </ConsultationControls>                     
                    </Consultation>          
                )}
            </> }
            
        </ConstulationWrapper>
        {/* <button onClick={() => console.log(consultations.length)} >fgnfgnfg</button> */}
            {/* {JSON.stringify(bookingRequests)} */}

    </DoctorPanelWrapper>
}
