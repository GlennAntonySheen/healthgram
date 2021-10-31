import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

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
    margin-top: 10px;

    background-color: green;
`;

const UsersStat = styled.div`
    height: 170px;
    width: 300px;
    margin: 8px;
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

export default function Booking(props) {
    const [selectedDate, handleDateChange] = useState(new Date());
    const [bookingDetails, setBookingDetails] = useState([])
    const [value, setValue] = React.useState([null, null]);
    const [statusCount, setStatusCount] = useState({})

    const getBookingDetails = async () => {
        let response = await fetch("http://localhost/healthgram/test.php", {
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query": `SELECT * FROM tbl_booking;`})
        });
        let table = await response.json();
        setBookingDetails(table)
        console.log(table)

        var bookingStatusCount={};
        // Storing unique booking status, and their count into bookingStatusCount
        table.forEach((e) => bookingStatusCount[e.Booking_Status] = (bookingStatusCount[e.Booking_Status] === undefined) ? 1 : bookingStatusCount[e.Booking_Status] + 1)
        console.log(bookingStatusCount)
        setStatusCount(bookingStatusCount);
        // table.forEach((e) => {
        //     if (statusCount[e.Booking_Status] === undefined) {
        //         setStatusCount[e.Booking_Status](1)
        //     }
        //     console.log(statusCount[e.Booking_Status])
        // })
        // table.forEach(row=)

    }

    useEffect(() => {
        getBookingDetails()
    }, [])

    return <ContentWrapper>
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
                    }}
                />
            </UsersStat>
        </CardsWrapper>
        <button onClick={() => console.log(statusCount)}>dfgdfgdfg</button>



        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDateRangePicker
            startText="Mobile start"
            value={value}
            onChange={(newValue) => {
                setValue(newValue);
            }}
            renderInput={(startProps, endProps) => (
                <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
                </React.Fragment>
            )}
            />
        </LocalizationProvider>
    </ContentWrapper>
}