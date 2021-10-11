import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Lottie from 'react-lottie';
import NewNotification from '../../assets/lottie animations/new-notification.json'
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';

const DoctorPanelWrapper = styled.div`
    /* height: 200vh; */
    width: 100vw;
    margin-top: 90px;
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
    margin: 20px;
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
    margin: 20px;
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
    margin: 20px;
    border-radius: 1rem;
    
    /* background-color: yellow; */
`;

const RequestContainer = styled.div`
    height: fit-content;
    width: 900px;
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
    width: 300px;
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
        background-color: #e7f1fb;
        border-radius: .3rem;
    }
`;

const RequestControls = styled.div`
    height: 100%;
    width: fit-content;
    margin-left: 160px;
    /* right: 10px; */
    display: flex;
    /* flex: 1; */
    /* background-color: grey; */
    
`;

export function DoctorPanel (props) {
    const [showTokens, setShowTokens] = useState(false)
    const [noOfTokens, setNoOfTokens] = useState(1)
    const [bookingRequests, setBookingRequest] = useState([])
    const [tokens, setTokens] = useState(0)

    const checkBookingRequest = async () => {
        let response = await fetch("http://localhost/healthgram/test.php", {
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query": `SELECT tbl_patient.Pat_Id, Booking_Id, Doc_Id , Pat_Name, Username, Pat_Dob, Pat_Gender FROM tbl_booking JOIN tbl_patient ON tbl_booking.Pat_Id=tbl_patient.Pat_Id WHERE Booking_Status LIKE 'not confirmed' AND Doc_Id=(SELECT Doc_Id FROM tbl_doctor WHERE Username='${sessionStorage.getItem('Username')}') ORDER BY Booking_Date DESC;`})
        });
        let table = await response.json();
        setBookingRequest(table)
        // console.log(bookingRequests)
    }

    const getNoOfTokens = async () => {
        let response = await fetch("http://localhost/healthgram/test.php", {
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query": `SELECT Doc_No_Of_Tokens FROM tbl_doctor WHERE Username='${sessionStorage.getItem('Username')}';`})
        });
        let table = await response.json();
        setTokens(table)
    }

    useEffect(() => {
        document.title = "Doctor Panel"
        const interval = setInterval(() => {
        //   console.log('This will run every second!');
            checkBookingRequest()
            getNoOfTokens()
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return <DoctorPanelWrapper>
        <CardsWrapper>
            <IsConsulting>
                <h1>Consulting Now?</h1>
                <div>
                    <Switch 
                        defaultChecked={false}
                        onChange = { async (event) => {
                            let response = await fetch("http://localhost/healthgram/test.php", {
                                method:"POST",
                                header:{"Content-Type": "application/json"},
                                body:JSON.stringify({"query": event.target.checked ? 
                                    `SELECT Doc_No_Of_Tokens FROM tbl_doctor WHERE Username='${sessionStorage.getItem('Username')}';` :  
                                    `UPDATE tbl_doctor SET Doc_No_Of_Tokens=0 WHERE Username='${sessionStorage.getItem('Username')}';`
                                })
                            });
                            let table = await response.json();
                            if (table[0] !== undefined) {
                                console.log(table[0].Doc_No_Of_Tokens)
                                setNoOfTokens(table[0].Doc_No_Of_Tokens > 0 ? table[0].Doc_No_Of_Tokens : 1)                                        
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
                                min: 1
                            }}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            onChange={(event) => setNoOfTokens(event.target.value)}
                        />
                        <IconButton 
                            color="primary"
                            onClick={ async () => {
                                let response = await fetch("http://localhost/healthgram/test.php", {
                                    method:"POST",
                                    header:{"Content-Type": "application/json"},
                                    body:JSON.stringify({"query": `UPDATE tbl_doctor SET Doc_No_Of_Tokens=${noOfTokens} WHERE Username='${sessionStorage.getItem('Username')}';`})
                                })
                            }}
                        >
                            <DoneIcon />
                        </IconButton>
                    </>}
                </div>

            </IsConsulting>
            <TokenContainer>
                <span>Number Of Tokens</span>
                <p>{tokens[0].Doc_No_Of_Tokens}</p>
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
                                let response = await fetch("http://localhost/healthgram/test.php", {
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
                                let response = await fetch("http://localhost/healthgram/test.php", {
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
        <button onClick={() => console.log(bookingRequests)} >fgnfgnfg</button>
            {/* {JSON.stringify(bookingRequests)} */}

    </DoctorPanelWrapper>
}
