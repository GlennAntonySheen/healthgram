import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import ConsultationImg from '../../assets/images/upcomming-booking.svg'

const PatientPanelWrapper = styled.div`
    /* height: 200vh; */
    /* width: 100vw; */
    margin-top: 80px;
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

export function PatientPanel (props) {    
    document.title = "Patient Panel"
    window.addEventListener("scroll", () => console.log("hello"));

    return <PatientPanelWrapper>
        <FloatingButton to="/booking">
            <EventIcon sx={{ m: 1 }} style={{ fonSize: '30px' }}/>
            Book A Doctor
        </FloatingButton>
        <ConsultationWrapper>
            <ConsultationBackgroundImg><img src={ConsultationImg} /></ConsultationBackgroundImg>
            <ConsultationTextContainer>

            </ConsultationTextContainer>
        </ConsultationWrapper>

    </PatientPanelWrapper>
}