import React, { useState } from 'react';
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
    const [showpswd, setShowpswd] = useState(true);

    const onSubmit = data => alert(JSON.stringify(data));
    
    const fieldStyles = {
        marginTop: '20px'
    }

    return <>
        <FormContainer style={{ height: '190px', marginTop: '20px'}}>
            <Form onSubmit={handleSubmit(onSubmit)} action="connect.php" method="post">
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
                        required: "Please Enter A Password"
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
        <Button type="submit" value="Submit" disable={true}>Log in</Button>
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
    </>;
}




