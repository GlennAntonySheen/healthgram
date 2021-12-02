import React, { useState, useRef,useEffect } from 'react';
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
    const [registerError, setRegisterError] = useState('');
    const [doctorSpecializations, setDoctorSpecializations] = useState([])
    const [certificateDataURL, setCertificateDataURL] = useState('');
    const [drivingLicenceDataURL, setDrivingLicenceDataURL] = useState('');
    const [profilePictureDataURL, setProfilePictureDataURL] = useState(null);

    const reader = new FileReader();

    const fieldStyles = {
        marginTop: '15px'
    }

    function nextBtnHover() {
        // console.log(((!(getValues('name') === undefined || getValues('name')=="")) && (errors.name === undefined))==true)
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
            if ((((!(getValues('specialization') === undefined || getValues('specialization')=="")) && (errors.specialization === undefined))==true) &&
                (((!(getValues('fee') === undefined || getValues('fee')=="")) && (errors.fee === undefined))==true) &&
                (((!(getValues('selfDescription') === undefined || getValues('selfDescription')=="")) && (errors.selfDescription === undefined))==true)) {
                setBtnDisable(true);
            } else {
                setBtnDisable(false);
            }
        } else if (page == 4) {
            if ((((!(getValues('email') === undefined || getValues('email')=="")) && (errors.email === undefined))==true) &&
                (((!(getValues('password') === undefined || getValues('password')=="")) && (errors.password === undefined))==true) &&
                (((!(getValues('confirmPassword') === undefined || getValues('confirmPassword')=="")) && (errors.confirmPassword === undefined))==true)) {
                setBtnDisable(true);
            } else {
                setBtnDisable(false);
            }
        } else if (page == 5) {
            if (((getValues('certificate').length == 1) ) && (getValues('drivingLicence').length == 1)) {
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
                setPage(4);    
                document.getElementById('Page3').style.left = "-450px";
                document.getElementById('Page4').style.left = "0px";
            } else if (page == 4) {
                setPage(5);     setButtonText('Register');
                document.getElementById('Page4').style.left = "-450px";
                document.getElementById('Page5').style.left = "0px";
            } else if (page == 5 && isValid ) {
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
            setPage(3);     
            document.getElementById('Page4').style.left = "450px";
            document.getElementById('Page3').style.left = "0px";
        } else if (page == 5) {
            setPage(4);     setButtonText('Next');
            document.getElementById('Page5').style.left = "450px";
            document.getElementById('Page4').style.left = "0px";
        }
    }

    const getSpId = () => {
        var id;
        doctorSpecializations.forEach(function (s) {
            
            console.log(s.Sp_Name)
            if (s.Sp_Name == getValues('specialization')) {
                id = s.Sp_Id;
            }
        })
        return id;
    }

    const onSubmit = async data => {
        
        // Checking if the new user already exist
        let response= await fetch("http://localhost:8080/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`SELECT * FROM tbl_userbase WHERE Username="${data.email}";`})
        });
        let table = await response.json();
        console.log(table);

        // no duplicate user exist
        if (table.length == 0) {
            setRegisterError('')

            let response= await fetch("http://localhost:8080/healthgram/test.php",{
                method:"POST",
                header:{"Content-Type": "application/json"},
                body:JSON.stringify({"query":`
                    INSERT INTO tbl_userbase(Username,Password,User_Type,User_Status) VALUES('${data.email}','${data.password}','doctor','not verified');
                    INSERT INTO tbl_doctor (Doc_Id, Sp_Id, Username, Doc_Name, Doc_Phone_No, Doc_Dob, Doc_Gender, Doc_House_No, Doc_Street, Doc_Dist, Doc_Pin, Doc_Date_Registered, Doc_No_Of_Tokens, Doc_Fee, Doc_Pic, Doc_Proof,  Doc_Age_Proof, Doc_Description) VALUES (NULL, '${getSpId()}', '${data.email}', '${data.name}', '${data.phoneNo}', '${data.dob}', '${data.gender}', '${data.houseNo}', '${data.street}', '${data.district}', '${data.pin}', CURRENT_TIMESTAMP, '0', '${data.fee}', ${profilePictureDataURL == null ? null : `'${profilePictureDataURL}'`}, '${certificateDataURL}', '${drivingLicenceDataURL}', '${data.selfDescription}');`})
            });
            let userbaseTable = await response.json();

            if (userbaseTable.length == 0) {
                alert('Your have Registered successfully. \nPlease be patient enough till we send you a confirmation letter within 1 - 2 days.');
            }
        } else {
            setRegisterError('This User Account Already Exist')
        }
    }

    return <>        
        <FormContainer style={{ height: '380px' }}>
            <PageNav>
                <img src={BackArrow} id="Prev" ref={prevBtnRef} onClick={PrevBtnClick} />
                <p>Page {page} out of 5</p>
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
                                value: /^(19[2-9][0-9]|2000)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                                message: "Enter a valid date in the format YYYY-MM-DD"
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
                        getOptionLabel={(option) => option.Sp_Name}
                        onOpen={async () => {
                            let response = await fetch("http://localhost:8080/healthgram/test.php",{
                                method:"POST",
                                header:{"Content-Type": "application/json"},
                                body:JSON.stringify({"query":`SELECT * FROM tbl_doctor_category`})
                            });
                            const tabe = await response.json();
                            setDoctorSpecializations(tabe)
                        }}
                        renderInput={(params) => <TextField {...params} label="Specialization" variant="outlined" size="small" /> }
                        {...register("specialization", { required: "Please Select your Specialization" })}
                        onChange={(event, value) => setValue('specialization', value.Sp_Name)}
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
                    />
                    {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
                </FormPage>
            
                <FormPage id="Page5">
                    <h3>UPLOAD DOCUMENTS</h3>
                    <h5>Upload your Certificate Of Degree Completion*</h5>
                    <input 
                        type="file" 
                        name="certificate"
                        label="gjjkj"
                        {...register("certificate", { 
                            required: "Please Upload Your Certificate Of Degree Completion"
                        })}
                        onChange = { () => {
                            reader.readAsDataURL(getValues('certificate')[0]);
                            reader.onload = (e) => {
                                setCertificateDataURL(reader.result);
                                console.log('result: ', certificateDataURL)
                            }
                        }}
                    ></input>
                    {errors.certificate && <ErrorText>{errors.certificate.message}</ErrorText>}

                    <h5>Upload your Driving Licence*</h5>
                    <input 
                        type="file" 
                        name="drivingLicence"
                        label="gjjkj"
                        {...register("drivingLicence", { 
                            required: "Please Upload Your Driving Licence"
                        })}
                        onChange = { () => {
                            reader.readAsDataURL(getValues('drivingLicence')[0]);
                            reader.onload = (e) => {
                                setDrivingLicenceDataURL(reader.result);
                            }
                        }}
                    ></input>
                    {errors.drivingLicence && <ErrorText>{errors.drivingLicence.message}</ErrorText>}
                    {errors.certificate && <ErrorText>{errors.certificate.message}</ErrorText>}

                    <h5>Profile Picture</h5>
                    <input 
                        type="file" 
                        name="profilePicture"
                        label="gjjkj"
                        {...register("profilePicture")}
                        onChange = { () => {
                            reader.readAsDataURL(getValues('profilePicture')[0]);
                            reader.onload = (e) => {
                                setProfilePictureDataURL(reader.result);
                            }
                        }}
                    ></input>
                </FormPage>
            </Form>            
        </FormContainer>
        <Button id="NextBtn" onMouseEnter={nextBtnHover} onClick={nextBtnClick} value="Next" disable={btnDisable}>{buttonText}</Button> 
        <ErrorText>{registerError}</ErrorText>
        {/* <button onClick = {getSpId }>dfbnd</button> */}
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre>  */}
    </>
}