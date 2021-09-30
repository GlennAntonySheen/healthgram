import React, { useState, useRef } from 'react';
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
        padding: 5px;
        border: none;
        align-items: flex-end;
        border-radius: 300rem;
        cursor: pointer;
        background-color: #1485eb;

        img {
            height: 50px;
        }
    }

`;

const SearchResults = styled.div`
    max-width: 100vw;
    display: block;
    background-color: yellow;
`;

const Card = styled.div`
    height: 300px;
    width: 300px;
    background-color: darkorange;
`;

export function Booking(props) {
    const [doctors, setDoctors] = useState([])

    const { 
        watch, 
        register, 
        handleSubmit,
        getValues,
        setValue,
        formState: { errors, isValid }
    } = useForm({ mode: "all", reValidateMode: "all" });   

    const searchForDoctor = async (data) => {
        // console.log(data.searchQuery)
        let response= await fetch("http://localhost/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`SELECT Doc_Pic, Doc_Description, Doc_Fee, Doc_Gender, Doc_Name, Doc_No_Of_Tokens, Doc_Dob, Sp_Name FROM tbl_login JOIN tbl_userbase ON tbl_login.Username=tbl_userbase.Username JOIN tbl_doctor ON tbl_login.Username=tbl_doctor.Username JOIN tbl_doctor_category ON tbl_doctor.Sp_Id=tbl_doctor_category.Sp_Id WHERE User_Type='doctor' AND logout_time is NULL AND (tbl_doctor.Doc_Name LIKE '%${data.searchQuery}%' OR tbl_doctor_category.Sp_Name LIKE '%${data.searchQuery}%');`})
        });
        let table = await response.json();
        console.log(table);
        setDoctors(table);
    }

    function fn() {
        // doctors.m(doctor)
        console.log('doctor')
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
                    {JSON.stringify(watch(), null, 20)}
                <SearchResults>
                    <pre>{JSON.stringify(doctors, null, 2)}</pre> 
                    { doctors.map((doctor, index) => 
                        <Card />
                
                        
                    
                    
                    )}
                </SearchResults>
                    <button onClick={fn}></button>
            </SearchContainer>
        </BookingSection> 
    </BookingPageContainer>
}