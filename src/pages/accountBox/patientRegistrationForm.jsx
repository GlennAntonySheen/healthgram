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

export function PatientRegistrationForm (props) {
    const [page, setPage] = useState(1);
    const [buttonText, setButtonText] = useState('Next');
    const { 
        watch, 
        register, 
        handleSubmit,
        getValues,
        formState: { errors, isValid }
    } = useForm({ mode: "all", reValidateMode: "all" });   
    const prevBtnRef = useRef(null); 
    const [btnDisable, setBtnDisable] = useState(false);
    const [showpswd, setShowpswd] = useState(true);
    const [registerError, setRegisterError] = useState('');
    const [idProofDataURL, setIdProofDataURL] = useState('')

    const reader = new FileReader();

    const fieldStyles = {
        marginTop: '15px'
    }

    function nextBtnHover() {
        if (page == 1) {
            if ((((!(getValues('name') === undefined || getValues('name')=="")) && (errors.name === undefined))==true) &&
                (((!(getValues('phoneNo') === undefined || getValues('phoneNo')=="")) && (errors.phoneNo === undefined))==true) &&
                (((!(getValues('gender') === undefined || getValues('gender')=="")) && (errors.gender === undefined))==true) &&
                (((!(getValues('dob') === undefined || getValues('dob')=="")) && (errors.dob === undefined))==true)) {
                
                setBtnDisable(true);
            } else {
                setBtnDisable(false);
            }
        } else if (page == 2) {
            if ((((!(getValues('houseNo') === undefined || getValues('houseNo')=="")) && (errors.houseNo === undefined))==true) &&
                (((!(getValues('street') === undefined || getValues('street')=="")) && (errors.street === undefined))==true) &&
                (((!(getValues('district') === undefined || getValues('district')=="")) && (errors.district === undefined))==true) &&
                (((!(getValues('pin') === undefined || getValues('pin')=="")) && (errors.pin === undefined))==true)) {
                
                setBtnDisable(true);
            } else {
                setBtnDisable(false);
            }
        } else if (page == 3) {
            if ((((!(getValues('email') === undefined || getValues('email')=="")) && (errors.email === undefined))==true) &&
                (((!(getValues('password') === undefined || getValues('password')=="")) && (errors.password === undefined))==true) &&
                (((!(getValues('confirmPassword') === undefined || getValues('confirmPassword')=="")) && (errors.confirmPassword === undefined))==true)) {              
                setBtnDisable(true);
            } else {
                setBtnDisable(false);
            }
        } else if (page == 4) {
            if (getValues('idProof').length == 1) {
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
            } else if (page == 4 && isValid) {
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
        } else if (page == 4) {
            setPage(3);          setButtonText('Next');
            document.getElementById('Page4').style.left = "450px";
            document.getElementById('Page3').style.left = "0px";
        }
    }
    
    const onSubmit = async data => {
        let response= await fetch("http://localhost/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`SELECT * FROM tbl_userbase WHERE Username="${data.email}";`})
        });
        let table = await response.json();
        console.log(table);

        if (table.length == 0) {
            setRegisterError('')

            let response= await fetch("http://localhost/healthgram/test.php",{
                method:"POST",
                header:{"Content-Type": "application/json"},
                body:JSON.stringify({"query":`
                    INSERT INTO tbl_userbase(Username,Password,User_Type,User_Status) VALUES('${data.email}','${data.password}','patient','not verified');
                    INSERT INTO tbl_patient (Pat_Id, Username, Pat_Name, Pat_Phone_No, Pat_Dob, Pat_Gender, Pat_House_No, Pat_Street, Pat_Dist, Pat_Pin, Pat_Date_Registered, Pat_Id_Proof) VALUES (NULL, '${data.email}', '${data.name}', '${data.phoneNo}', '${data.dob}', '${data.gender}', '${data.houseNo}', '${data.street}', '${data.district}', '${data.pin}', current_timestamp(), '${idProofDataURL}'); 
                `})
            });
            let userbaseTable = await response.json();
            console.log('userbaseTable: ', userbaseTable);

            if (userbaseTable.length == 0) {
                alert('Your have Registered successfully. \nPlease be patient enough till we send you a confirmation letter within 1 - 2 days.');
            }
        } else {
            setRegisterError('This User Already Exist')
        }
    }

    function fn() {
    }

    return <>    
        <FormContainer style={{ height: '380px' }}>            
            <PageNav>
                <img src={BackArrow} id="Prev" ref={prevBtnRef} onClick={PrevBtnClick} />
                <p>Page {page} out of 4</p>
            </PageNav>         
            <Form onSubmit={handleSubmit(onSubmit)}  >
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
                    <FormControl variant="outlined" size="small" style={{marginTop: '15px'}}>
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
                                value: /^(19[2-9][0-9]|200[0-5])-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                                message: "Enter a valid date in the format YYYY-MM-DD (NOTE: You must be 16 years old or more"
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

                <FormPage id="Page4">                    
                    <h3>UPLOAD DOCUMENTS</h3>
                    <h5>Upload your Driving Licence OR Any Proof For Your Age*</h5>
                    <input 
                        type="file" 
                        name="idProof"
                        label="gjjkj"
                        {...register("idProof", { 
                            required: "Please Upload Your Driving Licence"
                        })}
                        onChange = { () => {
                            reader.readAsDataURL(getValues('idProof')[0]);
                            reader.onload = (e) => {
                                setIdProofDataURL(reader.result);
                            }
                        }}
                    ></input>
                    {errors.idProof && <ErrorText>{errors.idProof.message}</ErrorText>}

                </FormPage>
            </Form> 
        </FormContainer>
        <Button id="NextBtn" onMouseEnter={nextBtnHover} onClick={nextBtnClick} value="Next" disable={btnDisable}>{buttonText}</Button> 
        <ErrorText>{registerError}</ErrorText>
        {/* <button onClick={() => console.log(idProofDataURL)}>gjh</button> */}
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
    </>
}