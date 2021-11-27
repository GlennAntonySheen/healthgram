import React, { useState, useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import CreditCard from '../../assets/lottie animations/credit-card.json'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import Lottie from 'react-lottie';

const NewCardWrapper = styled.div`
    /* height: 900px; */
    width: 400px;
    display: flex;
    padding-bottom: 10px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
`;

const Header = styled.h2`
    font-size: 25px;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
    text-align: center;
    margin: 1px 0px;
    /* background-color: lightcoral; */
`;

const NewCardDetails = styled.div`

    width: 88%;
    margin-top: -180px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    /* background-color: yellow; */
`;

const CardType = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Footer = styled.div`
    width: 100%;
    margin: 20px 0 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-evenly;
`;

export const ErrorText = styled.p`
    margin: 0;
    padding: 0;
    font-size: .8rem;
    text-align: right;
    color: red;
`;

export default function AddCard(props) {
    const [errorText, setExpsetErrorText] = useState('');

    const { 
        watch, 
        register, 
        handleSubmit,
        control,
        getValues,
        reset,
        formState: { errors, isValid }
    } = useForm({ mode: "all", reValidateMode: "all" });   


    const addNewCard = async (data, e) => {

        let response= await fetch("http://localhost:8080/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`SELECT * FROM tbl_card WHERE Card_No LIKE "${data.cardNumber}";`})
        });
        let table = await response.json();

        // Card already exist
        if (table.length !== 0) {
            console.log("card already exist")
            setExpsetErrorText('This Card Already Exists. Try Another One')
        } else {
            let response= await fetch("http://localhost:8080/healthgram/test.php",{
                method:"POST",
                header:{"Content-Type": "application/json"},
                body:JSON.stringify({"query":`INSERT INTO tbl_card(Card_Id, Pat_Id, Card_No, Card_Name, Card_Exp_Date, Card_Type) VALUES (NULL, ${props.patId}, '${data.cardNumber}', '${data.cardName}', '${data.expiryDate}', '${data.CardType}');`})
            });
            props.setAddCardDialog(false)
            reset({ })

        }

        // console.log('addNewCard')  
    }

    return <Dialog 
        open={props.addCardDialog} 
        PaperProps={{
            style: {
                // backgroundColor: 'transparent',
                overflow: 'visible',
                boxShadow: 'none',
                borderRadius: '1rem'
            },
        }}
    >
        <NewCardWrapper>
            <Lottie 
                options={{
                    loop: false,
                    autoplay: true,
                    animationData: CreditCard,
                    rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice"
                    }
                }}
                height={300}
                width={310}
                style={{transform: 'translateY(-160px)'}}
            /> 
            <NewCardDetails>
                <Header>Add New Card</Header>                                
                <TextField
                    name="cardNumber"
                    label="Card Number *"
                    size="small"
                    fullWidth 
                    margin='normal'
                    error={errors.cardNumber}
                    helperText={!!errors.cardNumber ? errors.cardNumber.message : ''}
                    {...register("cardNumber", { 
                        required: "Please Fill your Card Number",
                        pattern: { 
                            value: /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/i, 
                            message: "Enter a Valid Card Number(0000 0000 0000 0000)"
                        }})
                    }
                />
                <TextField
                    name="cardName"
                    label="Name On Card *"
                    size="small"
                    fullWidth 
                    margin='normal'
                    error={errors.cardName}
                    helperText={!!errors.cardName ? errors.cardName.message : ''}
                    {...register("cardName", { 
                        required: "Please Fill Name On Card",
                    })}
                />
                <TextField
                    name="expiryDate"
                    label="Expiry Date *"
                    size="small"
                    fullWidth 
                    margin='normal'
                    error={errors.expiryDate}
                    helperText={!!errors.expiryDate ? errors.expiryDate.message : ''}
                    {...register("expiryDate", { 
                        required: "Please Fill Expiry Date",       
                        pattern: { 
                            value: /^[0-1][0-9]\/[0-9]{2}$/i, 
                            message: "Enter Valid Expiry Date(MM/YY)"
                        },                 
                        validate: value => (
                                ((value.substring(0, 2) > (new Date().getMonth() + 1)) && (value.substring(3, 5) == (new Date().getFullYear()).toString().substring(2, 4))) ||
                                (value.substring(3, 5) > (new Date().getFullYear()).toString().substring(2, 4)) 
                        ) || "The Card Has Already Expired",                
                    })}
                />
                <CardType>
                    <FormLabel component="legend">Card Type *</FormLabel>
                    <FormControl component="fieldset">
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            name="CardType"
                            render={({ field }) => {
                            const { name, onBlur, onChange, value } = field;
                            return (
                                <RadioGroup
                                    row 
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                        
                                    }
                                }>
                                    <FormControlLabel value="credit" control={<Radio />} label="Credit Card"/>
                                    <FormControlLabel value="debit" control={<Radio />} label="Debit Card"/>
                                </RadioGroup>
                            );}}
                        />
                    </FormControl>
                </CardType>
                

            </NewCardDetails>
            {/* <pre>{JSON.stringify(watch(), null, 2)}</pre>  */}
            <Footer>
                <Button 
                    variant="contained"
                    startIcon={<DoneIcon />}
                    disabled={!isValid}
                    onClick={() => handleSubmit(addNewCard)()}
                >Add</Button>
                <Button 
                    variant="outlined" 
                    startIcon={<ClearIcon />}
                    onClick={() => {
                        props.setAddCardDialog(false)
                        reset()
                    }}
                >Cancel</Button>
            </Footer>
            <ErrorText>{errorText}</ErrorText>
        </NewCardWrapper>
    </Dialog>
}