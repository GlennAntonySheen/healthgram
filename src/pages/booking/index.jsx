import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Lottie from 'react-lottie';
import DefaultDoctorProfilePicture from '../../assets/images/defaultDoctorProfilePicture.jpg'
import animationData from '../../assets/lottie animations/49259-scroll-s.json';
import BackgroungImg from '../../assets/images/booking backgroung.jpg'
import SearchIcon from '../../assets/icons/bx-search-alt-2.svg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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
        color: #1976d2;
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
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: 20px 900px;
    /* background-color: yellow; */
`;

const Card = styled.div`
    height: 300px;
    width: 600px;
    margin: 43px;
    display: flex;
    align-items: center;
    outline: none;
    border: none;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transition: .3s all ease-in-out;
    /* background-color: #1485eb; */
    
    &:hover {
        transform: translateY(-5px);
    }
    
`;

const ProfilePicture = styled.div`
    height: 60%;
    /* background-color: green; */
    margin: 20px 0px 20px 20px;    

    img {
        height: 100%;
        border-radius: 50%;
    }
    `;

const CardTextContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    flex: 1;
    padding: 10px;
    /* background-color: brown; */
`;

const DoctorName = styled.div`
    margin: 20px 0px 0px;
    font-family: 'poppins';
    font-size: 2.2rem;
    font-weight: bold;
    color: #006db6;
`;

const DoctorDetails = styled.div`
    font-family: 'poppins';
    font-size: 1.3rem;
    margin-bottom: -10px;
    color: #006db6;
    `;

const DoctorDescription = styled.p`
    height: 100%;
    display: flex;
    flex-grow: 1;
    font-family: 'sans-pro-text';
    font-weight: 100;
    align-items: center;
    color: rgb(81, 81, 84);
    /* background-color: blue; */
`;

const DoctorBook = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
    /* background-color: red; */

    code {
        font-size: 1.8rem;
        color: #1976d2;
    }

    Button {
        margin-right: 10px;
    }
    
    /* button {
        height: 100%;
        padding: 0 10px;
        font-family: 'poppins';
        font-size: 1.5rem;
        font-weight: lighter;
        /* border: 2px solid #006db6; 
        border: none;
        border-radius: 5px;
        outline: none;
        color: white;
        background-color: #006db6;
    } */
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
            body:JSON.stringify({"query":`SELECT tbl_userbase.Username, Doc_Pic, Doc_Description, Doc_Fee, Doc_Gender, Doc_Name, Doc_No_Of_Tokens, Doc_Dob, Sp_Name FROM tbl_login JOIN tbl_userbase ON tbl_login.Username=tbl_userbase.Username JOIN tbl_doctor ON tbl_login.Username=tbl_doctor.Username JOIN tbl_doctor_category ON tbl_doctor.Sp_Id=tbl_doctor_category.Sp_Id WHERE User_Type='doctor' AND logout_time is NULL AND (tbl_doctor.Doc_Name LIKE '%${data.searchQuery}%' OR tbl_doctor_category.Sp_Name LIKE '%${data.searchQuery}%');`})
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
                <SearchResults>
                    {doctors.map((doctor, index) =>                         
                        <Card>
                            <ProfilePicture><img src={doctor.Doc_Pic || DefaultDoctorProfilePicture} /></ProfilePicture>
                            <CardTextContainer>
                                <DoctorName>{`Dr. ${doctor.Doc_Name.toUpperCase()}`}</DoctorName>
                                <DoctorDetails>{`${doctor.Sp_Name}`}</DoctorDetails>
                                <DoctorDetails>
                                    {`${new Date().getFullYear() - doctor.Doc_Dob.substr(0, 4)} Years old, ${doctor.Doc_Gender.toUpperCase()}`}
                                    <i class={`bx bx-${doctor.Doc_Gender}`}></i>
                                </DoctorDetails>
                                <DoctorDescription>{doctor.Doc_Description}</DoctorDescription>
                                <DoctorBook>
                                    <code>{`₹${doctor.Doc_Fee}`}</code>
                                    {/* <button>Book</button> */}
                                    <Button variant="contained" startIcon={<FavoriteBorderIcon />}>Book Now</Button>
                                </DoctorBook>
                            </CardTextContainer>
                        </Card>
                    )}
                </SearchResults>
                    {JSON.stringify(watch(), null, 20)}
                    <pre style={{maxWidth: "900px"}}>{JSON.stringify(doctors, null, 2)}</pre>
                    <button onClick={fn}>fjjt</button>
            </SearchContainer>
        </BookingSection> 
    </BookingPageContainer>
}