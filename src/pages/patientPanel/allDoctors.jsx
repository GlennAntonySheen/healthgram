import React, { useState, useRef, useEffect }  from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import FormControl from "@material-ui/core/FormControl";
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import IconButton from '@mui/material/IconButton';
import RadioGroup from '@mui/material/RadioGroup';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DefaultDoctorProfilePicture from '../../assets/images/defaultDoctorProfilePicture.jpg'
import SearchIcon from '../../assets/icons/searchdoctor.svg'

const PageWrapper = styled.div`
    /* height: 200vh; */
    /* width: 100vw; */
    margin-top: 128px;
    margin-right: 28px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    position: relative;
    /* background-color: green; */
`;

const SearchContainer = styled.div`
    width: 100%;
    display: flex;
    /* flex-direction: column; */
    justify-content: space-evenly;
    align-items: flex-end;
    /* background-color: red; */
`;

const Searchbar = styled.div`
    /* width: fit-content; */
    display: flex;
    flex-shrink: 1;
    justify-content: space-between;
    align-items: center;
    position: relative;
    border: 2px solid #1976d2;
    border-radius: 5rem;
    box-shadow: -5px -5px 8px #edeff1, 5px 5px 10px #cacfd8;
    overflow: hidden;
    outline: none;
    /* background-color: green; */

    input {
        /* height: 100%; */
        width: 450px;
        padding: 12px 19px 16px;
        outline: none;
        border: none;
        font-size: 20px;
        transition:0.5s;
        /* background-color: orange; */
    }

    button {
        height: 52px;
        width: 52px;
        border: #1976d2;
        align-items: flex-end;
        padding: 10px;
        margin-right: 6px;
        border-radius: 100%;
        outline: #1976d2;
        cursor: pointer;
        background-color: #1976d2;
        scale: 1.31;

        img {
            height: 100%;


        }
    }

`;

const Filter = styled.div`
    /* margin-top: 20px; */
    display: flex;
    align-items: center;
    /* background-color: orange; */
`;

const Gender = styled.div`
    /* background-color: green; */
`;

const Price = styled.div`
    margin-left: 50px;
    /* display: flex;
    align-items: center; */
    /* background-color: pink; */
`;

const SearchResults = styled.div`
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding-top: 20px;
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
        scale: 1.01;
        /* transform: translateY(-5px); */
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
    margin: 15px 0px 0px;
    font-family: 'poppins';
    font-size: 2.2rem;
    font-weight: bold;
    color: #006db6;
`;

const DoctorDetails = styled.div`
    font-family: 'poppins';
    font-size: 1.2rem;
    margin-bottom: 2px;
    padding: 0px 6px;
    color: #006db6;
    border-radius: .3rem;
    background-color: #e7f1fb;
`;

const DoctorDescription = styled.p`
    height: 100%;
    display: flex;
    margin: 5px 0px;
    font-family: 'IBM Plex Sans', sans-serif;
    align-items: flex-start;
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
`;

export function AllDoctors(props) {
    document.title = "All Doctors";

    const [details, setDetails] = React.useState([]);
    const [priceRange, setPriceRange] = useState([0, 9999])
    const { 
        watch, 
        register, 
        handleSubmit,
        control,
        getValues,
        setValue,
        formState: { errors, isValid }
    } = useForm({ mode: "all", reValidateMode: "all" });   

    const getAllDoctor = async (data) => {
        let response= await fetch("http://localhost:8080/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`SELECT Username, Doc_Id, Doc_Pic, Doc_Description, Doc_Fee, Doc_Gender, Doc_Name, Doc_No_Of_Tokens, Doc_Dob, Sp_Name FROM tbl_doctor JOIN tbl_doctor_category ON tbl_doctor.Sp_Id=tbl_doctor_category.Sp_Id WHERE (tbl_doctor.Doc_Name LIKE '%${data.searchQuery}%' OR tbl_doctor_category.Sp_Name = '${data.searchQuery}') AND tbl_doctor.Doc_Gender LIKE '${data.gender}' AND tbl_doctor.Doc_Fee BETWEEN ${priceRange[0]} AND ${priceRange[1]};`})
        });
        let table = await response.json();
        // console.log(table);
        setDetails(table);
        // console.log('bookingDetails is ', bookingDetails)
    }
    
    useEffect(() => {
        handleSubmit(getAllDoctor)()
    }, [])

    function currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return <PageWrapper>
        <SearchContainer>
            <Filter>
                <Gender>
                    <FormLabel component="legend">Doctor Gender</FormLabel>
                    <FormControl component="fieldset">
                        <Controller
                            control={control}
                            defaultValue="%%"
                            name="gender"
                            render={({ field }) => {
                            const { name, onBlur, onChange, value } = field;
                            return (
                                <RadioGroup
                                    row 
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                        handleSubmit(getAllDoctor)()
                                    }
                                }>
                                    <FormControlLabel value="%%" control={<Radio />} label="All"/>
                                    <FormControlLabel value="male" control={<Radio />} label="Male"/>
                                    <FormControlLabel value="female" control={<Radio />} label="Female"/>
                                </RadioGroup>
                            );}}
                        />
                    </FormControl>
                </Gender>
                <Price>
                    <FormLabel component="legend" sx={{ mb: 1 }}>Fee Range</FormLabel>
                    <TextField
                        label="Min"
                        size="small"
                        sx={{ width: 90 }}
                        value={currencyFormat(priceRange[0])}
                        InputProps={{
                            readOnly: true,
                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        }}
                    />
                    <Slider
                        min={0}
                        max={9999}
                        value={priceRange}
                        sx={{ width: 200, mx: 3 }}
                        onChange={(event, value) => {
                            setPriceRange(value)
                        }}
                        onChangeCommitted={(event, value) =>{
                            
                            handleSubmit(getAllDoctor)() 
                        }}
                        valueLabelDisplay="auto"
                    />
                    <TextField
                        label="Max"
                        size="small"
                        sx={{ width: 90 }}
                        value={currencyFormat(priceRange[1])}
                        InputProps={{
                            readOnly: true,
                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        }}
                    />
                </Price>
            </Filter>            
            <Searchbar>
                <input 
                    name="searchQuery"
                    placeholder="Search For Doctor Name/Specialization"
                    {...register("searchQuery")}
                />
                <button onClick={ () => handleSubmit(getAllDoctor)()}><img src={SearchIcon}></img></button>
            </Searchbar>
        </SearchContainer>
        <SearchResults>
            { details.map((doctor, index) => {
                // console.log(doctor.Doc_No_Of_Tokens)
                return <Card> 
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
                            {/* {(doctor.logout_time == null && doctor.Doc_No_Of_Tokens > 0) &&  */}
                            {/* <Button 
                                variant="contained" 
                                startIcon={<FavoriteBorderIcon />} 
                                onClick={ () => getAllDoctor(doctor)}
                            >Book Now</Button> */}
                        </DoctorBook>
                    </CardTextContainer> 
                </Card>
            })}
        </SearchResults>
    </PageWrapper>

}