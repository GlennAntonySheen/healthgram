import React, { useState } from 'react';
import styled from 'styled-components';
import SideBar from './sideBar'
import Uerbase from './userbase/index'
import DoctorCategory from './doctorCategory/index';
import Doctor from './doctor/index';
import Patient from './patient/index';
import Booking from './booking'
import TextField from '@mui/material/TextField';

const AdminPanelWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    padding: 0px;
`;

export function AdminPanel (props) {
    document.title = "Admin Panel"

    const [ active, setActive ] = useState(false);
    const [menu, setMenu] = useState('booking');

    return <AdminPanelWrapper>

        <SideBar isActive={active} setActive={setActive} setMenu={setMenu} />  
        
        {menu == 'userbase' && <Uerbase isActive={active} setActive={setActive}/>}
        {menu == 'doctorCategory' && <DoctorCategory isActive={active} setActive={setActive}/>}
        {menu == 'doctor' && <Doctor isActive={active} setActive={setActive}/>}
        {menu == 'patient' && <Patient isActive={active} setActive={setActive}/>}
        {menu == 'booking' && <Booking isActive={active} setActive={setActive}/>}
    </AdminPanelWrapper>
}
