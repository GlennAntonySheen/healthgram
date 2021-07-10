import React from "react";
import styled from "styled-components";
import LogoImg from '../../assets/logo/Technology to Customize Your Design _ GraphicSprings - Brave 20-Jun-21 11_44_14 AM.png';

const LogoWrapper = styled.div`
    height: 100%;
    width: auto;
    display: flex;
    align-items: center;
    margin-left: 40px;

    img {
        height: 100%;
        /* width: fit-content; */
        flex-grow: 1;
    }

    h1 {
        height: auto;
        margin-left: 5px;
        font-size: 40px;
        color: #006DB6;
    }
`;

export function Logo(rops) {
    return <LogoWrapper>
        <img src={LogoImg} alt=""/>
        <h1>HealthGram</h1>
    </LogoWrapper>
}