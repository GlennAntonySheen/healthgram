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

const PatientPanelWrapper = styled.div`
    /* height: 200vh; */
    /* width: 100vw; */
    margin-top: 88px;
    padding: 8px;
    display: flex;
    position: relative;
    /* background-color: green; */
`;

const FloatingButton = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;                          
    position: fixed;          
    bottom: 30px;                                                    
    right: 50px; 
    padding: 7px 24px 7px 18px;
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
    margin: 8px;
    display: flex;
    overflow: hidden;
    border-radius: 1rem;
    box-shadow: 0 9px 24px rgb(0 0 0 / 12%), 0 9px 24px rgb(0 0 0 / 12%);
    background-color: yellow;
`;

const ConsultationBackgroundImg = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    background-color: red;

    img {
        height: 80%;
    }
`;

const ConsultationTextContainer = styled.div`
    display: flex;
    flex: 1;
    background-color: pink;
`;

const ChatLink = styled.div`
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: yellow;
`;

const BookingHistory = styled.div`
    width: 100%;
    margin: 12px;
    /* background-color: pink; */
`;

export function PatientPanel (props) {
    document.title = "Patient Panel"
    window.addEventListener("scroll", () => console.log("hello"));
    sessionStorage.removeItem('Refreshed');
    
    const history = useHistory();
    const [consultations, setConsultations] = useState([])
    const [bookingHistory, setBookingHistory] = useState([])
    
    const checkConsultations = async () => {
        let response = await fetch("http://localhost:8080/healthgram/test.php", {
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query": `SELECT * FROM tbl_booking JOIN tbl_patient ON tbl_patient.Pat_Id= tbl_booking.Pat_Id WHERE tbl_booking.Pat_Id=(SELECT Pat_Id FROM tbl_patient WHERE Username LIKE '${sessionStorage.getItem('Username')}') AND Booking_Status LIKE 'paid';`})
        });
        let table = await response.json();
        setConsultations(table)
    }
    
    useEffect(() => {
        checkConsultations()
        const interval = setInterval(() => {
            checkConsultations()
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const getBookingHistory = async () => {
        let response= await fetch("http://localhost:8080/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`SELECT * FROM tbl_booking WHERE Pat_Id=(SELECT Pat_Id FROM tbl_patient WHERE Username LIKE '${sessionStorage.getItem('Username')}') AND Booking_Status LIKE 'completed';`})
        });
        let table = await response.json();
        console.log(table)
        setBookingHistory(table);
    }

    return <PatientPanelWrapper>
        <FloatingButton to="/booking">
            <EventIcon sx={{ m: 1 }} style={{ fonSize: '30px' }}/>
            Book A Doctor
        </FloatingButton>
        {(consultations.length != 0) && <ConsultationWrapper>
            <button onClick={() => console.log(consultations[0].Consultation_Link == null)} >dfgdfgdg</button>
            <ConsultationBackgroundImg><img src={ConsultationImg} /></ConsultationBackgroundImg>
            <ConsultationTextContainer>            
            {(consultations[0].Consultation_Link == null) && <h1>Please be online </h1>}
            {(consultations[0].Consultation_Link != null) && <ChatLink>
                {/* <span>Join Code:</span>                 */}
				<CopyToClipboard text={consultations[0].Consultation_Link} style={{ marginLeft: "2rem" }}>
					<Button 
                        variant="outlined" 
                        color="primary" 
                        endIcon={<ContentCopyIcon fontSize="large" />}
                        onClick={() => history.push(`/consultation/${consultations[0].Booking_Id}`)}
                    >{`Copy Link:    ${consultations[0].Consultation_Link}`}</Button>
				</CopyToClipboard>
            </ChatLink>}
            </ConsultationTextContainer>
        </ConsultationWrapper>}
        
        <BookingHistory>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
            <MaterialTable
                title="Booking History"
                data={bookingHistory}
                columns={[
                    { title: "Booking Id", field: "Booking_Id" },
                    { title: "Patient Id ", field: "Pat_Id" },
                    { title: "Doctor Id", field: "Doc_Id" },
                    { title: "Prescription", field: "Pres_Id" },
                    { title: "Amount", field: "Booking_Amount" },
                    { title: "Timestamp", field: "Booking_Date " },
                    { title: "Status", field: "Booking_Status" },
                ]}
                options={{
                    actionsColumnIndex: 0, addRowPosition: "first",
                    search: true,                   
                    exportButton: true
                }} 
                actions={[
                    // rowData => ({
                    //     icon: () => <VolunteerActivismIcon fontSize={'medium'} />,
                    //     tooltip: 'Activate User',
                    //     disabled: rowData.User_Status == 'verified',
                    //     hidden: rowData.User_Status == 'verified' || rowData.User_Status == 'not verified',
                    //     onClick: async (event, rowData) => {
                    //         let response= await fetch("http://localhost:8080/healthgram/test.php",{
                    //             method:"POST",
                    //             header:{"Content-Type": "application/json"},
                    //             body:JSON.stringify({"query":`UPDATE tbl_userbase SET User_Status = 'verified' WHERE tbl_userbase.Username = '${rowData.Username}';`})
                    //         });
                    //         let table = await response.json();
                    //         getUserDetails();
                    //     }
                    // }),
                ]}
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