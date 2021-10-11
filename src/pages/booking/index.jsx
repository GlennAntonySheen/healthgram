import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import AddCard from './addNewCard';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import FormControl from "@material-ui/core/FormControl";
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Slider from '@mui/material/Slider';
import LinearProgress from '@mui/material/LinearProgress';
import Radio from '@mui/material/Radio';
import IconButton from '@mui/material/IconButton';
import RadioGroup from '@mui/material/RadioGroup';
import Tooltip from '@mui/material/Tooltip';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import PaymentIcon from '@mui/icons-material/Payment';
import CircularProgress from '@mui/material/CircularProgress';
import FormLabel from '@mui/material/FormLabel';
import { styled as alias} from '@mui/material/styles';
import Lottie from 'react-lottie';
import BookedAnimation from '../../assets/lottie animations/book-an-appointment.json'
import CurrentlyUnavailable from '../../assets/lottie animations/no-connection.json'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import DefaultDoctorProfilePicture from '../../assets/images/defaultDoctorProfilePicture.jpg'
import CardImg from '../../assets/images/card-payment.jpg'
import animationData from '../../assets/lottie animations/49259-scroll-s.json';
import DoctorVirtualCall from '../../assets/lottie animations/doctor-virtual-call.json';
import PaymentSuccessful from '../../assets/lottie animations/card-payment.json';
import BackgroungImg from '../../assets/images/booking backgroung.jpg'
import SearchIcon from '../../assets/icons/searchdoctor.svg'
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

    Stepper {
        margin-top: 100px;
        background-color: red;
    }
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

const BookingConfirmation = styled.div`
    height: 400px;
    width: 600px;
    display: flex;
    flex-direction: column;
    /* background-color: pink; */
`;

const PaymentWrapper = styled.div`
    height: 500px;
    /* width: 100%; */
    padding: 70px 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* background-color: green; */
`;

const PayBackgroungImage = styled.img`
    /* height: fit-content ;
    width: fit-content; */
    /* flex: 1; */
    background-color: #f3f3c3;
    /* img { */
        height: 70%;
        width: 35%;
    /* } */
`;

const PamentDetails = styled.div`
    width: 560px;
    display: flex;
    /* flex: 1; */
    padding: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    box-shadow: 0 9px 24px rgb(0 0 0 / 12%), 0 9px 24px rgb(0 0 0 / 12%);
    background-color: white;
`;

const PaymentHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: red; */

    span {
        margin: 10px 30px;
        /* font-size: .9rem; */
    }
`;

const UserSummary = styled.div`
    /* width: 100%; */
    margin: 8px 15px;
    padding: 10px 30px 20px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border: 2px solid #1976d2;
    border-radius: 1rem;
    /* background-color: pink; */

    span {
        width: 100%;
        margin: 5px 2px -5px;
        /* display: inline-block; */
        /* background-color: blue; */
    }
`;

const PaymentFooter = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    /* background-color: blue; */
`;

const PaymentCardContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0;
    /* background-color: violet; */
`;


const PaymentConfirmationButton = styled.button`
    /* height: 40px; */
    width: fit-content;
    /* margin-bottom: 10px; */
    padding: 8px 10%;
    color: #fff;
    font-size: 22px;
    font-weight: 500;
    border: none;
    border-radius: 100px 100px 100px 100px;
    cursor:  ${ props => props.currentCard == null  ? 'not-allowed' : 'pointer' };
    transition: all, 240ms ease-in-out;
    background: rgb(0,109,182);
    background: linear-gradient(
        90deg, 
        rgba(0,109,182,1) 0%, 
        rgba(9,57,121,1) 100%);

    &:hover {
        filter: brightness(1.03);
    }
`;

const PaymentCompleted = styled.div`
    height: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background: lightblue; */
`;

export function Booking(props) {
    document.title = "Booking"

    const history = useHistory();
    const [activeStep, setActiveStep] = useState(0)
    const [priceRange, setPriceRange] = useState([0, 9999])
    const [doctors, setDoctors] = useState([])
    const [bookingDetails, setBookingDetails] = useState(null)
    const [bookingStatus, setBookingStatus] = useState('')
    const [openDialogue, setOpenDialogue] = useState(false)
    const [progress, setProgress] = useState(100)
    const [paymentDetails, setPaymentDetails] = useState([])
    const [addCardDialog, setAddCardDialog] = useState(false)
    const [currentCard, setCurrentCard] = useState(null)

    const { 
        watch, 
        register, 
        handleSubmit,
        control,
        getValues,
        setValue,
        formState: { errors, isValid }
    } = useForm({ mode: "all", reValidateMode: "all" });   
 
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
      
    React.useEffect(() => {
        let active = true;

        if (!loading) {
        return undefined;
        }

        (async () => {
            let response= await fetch("http://localhost/healthgram/test.php",{
                method:"POST",
                header:{"Content-Type": "application/json"},
                body:JSON.stringify({"query":`SELECT * FROM tbl_card WHERE Pat_Id=${paymentDetails[0].Pat_Id};`})
            });
            let table = await response.json();
            if (table.length == 0) {
                setOptions([{ Card_No: 'You Havn\'t Saved Any Cards Yet.' }]);
            } else {
                setOptions(table);
            }
        })();

        return () => {
        active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
        setOptions([]);
        }
    }, [open]);

    const QontoConnector = alias(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 10,
            left: 'calc(-50% + 16px)',
            right: 'calc(50% + 16px)',
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#1976d2',
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#1976d2',
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
            borderTopWidth: 3,
            borderRadius: 1,
        },
    }));

    const searchForDoctor = async (data) => {
        let response= await fetch("http://localhost/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`SELECT tbl_userbase.Username, Doc_Id, Doc_Pic, Doc_Description, Doc_Fee, Doc_Gender, Doc_Name, Doc_No_Of_Tokens, Doc_Dob, Sp_Name FROM tbl_login JOIN tbl_userbase ON tbl_login.Username=tbl_userbase.Username JOIN tbl_doctor ON tbl_login.Username=tbl_doctor.Username JOIN tbl_doctor_category ON tbl_doctor.Sp_Id=tbl_doctor_category.Sp_Id WHERE User_Type='doctor' AND logout_time is NULL AND (tbl_doctor.Doc_Name LIKE '%${data.searchQuery}%' OR tbl_doctor_category.Sp_Name = '${data.searchQuery}') AND tbl_doctor.Doc_Gender LIKE '${data.gender}' AND Doc_No_Of_Tokens>0 AND tbl_doctor.Doc_Fee BETWEEN ${priceRange[0]} AND ${priceRange[1]};`})
        });
        let table = await response.json();
        // console.log(table);
        setDoctors(table)
    }

    useEffect(() => {
        if (activeStep == 1) {
            const timer = setInterval(async () => {            
                let response= await fetch("http://localhost/healthgram/test.php",{
                    method:"POST",
                    header:{"Content-Type": "application/json"},
                    body:JSON.stringify({"query":`SELECT * FROM tbl_booking WHERE tbl_booking.Booking_Id = ${bookingDetails[0].Booking_Id };`})
                });
                let table = await response.json();

                if (progress > 0 && table[0].Booking_Status == 'not confirmed') {         
                    setProgress((prevProgress) => prevProgress - 5);                    
                } else if (table[0].Booking_Status == 'confirmed') { 
                    clearInterval(timer);
                    setBookingStatus('confirmed'); 
                    getPaymentDetails()
                    setTimeout(() => {
                        setOpenDialogue(false)            
                        setActiveStep(2)
                    }, 3000);        
                } else if (table[0].Booking_Status == 'rejected') { 
                    clearInterval(timer);
                    setBookingStatus('rejected');
                }else {
                    clearInterval(timer);
                    setBookingStatus('rejected');
                    cancelBooking()
                }
            
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        } 
    }, [activeStep, progress, bookingDetails]);

    const BookDoctor = async (doctor) => {
        setBookingStatus('not confirmed')
        setOpenDialogue(true)
        setProgress(100)

        let response= await fetch("http://localhost/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`INSERT INTO tbl_prescription (Pres_Id, Doc_Id, Pres_Date, Prescription) VALUES (NULL, '${doctor.Doc_Id}', NULL, NULL);                 
                INSERT INTO tbl_booking (Booking_Id, Pat_Id, Doc_Id, Pres_Id, Booking_Amount, Booking_Date, Booking_Status) VALUES (NULL, (SELECT Pat_Id FROM tbl_patient WHERE Username LIKE '${sessionStorage.getItem('Username')}'), '${doctor.Doc_Id}', (SELECT MAX(Pres_Id) FROM tbl_prescription), '${doctor.Doc_Fee}', current_timestamp(), 'not confirmed');`})
        });
        let bookingid= await fetch("http://localhost/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":` SELECT * FROM tbl_booking WHERE Booking_Id=(SELECT MAX(Booking_Id) FROM tbl_booking);`})
        });

        setActiveStep(1)
        let table = await bookingid.json();
        setBookingDetails(table);
        console.log('bookingDetails is ', bookingDetails)
    }

    const cancelBooking = async () => {
        setActiveStep(0)    

        let response= await fetch("http://localhost/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`UPDATE tbl_booking SET Booking_Status = 'cancelled' WHERE tbl_booking.Booking_Id = ${bookingDetails[0].Booking_Id };`})
        });
        let table = await response.json();
        setBookingDetails(null)
                            
        console.log('booking canceled')  
    }
    
    const getPaymentDetails = async () => {
        let response= await fetch("http://localhost/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`SELECT Booking_Id, tbl_booking.Pat_Id, tbl_booking.Doc_Id, Pres_Id, Booking_Amount, Booking_Date, Booking_Status, tbl_patient.Username AS Pat_Username, Pat_Name, Pat_Phone_No, Pat_Gender, Sp_Name, tbl_doctor.Username AS Doc_Username, Doc_Name, Doc_Phone_No, Doc_Gender, Doc_Fee FROM tbl_booking JOIN tbl_patient ON tbl_patient.Pat_Id = tbl_booking.Pat_Id JOIN tbl_doctor ON tbl_doctor.Doc_Id=tbl_booking.Doc_Id JOIN tbl_doctor_category on tbl_doctor_category.Sp_Id=tbl_doctor.Sp_Id WHERE tbl_booking.Booking_Id=${bookingDetails[0].Booking_Id}`})
        });
        let table = await response.json();
        setPaymentDetails(table)
        console.log('Got payment details')
        console.log(paymentDetails)
    }
    
    const makePayment = async () => {
        let response= await fetch("http://localhost/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`INSERT INTO tbl_payment(Pay_Id, Card_Id, Pay_Amount, Pay_Status, Booking_Id) VALUES (NULL, (SELECT Card_Id FROM tbl_card WHERE Card_No='${currentCard}'), ${paymentDetails[0].Booking_Amount},'paid', ${paymentDetails[0].Booking_Id})`})
        });
        let table = await response.json();
        setActiveStep(3)
        setTimeout(() => {
            history.push('./patient')
        }, 3000);  
    }

    function currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    function calcAmount(amount) {
        amount = parseInt(amount)
        return Math.round(amount + ((amount/100)*3))
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
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />} style={{padding: '60px 270px', scale: '1.1'}}>
                <Step>
                    <StepLabel>Find Doctor</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Doctor Confirmation</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Payment</StepLabel>
                </Step>
            </Stepper>
            { (activeStep == 0 || activeStep ==1) && <>
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
                                                handleSubmit(searchForDoctor)()
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
                                    
                                    handleSubmit(searchForDoctor)() 
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
                        <button onClick={ () => handleSubmit(searchForDoctor)()}><img src={SearchIcon}></img></button>
                    </Searchbar>
                </SearchContainer>
                <SearchResults>
                    { doctors.map((doctor, index) =>                         
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
                                    <Button 
                                        variant="contained" 
                                        startIcon={<FavoriteBorderIcon />} 
                                        onClick={ () => BookDoctor(doctor)}
                                    >Book Now</Button>
                                </DoctorBook>
                            </CardTextContainer> 
                        </Card>
                    )}
                </SearchResults>
            </> }
            <Dialog open={openDialogue}>
                <BookingConfirmation>
                    {bookingStatus == 'not confirmed' && <>
                        <Lottie 
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: DoctorVirtualCall,
                                rendererSettings: {
                                    preserveAspectRatio: "xMidYMid slice"
                                }
                            }}
                            height={300}
                            width={600}
                            />
                            <LinearProgress variant="buffer" value={progress} valueBuffer={progress} sx={{ my: 2 }} />
                            <DialogTitle>Please wait till the doctor confirms the booking</DialogTitle>
                        <Button 
                            variant="contained" 
                            sx={{ mx: 28, my: 2 }} 
                            onClick={ async () => { 
                                cancelBooking()      
                                setOpenDialogue(false)                                          
                            }}
                        >Cancel</Button>
                    </>}
                    {bookingStatus == 'confirmed' && <>
                        <Lottie 
                            options={{
                                loop: false,
                                autoplay: true,
                                animationData: BookedAnimation,
                                rendererSettings: {
                                    preserveAspectRatio: "xMidYMid slice"
                                }
                            }}
                            height={700}
                            width={450}
                            /> 
                    </>}
                    {bookingStatus == 'rejected' && <>
                        <Lottie 
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: CurrentlyUnavailable,
                                rendererSettings: {
                                    preserveAspectRatio: "xMidYMid slice"
                                }
                            }}
                            height={300}
                            width={400}
                        /> 
                        <DialogTitle>The Doctor is Currently Unavailable, Please Try Another Doctor</DialogTitle>
                        <Button 
                            variant="contained" 
                            sx={{ mx: 28, my: 2 }} 
                            onClick={ () => {  
                                setOpenDialogue(false)            
                                setActiveStep(0)                                          
                            }}
                        >Okay</Button>
                    </>}
                </BookingConfirmation>
            </Dialog>
            { activeStep == 2 && <>
                <PaymentWrapper>                   
                    <PayBackgroungImage src={CardImg} ></PayBackgroungImage>
                    {/* <button onClick={ () => calcAmount(paymentDetails[0].Booking_Amount)}>dfb</button> */}
                    <PamentDetails>
                        <PaymentHeader>
                            <span>Booking ID: {paymentDetails[0].Booking_Id}</span>
                            <span>Timestamp: {paymentDetails[0].Booking_Date}</span>
                        </PaymentHeader>
                        <UserSummary>
                            <span>Doctor Details</span>
                            <TextField
                                label="Name"
                                value={paymentDetails[0].Doc_Name}
                                focused
                                size="small"
                                margin='normal'
                                InputProps={{ readOnly: true, }}
                                variant="outlined"
                                sx={{m: '100px'}}
                            />
                            <TextField
                                label="Email ID"
                                value={paymentDetails[0].Doc_Username}
                                focused
                                size="small"
                                margin='normal'
                                InputProps={{ readOnly: true, }}
                                sx={{mb: 10}}
                            />
                            <TextField
                                label="Gender"
                                value={paymentDetails[0].Doc_Gender.toUpperCase()}
                                focused
                                size="small"
                                margin='normal'
                                InputProps={{ readOnly: true, }}
                                sx={{mb: 10}}
                            />
                            <TextField
                                label="Specializaation"
                                value={paymentDetails[0].Sp_Name.toUpperCase()}
                                focused
                                size="small"
                                margin='normal'
                                InputProps={{ readOnly: true, }}
                                sx={{mb: 10}}
                            />
                        </UserSummary>                        
                        <UserSummary>
                            <span>Your Details</span>
                            <TextField
                                label="Name"
                                value={paymentDetails[0].Pat_Name}
                                focused
                                size="small"
                                margin='normal'
                                InputProps={{ readOnly: true, }}
                            />
                            <TextField
                                label="Email ID"
                                value={paymentDetails[0].Pat_Username}
                                focused
                                size="small"
                                margin='normal'
                                InputProps={{ readOnly: true, }}
                            />

                            <PaymentCardContainer>                            
                                <Autocomplete
                                    size="small"
                                    margin='normal'
                                    fullWidth={true}
                                    open={open}
                                    onOpen={() => {
                                        setOpen(true);
                                    }}
                                    onClose={() => {
                                        setOpen(false);
                                    }}
                                    onInputChange={(e, value, reason) => {
                                        setCurrentCard(value);
                                    }}
                                    getOptionLabel={(option) => option.Card_No}
                                    options={options}
                                    loading={loading}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        label="Select Card *"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                            <React.Fragment>
                                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                            ),
                                        }}
                                        />
                                    )}
                                />
                                <Tooltip title="Add New Card">
                                    <IconButton color="primary" onClick={() => setAddCardDialog(true)}size="large">
                                        <PaymentIcon />
                                    </IconButton>
                                </Tooltip>
                            </PaymentCardContainer>



                        </UserSummary>
                        <UserSummary>
                            <span>Booking Amount:  ₹{calcAmount(paymentDetails[0].Booking_Amount)}</span>
                        </UserSummary>
                        <PaymentFooter>
                            <PaymentConfirmationButton 
                                disabled={currentCard == null}
                                currentCard={currentCard}
                                onClick={() => makePayment()}
                            >Confirm Payment</PaymentConfirmationButton>
                            <PaymentConfirmationButton 
                                currentCard={true}
                                onClick={async () => cancelBooking()}
                            >Cancel</PaymentConfirmationButton>
                        </PaymentFooter>
                    </PamentDetails>
                    <AddCard addCardDialog={addCardDialog} setAddCardDialog={setAddCardDialog} patId={paymentDetails[0].Pat_Id} PayId={paymentDetails[0].Pay_Id}/>
                    
                </PaymentWrapper>
            </> }
            { activeStep == 3 && <>
                <PaymentCompleted>                
                    <Lottie 
                        options={{
                            loop: false,
                            autoplay: true,
                            animationData: PaymentSuccessful,
                            rendererSettings: {
                                preserveAspectRatio: "xMidYMid slice"
                            }
                        }}
                        height={560}
                        width={570}
                    />
                </PaymentCompleted>
            </>}
            {/* {JSON.stringify(watch(), null, 20)} */}
            {/* <pre style={{maxWidth: "900px"}}>{JSON.stringify(doctors, null, 2)}</pre> */}
            {/* <button onClick={() => getPaymentDetails()}>fjjt</button> */}
        </BookingSection> 
    
    </BookingPageContainer>
}