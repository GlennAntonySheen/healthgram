import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { TextField } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';

import {  FormContainer, ShowPaswd, ErrorText, Button, Form, PageNav, FormPage } from "./common";
import BackArrow from '../../assets/icons/arrow-left-circle.svg';

export function DoctorRegistrationForm (props) {
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
    const [phoneNoElemt, setPhoneNoElemt] = useState(false);

    const [showpswd, setShowpswd] = useState(true);

    const fieldStyles = {
        marginTop: '15px'
    }

    const doctorSpecializations = [
        { title: 'Cardiologist' },
        { title: 'Audiologist' },
        { title: 'ENT' },
        { title: 'Gynaecologist' },
        { title: 'Paediatrician' },
        { title: 'Psychiatrists' },
        { title: 'Pulmonologist' },
        { title: 'Endocrinologist' },
        { title: 'Oncologist' },
    ];

    function nextBtnHover() {
        // const pageContents = ['name'];
        // console.log(errors.name );
        // console.log(((!(getValues('name') === undefined || getValues('name')=="")) && (errors.name === undefined))==true)
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
            if ((((!(getValues('specialization') === undefined || getValues('specialization')=="")) && (errors.specialization === undefined))==true) &&
                (((!(getValues('fee') === undefined || getValues('fee')=="")) && (errors.fee === undefined))==true) &&
                (((!(getValues('selfDescription') === undefined || getValues('selfDescription')=="")) && (errors.selfDescription === undefined))==true)) {
                console.log('trueeeee');
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
                setPage(3);     
                document.getElementById('Page2').style.left = "-450px";
                document.getElementById('Page3').style.left = "0px";
            } else if (page == 3) {
                setPage(4);     setButtonText('Register');
                document.getElementById('Page3').style.left = "-450px";
                document.getElementById('Page4').style.left = "0px";
            } else if (page == 4 && isValid ) {
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
            setPage(2);     
            document.getElementById('Page3').style.left = "450px";
            document.getElementById('Page2').style.left = "0px";
        } else if (page == 4) {
            setPage(3);     setButtonText('Next');
            document.getElementById('Page4').style.left = "450px";
            document.getElementById('Page3').style.left = "0px";
        }
    }

    const onSubmit = async data => {
        let response= await fetch("http://localhost/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`SELECT * FROM userbase WHERE Username="${data.email}";`})
        });
        let userbaseTable = await response.json();
        console.log(userbaseTable);
        
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
                    <h3>JOB DETAILS</h3>
                    <Autocomplete
                        name="specialization"
                        options={doctorSpecializations}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField {...params} label="Specialization" variant="outlined" size="small" /> }
                        {...register("specialization", { required: "Please Select your Specialization" })}
                        onChange={(event, value) => setValue('specialization', value.title)}
                    />
                    {errors.specialization && <ErrorText>{errors.specialization.message}</ErrorText>}

                    <TextField
                        name="fee"
                        label="Fee*"
                        variant="outlined"
                        fullWidth="true"
                        size="small"
                        style={fieldStyles}
                        {...register("fee", { 
                            required: "Please Enter Expected Fee",
                            min: {
                                value: 1,
                                message: "Min Amount is 1"
                            },
                            max: {
                                value: 9999,
                                message: "Max Amount is 9,999"
                            },
                            pattern: {
                                value: /^[0-9]*$/,
                                message: "Enter Amount between 1 And 9,999"
                            },
                        })}
                    />
                    {errors.fee && <ErrorText>{errors.fee.message}</ErrorText>}

                    <TextField
                        name="selfDescription"
                        label="Self Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        style={fieldStyles}
                        {...register("selfDescription", { 
                            required: "Please Describe About Yourself",
                            minLength: {
                                value: 20,
                                message: "Not Enough"
                            },
                            maxLength: {
                                value: 250,
                                message: "Max 250 letters"
                            }
                        })}
                    />
                    {errors.selfDescription && <ErrorText>{errors.selfDescription.message}</ErrorText>}
                </FormPage>

                <FormPage id="Page4">
                    <h3>ACCOUNT DETAILS</h3>
                    <TextField
                        name="email"
                        label="E-mail*"
                        variant="outlined"
                        fullWidth="true"
                        size="small"
                        {...register("email", { 
                            required: "Please Enter E-mail ID",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid E-mail Address"
                            }
                        })}
                    />
                    {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

                    <TextField
                        name="password"
                        label="Password*"
                        variant="outlined"
                        type={showpswd ? 'password' : 'text'}
                        fullWidth="true"
                        size="small"
                        style={fieldStyles}
                        {...register("password", { 
                            required: "Please Enter A Password",
                            minLength: {
                                value: 8,
                                message: "Password Must Contain Atleast 8 Characters"                            
                            }
                        })}
                    />
                    <ShowPaswd>
                        <Checkbox
                            color="primary"
                            size="small"
                            // checked="true"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            onClick={() => setShowpswd(!showpswd)}
                        />
                        <p>Show Password</p>
                    </ShowPaswd>                    
                    {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                    
                    <TextField
                        name="confirmPassword"
                        label="Confirm Password*"
                        variant="outlined"
                        type="password"
                        fullWidth="true"
                        size="small"
                        style={fieldStyles}
                        {...register("confirmPassword", { 
                            required: "Please re-enter Password",
                            validate: value => value === getValues('password') || "The passwords do not match"
                        })}
                    />
                    {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
                </FormPage>
            </Form>            
        </FormContainer>
        <Button id="NextBtn" onMouseEnter={nextBtnHover} onClick={nextBtnClick} value="Next" disable={btnDisable}>{buttonText}</Button> 
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
    </>
}