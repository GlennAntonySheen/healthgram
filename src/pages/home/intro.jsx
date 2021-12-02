import React from 'react';
import styled from 'styled-components';
import Img from '../../assets/images/home/Drawkit-Vector-Illustration-Medical-17.svg'

const IntroContainer = styled.div`
    height: 100%;
    width: 100%;
    /* background-color: green; */
`;

const BackgroundImg = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
    /* background-color: brown; */

    img {
        height: 100%;
        width: 100%;
    }
`;

const TextContainer = styled.div`
    height: auto;
    width: auto;
    position: absolute;
    top: 23vh;
    left: 5vw;

    /* background-color: orange; */
`;

const MainHeading = styled.h1`
    margin: 0;
    font-size: 5.3rem;
    font-family: 'Karla', sans-serif;
    font-weight: 900;
`;

const Description = styled.h2`
    font-size: 1.8rem;
    font-weight: 500;
    font-family: 'Karla', sans-serif;
`;

export function Intro (props) {
    return <IntroContainer>
        
        <BackgroundImg><img src={Img} /></BackgroundImg>
        <TextContainer>
            <MainHeading>👨‍⚕️Hi There</MainHeading>
            <Description>HealthGram is an analatical tool that helps you <br/>to track your medical history.</Description>
        </TextContainer>
    </IntroContainer>
}
