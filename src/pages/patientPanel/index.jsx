import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { CopyToClipboard } from "react-copy-to-clipboard"
import TextField from '@mui/material/TextField';
import MaterialTable from 'material-table';
import Button from "@material-ui/core/Button"
import EventIcon from '@mui/icons-material/Event';
import ConsultationImg from '../../assets/images/upcomming-booking.svg'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Lottie from 'react-lottie';
import WaitingQueue from '../../assets/lottie animations/waiting-in-a-queue.json'
import { TablePagination, Grid, Typography, Divider } from '@material-ui/core'

const PatientPanelWrapper = styled.div`
    /* height: 200vh; */
    /* width: 100vw; */
    margin-top: 88px;
    margin-right: 28px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    position: relative;
    /* background-color: green; */
`;

const FloatingButton = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;                          
    position: fixed;          
    bottom: 20px;                                                    
    right: 42%; 
    padding: 7px 24px 7px 18px;
    z-index: 12;
    border: none;
    font-size: 1.3rem;
    user-select: none;
    text-decoration: none;
    border-radius: 3rem;  
    color: white;           
    background: linear-gradient(45deg,rgba(0,109,182,1) 0%,  rgba(9,57,121,1) 100%);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    transition: .04s ease;
    cursor: pointer;

    &:active {
        scale: .97;
    }
`;

const ConsultationWrapper = styled.div`
    height: 300px;
    width: 100%;
    margin: 10px;
    display: flex;
    overflow: hidden;
    border-radius: 1rem;
    box-shadow: 0 9px 24px rgb(0 0 0 / 12%), 0 9px 24px rgb(0 0 0 / 12%);
    /* background-color: yellow; */
`;

const ConsultationBackgroundImg = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    /* background-color: red; */

    img {
        height: 90%;
    }
`;

const ConsultationTextContainer = styled.div`
    padding: 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    /* background-color: greenyellow; */

    h1 {
        font-size: 2.5rem;
        margin-top: 39px;
        margin-left: 30px;
        color: #2a2a2a;
    }

    h2 {
        height: 200px;
        display: flex;
        align-items: center;
        margin: 0px;
        margin-top: 29px;
        padding: 0px;
        font-size: 12.5rem;
        font-weight: 500;
        color: #2a2a2a;
        /* background-color: lightcoral; */
    }

    span {
        padding-right: 108px;
        height: fit-content;
        width: 100%;
        text-align: right;
        font-size: .9rem;
        /* background-color: brown */
    }
`;

const ChatLink = styled.div`
    height: fit-content;
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* background-color: yellow; */
`;

const BookingHistory = styled.div`
    width: 100%;
    margin: 12px;
    /* background-color: pink; */
`;

export function PatientPanel (props) {
    document.title = "Patient Panel"
    sessionStorage.removeItem('Refreshed');
    
    const history = useHistory();
    const [consultations, setConsultations] = useState([])
    const [remainingConsultations, setRemainingConsultations] = useState('')
    const [bookingHistory, setBookingHistory] = useState([])
    
    const checkConsultations = async () => {
        let response = await fetch("http://localhost:8080/healthgram/test.php", {
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query": `SELECT * FROM tbl_booking JOIN tbl_patient ON tbl_patient.Pat_Id= tbl_booking.Pat_Id WHERE tbl_booking.Pat_Id=(SELECT Pat_Id FROM tbl_patient WHERE Username LIKE '${sessionStorage.getItem('Username')}') AND Booking_Status LIKE 'paid';`})
        });
        let table = await response.json();
        setConsultations(table)

        
        let response2 = await fetch("http://localhost:8080/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`SELECT COUNT(*) as count FROM tbl_booking WHERE Doc_Id=${table[0]?.Doc_Id} AND Booking_Status LIKE 'paid' AND Booking_Id < ${table[0]?.Booking_Id};`})
        });
        let table2 = await response2.json();
        setRemainingConsultations(table2[0].count);

        // console.log(`SELECT COUNT(*) as count FROM tbl_booking WHERE Doc_Id=${table[0]?.Doc_Id} AND Booking_Status LIKE 'paid' AND Booking_Id < ${table[0]?.Booking_Id};`)
    }
    
    useEffect(() => {
        checkConsultations()
        getBookingHistory()
        const interval = setInterval(() => {
            checkConsultations()
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const getBookingHistory = async () => {
        let response= await fetch("http://localhost:8080/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`SELECT * FROM tbl_booking JOIN tbl_prescription ON tbl_booking.Pres_Id = tbl_prescription.Pres_Id WHERE Pat_Id=(SELECT Pat_Id FROM tbl_patient WHERE Username LIKE '${sessionStorage.getItem('Username')}');`})
        });
        let table = await response.json();
        setBookingHistory(table);
    }

    return <PatientPanelWrapper>
        {(consultations?.length == 0) && <FloatingButton to="/booking">
            <EventIcon sx={{ m: 1 }} style={{ fonSize: '30px' }}/>
            Book A Doctor
        </FloatingButton>}
        {(consultations.length != 0) && <ConsultationWrapper>
            <ConsultationBackgroundImg>
                {(consultations[0].Consultation_Link == null) && <div> <Lottie 
                    options={{
                        loop: true,
                        autoplay: true,
                        speed: .030,
                        animationData: WaitingQueue,
                        rendererSettings: {
                            preserveAspectRatio: "xMidYMid slice"
                        }
                    }}
                    height={300}
                    // width={'100%'}
                /></div>}
                {(consultations[0].Consultation_Link != null) && <img src={ConsultationImg} />}
            </ConsultationBackgroundImg>
            <ConsultationTextContainer>    
                {(consultations[0].Consultation_Link == null) &&  <>
                    {(remainingConsultations == 0) && <>
                        <h1>Your Turn.<br/>The Link Will Be Provided Shortly</h1>
                    </>}
                    {(remainingConsultations > 0) && <>
                        <h2>{remainingConsultations}<h1>More Consultations Remaining</h1></h2>
                        
                    </>}
                </>}     
                 
                {(consultations[0].Consultation_Link != null) && <ChatLink>
                    <h1>Room Code</h1>
                    <CopyToClipboard text={consultations[0].Consultation_Link} style={{ marginLeft: "2rem" }}>
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            endIcon={<ContentCopyIcon fontSize="large" />}
                            onClick={() => history.push(`/consultation/${consultations[0].Booking_Id}`)}  
                            style={{width: 10
                            }}
                        >{consultations[0].Consultation_Link}</Button>
                    </CopyToClipboard>
                </ChatLink>}
                <span>To Join, click the room code when it is provided</span>
            </ConsultationTextContainer>
        </ConsultationWrapper>}
        
        <BookingHistory>
            <MaterialTable
                title="Your Booking History"
                data={bookingHistory}
                columns={[
                    { title: "Booking Id", field: "Booking_Id" },
                    { title: "Patient Id ", field: "Pat_Id" },
                    { title: "Doctor Id", field: "Doc_Id" },
                    { title: "Prescription", field: "Pres_Id" },
                    { title: "Amount", field: "Booking_Amount" },
                    { title: "Timestamp", field: "Booking_Date" },
                    { title: "Status", field: "Booking_Status" },
                ]}
                options={{
                    actionsColumnIndex: 0, addRowPosition: "first",
                    search: true,          
                    exportButton: {
                      csv: true,
                      pdf: false
                    },
                }} 
                detailPanel={rowData => {
                    return (
                        <h1>
                            {rowData.Prescription}
                        </h1>
                    )
                }}
                components={{
                    Pagination: (props) => <>
                        <Grid container style={{ padding:15}}>
                            <Grid sm={6} item><Typography variant="subtitle2">Total Number of Booking :  {props.count}</Typography></Grid>
                        </Grid>
                        <Divider/>
                        <TablePagination {...props} />
                    </>
                }}
                style={{
                    height: 'auto',
                    display: 'flex',
                    boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
                    flexDirection: 'column',
                    borderRadius: '1rem',    
                    padding: '0px 20px'
                    // backgroundColor: 'transparent'
                }}
            />
        </BookingHistory>
    </PatientPanelWrapper>
}