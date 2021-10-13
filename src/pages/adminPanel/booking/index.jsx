import React, { useState } from 'react';
import styled from 'styled-components';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MaterialTable from 'material-table';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CachedIcon from '@material-ui/icons/Cached';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

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

export default function Booking(props) {
    const [selectedDate, handleDateChange] = useState(new Date());
    const [value, setValue] = React.useState([null, null]);


    return <ContentWrapper>
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