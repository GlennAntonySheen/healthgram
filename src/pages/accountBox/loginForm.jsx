import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormContainer, Form, Button, ShowPaswd, ErrorText } from "./common";
import { TextField } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';

export function LoginInForm (props) {
    const { 
        watch, 
        register, 
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({ mode: "all", reValidateMode: "all" });   
    const history = useHistory();
    const [showpswd, setShowpswd] = useState(true);
    const [loginErrorText, setLoginErrorText] = useState('')


    const OnSubmit = async data => {
        // console.log(data)
        let response= await fetch("http://localhost/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`SELECT * FROM tbl_userbase WHERE Username="${data.email}";`})
            // body:JSON.stringify({"query":`SELECT * FROM tbl_userbase WHW`})
        });
        let userbaseTable = await response.json();

        if (userbaseTable.length == 0 || userbaseTable[0].Password != data.password) {
            setLoginErrorText('Your Username Or Password Is Invalid.');
        } else if (userbaseTable[0].User_Status == 'not verified') {
            setLoginErrorText('Your Details Are Yet To Be Verified, You Will Be Notified When Its Completed.');
        } else if (userbaseTable[0].User_Status == 'inactive') {
            setLoginErrorText('Your Account Has Been Banned');
        } else {

            sessionStorage.setItem('Username', userbaseTable[0].Username);
            sessionStorage.setItem('UserType', userbaseTable[0].User_Type);

            // Checking if user is already loged in
            let res= await fetch("http://localhost/healthgram/test.php",{
                method:"POST",
                header:{"Content-Type": "application/json"},
                body:JSON.stringify({"query":`SELECT * FROM tbl_login WHERE Username LIKE '${userbaseTable[0].Username}' AND Logout_Time IS NULL; ;`})
            });
            let loginTable = await res.json();

            if (loginTable.length == 0) {
                // Creating entry in Login table
                let res= await fetch("http://localhost/healthgram/test.php",{
                    method:"POST",
                    header:{"Content-Type": "application/json"},
                    body:JSON.stringify({"query":`INSERT INTO tbl_login (Username, Login_Time, Logout_Time) VALUES ('${userbaseTable[0].Username}', current_timestamp(), NULL) ;`})
                });
            }

            if (userbaseTable[0].User_Type == 'admin') {
                history.push('./admin');
            } else if (userbaseTable[0].User_Type == 'doctor') {
                history.push('./doctor');
            } else if (userbaseTable[0].User_Type == 'patient') {
                history.push('./patient');
            }
            setLoginErrorText('');
            console.log('loged in successfully');
        }        
    };
    
    const fieldStyles = {
        marginTop: '20px'
    }

    return <>
        <FormContainer style={{ height: '190px', marginTop: '20px'}}>
            <Form onSubmit={handleSubmit(OnSubmit)}>
                <TextField
                    name="email"
                    label="E-mail*"
                    variant="outlined"
                    fullWidth="true"
                    size="small"
                    {...register("email", { 
                        required: "Please Enter E-mail ID"
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
                        required: "Please Enter Your Password"
                    })}
                />
                <ShowPaswd>
                    <Checkbox
                        color="primary"
                        size="small"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        onClick={() => setShowpswd(!showpswd)}
                    />
                    <p>Show Password</p>
                </ShowPaswd>                    
                {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

                
            </Form>
        </FormContainer>
        <Button type="submit" onClick={() =>handleSubmit(OnSubmit)()}disable={isValid}>Log in</Button>
        <ErrorText>{loginErrorText}</ErrorText>
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
        {/* <button type="button" onClick={() =>console.log(data.email)}>gfhg</button> */}
    </>;
}




