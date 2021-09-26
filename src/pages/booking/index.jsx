import React from 'react';
import styled from 'styled-components';
import BackgroungImg from '../../assets/images/booking backgroung.jpg'

const BookingPageContainer = styled.div`
    height: 100vh;
    width: 100vw;
    /* margin-top: 80px; */
`;

const IntroContainer = styled.div`
    height: 100vh;
    width: 100%;
    background-color: blue;

    img {
        height: 100%;
        width: 100%;
        /* margin-bottom: 100px; */
    }
`;

const IntroTextContainer = styled.div`

`;

export function Booking(props) {
    return <BookingPageContainer>
        <IntroContainer>
            <img src={BackgroungImg}  />
            <IntroTextContainer>
                
            </IntroTextContainer>
        </IntroContainer>
        <h1>this is booking page</h1>
    </BookingPageContainer>
}