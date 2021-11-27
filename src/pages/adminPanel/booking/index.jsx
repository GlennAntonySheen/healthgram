import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MaterialTable from 'material-table';
import { Doughnut } from 'react-chartjs-2';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import TodayIcon from '@mui/icons-material/Today';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventNoteIcon from '@mui/icons-material/EventNote';
import IconButton from '@mui/material/IconButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const ContentWrapper = styled.div`
width: 100%;
padding: 10px;
overflow: scroll;
scrollbar-width: none;
position: relative;
margin-left: ${ props => props.isActive ? '230px' : '98px' }; 
/* background-color: red; */
transition: all 0.2s ease;
`;

const RefreshButton = styled.button`
display: block;
margin-top: 10px;
margin-left: auto;
margin-right: auto;
cursor: pointer;
border: none;
scale: 1.6;
background-color: transparent;

& :hover {
    transform: rotate(-180deg);
    transition: transform .3s linear .3s;
}
`;

const CardsWrapper = styled.div`
    width: 100%;
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    /* background-color: green; */
`;

const UsersStat = styled.div`
    height: 240px;
    width: 380px;
    /* margin: 8px; */
    padding:30px;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    box-shadow: 0 9px 24px rgb(0 0 0 / 12%), 0 9px 24px rgb(0 0 0 / 12%);
    background-color: white;

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

const DateRangePicker = styled.div`
    height: 260px;
    width: fit-content;
    margin-left: 18px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    /* align-items: flex-end; */
    flex-direction: column;
    border-radius: 1rem;
    box-shadow: 0 9px 24px rgb(0 0 0 / 12%), 0 9px 24px rgb(0 0 0 / 12%);
`;

const DateRangeHeading = styled.h3`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0px;
    padding: 0px 10px 0px;
    text-align: center;
    font-family: sans-serif;
    font-weight: 600;
    color: #2a2a2a;
`

const DateRangeContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    /* background-color: gold; */
`;

const ChipContainer = styled.div`
    padding: 0px 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #d62121; */

`;

const BookingTable = styled.div`
    margin-top: 18px;
`;

export default function Booking(props) {
    const [selectedDate, handleDateChange] = useState(new Date());
    const [bookingDetails, setBookingDetails] = useState([])
    const [minDate, setMinDate] = useState('');
    const [fromDate, setFromDate] = React.useState('');
    const [toDate, setToDate] = React.useState(new Date().toISOString().substr(0, 10) + ' 11:59:59');
    const [statusCount, setStatusCount] = useState({})

    const getBookingDetails = async () => {
        let response = await fetch("http://localhost:8080/healthgram/test.php", {
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query": `SELECT * FROM tbl_booking;`})
        });
        let table = await response.json();
        setBookingDetails(table)

        var bookingStatusCount={};
        // Storing unique booking status, and their count into bookingStatusCount
        table.forEach((e) => bookingStatusCount[e.Booking_Status] = (bookingStatusCount[e.Booking_Status] === undefined) ? 1 : bookingStatusCount[e.Booking_Status] + 1)
        setStatusCount(bookingStatusCount);

        // Finding minmum date
        let small = 'a';
        table.forEach((e) => {
            if (e.Booking_Date < small) {
                small = e.Booking_Date;
                console.log('small is ', small)
            }
        })
        setFromDate(small.substr(0, 10) + ' 00:00:00');
        setMinDate(small.substr(0, 10) + ' 00:00:00')
    }

    useEffect(() => {
        getBookingDetails()
    }, [])

    return <ContentWrapper isActive={props.isActive}>
        <CardsWrapper>
            <UsersStat>
                <Doughnut 
                    data={{
                        labels: [
                            'Cancelled',
                            'Rejected',
                            'Not Confirmed',
                            'Confirmed',
                            'Paid',
                            'Completed',
                        ],
                        datasets: [{
                            data: [
                                statusCount["cancelled"],
                                statusCount["rejected"],
                                statusCount['notconfirmed'],
                                statusCount['confirmed'],
                                statusCount['paid'],
                                statusCount['completed'],
],
                            backgroundColor: [
                                '#8e44ad',
                                '#EA2027',
                                '#FFCE56',
                                '#2ecc71',
                                '#0652DD',
                                '#12CBC4'
                            ]
                        }]
                    }} 
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: false,
                                text: 'Booking Statistics',
                            },
                            legend: {
                                position: 'right',
                            }
                          }
                    }}
                />
            </UsersStat>
            <DateRangePicker>
                <DateRangeHeading>Date Range Picker
                    <Tooltip title="Reset Date Range">
                        <IconButton aria-label="add to shopping cart">
                            <RestartAltIcon  
                                sx={{ color: '#1976d2',  }}
                                onClick={() => {
                                    console.log(minDate)
                                    setFromDate(minDate.substr(0, 10) + ' 00:00:00');
                                    setToDate(new Date().toISOString().substr(0, 10) + ' 11:59:59');                                
                                }}
                            />
                        </IconButton>
                    </Tooltip>  
                </DateRangeHeading> 
                <DateRangeContainer>
                    <TextField 
                        label="From: yyyy-mm-dd hh:mm:ss" 
                        variant="outlined"   
                        fullWidth
						focused  
                        color="primary"
                        value={fromDate}   
                        onChange={(newValue) => {
                            setFromDate(newValue.target.value);
                        }}           
                        inputProps={{
                            style: {
                                width: '100%',
                                padding: 15
                            }
                        }}
                    />
                    
                    <TextField 
                        label="To: yyyy-mm-dd hh:mm:ss"   
                        variant="outlined" 
                        fullWidth
						focused  
                        color="primary"
                        value={toDate}   
                        onChange={(newValue) => {
                            setToDate(newValue.target.value);
                        }}       
                        inputProps={{
                            style: {
                                padding: 15,
                            }
                        }}
                    />
                </DateRangeContainer>
                <ChipContainer>
                    
                    <Chip 
                        icon={<TodayIcon />} 
                        label="Today" 
                        onClick={() => {
                            setFromDate(new Date().toISOString().substr(0, 10) + ' 00:00:00');
                            setToDate(new Date().toISOString().substr(0, 10) + ' 11:59:59');
                        }}
                    /><div style={{width: '30px'}}/>
                    <Chip 
                        icon={<DateRangeIcon />} 
                        label="This Week" 
                        variant="outlined" 
                        sx={{ml: 50}}
                        onClick={() => {
                            setFromDate(new Date(Date.now() - 604800000).toISOString().split('T')[0] + ' 00:00:00');
                            setToDate(new Date().toISOString().substr(0, 10) + ' 11:59:59');
                        }}
                    /><div style={{width: '30px'}}/>
                    <Chip 
                        icon={<EventNoteIcon />} 
                        label="This Month" 
                        variant="outlined" 
                        sx={{ml: 5}}
                        onClick={() => {
                            var d = new Date();
                            d.setMonth(new Date().getMonth() - 1);

                            setFromDate(d.toISOString().split('T')[0] + ' 00:00:00');
                            setToDate(new Date().toISOString().substr(0, 10) + ' 11:59:59');
                        }}
                    />
                    
                </ChipContainer>
            </DateRangePicker>
        </CardsWrapper>

        <BookingTable>
            <MaterialTable
                title="Booking Details"
                data={bookingDetails.filter((e) => e.Booking_Date >= fromDate && e.Booking_Date <= toDate)}
                columns={[
                    { title: "Booking Id", field: "Booking_Id", validate:   rowData => rowData.Booking_Id == 1},
                    { title: "Patient Id ", field: "Pat_Id" },
                    { title: "Doctor Id", field: "Doc_Id" },
                    { title: "Prescription", field: "Pres_Id" },
                    { title: "Amount", field: "Booking_Amount" },
                    { title: "Time", field: "Booking_Date", validate: rowData => rowData.Booking_Date <= '2021-10-08' },
                    { title: "Status", field: "Booking_Status" },
                ]}
                options={{
                    actionsColumnIndex: 0, addRowPosition: "first",
                    search: true,    
                    pageSizeOptions: [5, 25, 50, 100, 200, 300],     
                    exportButton: {
                      csv: true,
                      pdf: true
                    },
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
        </BookingTable>  
    </ContentWrapper>
}


 