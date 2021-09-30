import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import animationData from '../../assets/lottie animations/49259-scroll-s.json';
import BackgroungImg from '../../assets/images/booking backgroung.jpg'
import SearchIcon from '../../assets/icons/bx-search-alt-2.svg'

const BookingPageContainer = styled.div`
    width: 100vw;
    /* background-color: blue; */
`;

const IntroContainer = styled.div`
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    /* background-color: red; */

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
    /* background-color: orange; */
`;

const SearchContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background-color: red; */
`;

const Searchbar = styled.div`
    /* width: fit-content; */
    display: flex;
    padding-left: 16px;
    flex-shrink: 1;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    overflow: hidden;
    border-radius: 5rem;
    outline: none;
    /* border: px solid #1485eb; */
    /* background-color: green; */
    box-shadow: -5px -5px 8px #edeff1, 5px 5px 10px #cacfd8;

    input {
        /* height: 30%; */
        width: 700px;
        outline: none;
        border: none;
        font-size: 46px;
        transition:0.5s;
        /* background-color: orange; */
    }

    button {
        /* position: absolute; */
        /* margin: 10px; */
        padding: 5px;
        border: none;
  /* top: 20px; */
        align-items: flex-end;
        border-radius: 300rem;
        background-color: #1485eb;

        img {
            height: 50px;
        }
    }

`;

const SearchResults = styled.div`
    display: flex;
    background-color: yellow;
`;

export function Booking(props) {

    const { 
        watch, 
        register, 
        handleSubmit,
        getValues,
        setValue,
        formState: { errors, isValid }
    } = useForm({ mode: "all", reValidateMode: "all" });   

    const searchForDoctor = async () => {
        console.log('Searching for')
    }

    return <BookingPageContainer>        
        <IntroContainer>
            <img src={BackgroungImg}  /> 
            <IntroTextContainer>
                <h1>Book Your</h1> <h1>Doctor Now</h1> 
                <Lottie 
                    options={{
                        loop: true,
                        autoplay: true,
                        speed: .030,
                        animationData: animationData,
                        rendererSettings: {
                          preserveAspectRatio: "xMidYMid slice"
                        }
                    }}
                    height={70}
                    width={70}
                /> 
            </IntroTextContainer>
        </IntroContainer>
        <BookingSection>
            <SearchContainer>
                <h1> Book your doctor now</h1> 
                <Searchbar>
                    <input 
                        name="searchQuery"
                        {...register("searchQuery")}
                    />
                    <button onClick={ () => handleSubmit(searchForDoctor)()}><img src={SearchIcon}></img></button>
                    
                </Searchbar>
                    <pre>{JSON.stringify(watch(), null, 2)}</pre> 
                <SearchResults>
                    
                </SearchResults>
            </SearchContainer>
        </BookingSection> 
    </BookingPageContainer>
}