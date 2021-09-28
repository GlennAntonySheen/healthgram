import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import animationData from '../../assets/lottie animations/49259-scroll-s.json';
import BackgroungImg from '../../assets/images/booking backgroung.jpg'

const BookingPageContainer = styled.div`
    /* height: 100vh; */
    width: 100vw;
  /* overflow-x: hidden;  */
    /* background-color: blue; */
`;

const IntroContainer = styled.div`
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    /* background-color: red; */
    /* margin: 0px;
    padding: 0px; */

    img {
        height: 100%;
        width: 100vw;
    }

`;

const IntroTextContainer = styled.div`
    position: absolute;
    top: 200px;
    left: 5vw;
    /* background-color: orange; */

    h1 {
        color: #1861e7;
        font-family: 'Montserrat', sans-serif;
        font-size: 4.5rem;
        font-weight: 800;

    }
`;

const BookingSection = styled.div`
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    background-color: orange;
`;

const SearchContainer = styled.div`
    width: 100%;
`;

export function Booking(props) {
    const defaultOptions = {
        
      };


    return <BookingPageContainer>        
        <IntroContainer>
            <img src={BackgroungImg}  /> 
            <IntroTextContainer>
                <h1>Book Your</h1> <h1>Doctor Now</h1> 
                {/* <Lottie 
                    options={{
                        loop: true,
                        autoplay: true,
                        speed: .030,
                        animationData: animationData,
                        rendererSettings: {
                          preserveAspectRatio: "xMidYMid slice"
                        }
                    }}
                    height={60}
                    width={60}
                /> */}
            </IntroTextContainer>
        </IntroContainer>
        <BookingSection>
            <SearchContainer>

                <h1> Book your doctor now</h1> 
            </SearchContainer>
        </BookingSection> 
    </BookingPageContainer>
}