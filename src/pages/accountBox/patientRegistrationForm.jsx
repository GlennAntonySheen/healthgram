import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { TextField } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';

import {  FormContainer, FileUpload, ErrorText, Button, Form, PageNav, FormPage } from "./common";
import BackArrow from '../../assets/icons/arrow-left-circle.svg';

export function PatientRegistrationForm (props) {
    const [page, setPage] = useState(1);
    const [buttonText, setButtonText] = useState('Next');
    const { 
        watch, 
        register, 
        handleSubmit,
        getValues,
        setValue,
        formState: { errors, isValid }
    } = useForm({ mode: "all", reValidateMode: "all" });   
    const prevBtnRef = useRef(null); 
    const [btnDisable, setBtnDisable] = useState(false);

    const onSubmit = data => alert(JSON.stringify(data));

    const fieldStyles = {
        marginTop: '15px'
    }



    function nextBtnHover() {
        if (page == 1) {
            if ((((!(getValues('name') === undefined || getValues('name')=="")) && (errors.name === undefined))==true) &&
                (((!(getValues('phoneNo') === undefined || getValues('phoneNo')=="")) && (errors.phoneNo === undefined))==true) &&
                (((!(getValues('gender') === undefined || getValues('gender')=="")) && (errors.gender === undefined))==true) &&
                (((!(getValues('dob') === undefined || getValues('dob')=="")) && (errors.dob === undefined))==true)) {
                console.log('trueeeee');
                setBtnDisable(true);
            } else {
                setBtnDisable(false);
            }
        } else if (page == 2) {
            if ((((!(getValues('houseNo') === undefined || getValues('houseNo')=="")) && (errors.houseNo === undefined))==true) &&
                (((!(getValues('street') === undefined || getValues('street')=="")) && (errors.street === undefined))==true) &&
                (((!(getValues('district') === undefined || getValues('district')=="")) && (errors.district === undefined))==true) &&
                (((!(getValues('pin') === undefined || getValues('pin')=="")) && (errors.pin === undefined))==true)) {
                console.log('trueeeee');
                setBtnDisable(true);
            } else {
                setBtnDisable(false);
            }
        } else if (page == 3) {
            if (getValues('drivingLicence').length == 1) {
                setBtnDisable(true);
            } else {
                setBtnDisable(false);
            } 
        }
    }

    function nextBtnClick() {  
        if (btnDisable) {
            if (page == 1) {
                setPage(2);
                prevBtnRef.current.style.display = "inline";
                console.log(prevBtnRef.current.style.display);
                document.getElementById('Page1').style.left = "-450px";
                document.getElementById('Page2').style.left = "0px";
            } else if (page == 2) {
                setPage(3);     setButtonText('Register');
                document.getElementById('Page2').style.left = "-450px";
                document.getElementById('Page3').style.left = "0px";
            } else if (page == 3 && isValid) {
                handleSubmit(onSubmit)();
            } 
        }
    }

    function PrevBtnClick() {
        if (page == 2) {
            setPage(1);
            prevBtnRef.current.style.display = "none";
            document.getElementById('Page2').style.left = "450px";
            document.getElementById('Page1').style.left = "0px";
        } else if (page == 3) {
            setPage(2);          setButtonText('Next');
            document.getElementById('Page3').style.left = "450px";
            document.getElementById('Page2').style.left = "0px";
        }
    }


    return <>    
        <FormContainer style={{ height: '380px' }}>            
            <PageNav>
                <img src={BackArrow} id="Prev" ref={prevBtnRef} onClick={PrevBtnClick} />
                <p>Page {page} out of 4</p>
            </PageNav>            
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormPage id="Page1">
                    <h3>PERSONAL INFO</h3>
                    <TextField
                        name="name"
                        label="Full Name*"
                        variant="outlined"
                        fullWidth="true"
                        size="small"
                        {...register("name", { 
                            required: "Please Enter your Full Name"
                        })}
                    />
                    {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
                    
                    <TextField 
                        name="phoneNo"
                        label="Phone Number*"
                        variant="outlined"
                        fullWidth="true"
                        size="small"
                        style={fieldStyles}
                        {...register("phoneNo", { 
                            required: "Please Enter your Phone Number",
                            maxLength: { 
                                value: 13, 
                                message: "Maximum limit is 12 digits"
                            }, 
                            pattern: { 
                                value: /^[+][0-9]{12}$/i, 
                                message: "Enter number of pattern +919895167005"
                            }})
                        }
                    />
                    {errors.phoneNo && <ErrorText>{errors.phoneNo.message}</ErrorText>}

                    <br/>
                    <FormControl variant="outlined" size="small" >
                        <InputLabel id="demo-simple-select-outlined-label" value="Gender">Gender*</InputLabel>
                        <Select
                            name="gender"
                            label="Gender"         
                            {...register("gender", { 
                                required: "Please Enter your Full Name"
                            })}
                        >
                            <MenuItem disabled><em>Select Your Gender</em></MenuItem>
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={'female'}>Female</MenuItem>
                            <MenuItem value={'other'}>Other</MenuItem>
                        </Select>
                    </FormControl>
                    {errors.gender && <ErrorText>{errors.gender.message}</ErrorText>} 
                    
                    <TextField 
                        name="dob"
                        label="DOB*"
                        variant="outlined"
                        fullWidth="true"
                        size="small"
                        style={fieldStyles}
                        {...register("dob", { 
                            required: "Please Enter Your Date Of Birth",
                            pattern: {
                                value: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19[2-9][0-9]|200[0-5])$/,
                                message: "Enter a valid date in the format DD-MM-YYYY (NOTE: You must be 16 years old or more"
                            }})
                        }
                    />
                    {errors.dob && <ErrorText>{errors.dob.message}</ErrorText>} 
                </FormPage>

                <FormPage id="Page2">
                    <h3>ADDRESS DETAILS</h3>
                    <TextField
                        name="houseNo"
                        label="House Number*"
                        variant="outlined"
                        fullWidth="true"
                        size="small"
                        {...register("houseNo", { 
                            required: "Please Enter Your House Number",
                            maxLength: { 
                                value: 10, 
                                message: "Invlid House Number"
                            }
                        })}
                    />
                    {errors.houseNo && <ErrorText>{errors.houseNo.message}</ErrorText>}
                    
                    <TextField
                        name="street"
                        label="Street *"
                        variant="outlined"
                        fullWidth="true"
                        size="small"
                        style={fieldStyles}
                        {...register("street", { 
                            required: "Please Enter your Street"
                        })}
                    />
                    {errors.street && <ErrorText>{errors.street.message}</ErrorText>}
                    
                    <TextField
                        name="district"
                        label="District*"
                        variant="outlined"
                        fullWidth="true"
                        size="small"
                        style={fieldStyles}
                        {...register("district", { 
                            required: "Please Enter your District"
                        })}
                    />
                    {errors.district && <ErrorText>{errors.district.message}</ErrorText>}
                    
                    <TextField
                        name="pin"
                        label="Pincode*"
                        variant="outlined"
                        fullWidth="true"
                        size="small"
                        style={fieldStyles}
                        {...register("pin", { 
                            required: "Please Enter your Pincode",
                            pattern: {
                                value: /^[0-9]{6}$/i,
                                message: "Enter A Valid Pincode"
                            }
                        })}
                    />
                    {errors.pin && <ErrorText>{errors.pin.message}</ErrorText>}
                </FormPage>
            
                <FormPage id="Page3">                    
                    <h3>UPLOAD DOCUMENTS</h3>
                    <h5>Upload your Driving Licence</h5>
                    <input 
                        name="drivingLicence"
                        type="file" 
                        label="gjjkj"
                        {...register("drivingLicence", { 
                            required: "Please Upload Your Driving Licence"
                        })}
                    ></input>
                    {errors.drivingLicence && <ErrorText>{errors.drivingLicence.message}</ErrorText>}

                </FormPage>
            </Form>
        </FormContainer>
        {/* <button onClick={() => console.log(getValues('drivingLicence').length == 1)}>gjh</button> */}
        <Button id="NextBtn" onMouseEnter={nextBtnHover} onClick={nextBtnClick} value="Next" disable={btnDisable}>{buttonText}</Button> 
    </>
}