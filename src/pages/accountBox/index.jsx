import React, { useState } from "react";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { motion } from "framer-motion";
import { AccountContext } from "./accountContext";
import { DoctorRegistrationForm } from "./doctorRegistrationForm";
import { PatientRegistrationForm } from "./patientRegistrationForm";
import { LoginInForm } from "./loginForm";
import { BoldLink, FormContainer, Input, MutedLink, Button, Form, PageNav } from "./common";
import Img from '../../assets/images/login page image.svg';

const PageWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const BackgroundImage = styled.div`
	height: 100vh;
	width: 300px;
	margin-right: 100px;
	/* background-color: yellow; */

	img {
		height: 100%;
		width: 100%;
	}
`;

const BoxContainer = styled.div`
	height: auto;
	min-width: 380px;
	max-width: 380px;
	padding-bottom: 10px;
	display: flex;
	flex-direction: column;
	border-radius: 19px;
	/* background-color: #fff; */
	box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
	position: relative;
	overflow: hidden;
	/* background-color: pink; */
	transition: .5s all ease-in-out;
`;

const TopContainer = styled.div`
	height: 220px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0px;
	/* padding-bottom: 5em; */
	/* background-color: green; */
`;

const BackDrop = styled(motion.div)`
	width: 260%;
	height: 550px;
	position: absolute;
	display: flex;
	flex-direction: column;
	border-radius: 50%;
	transform: rotate(60deg);
	top: -430px;
	left: -130px;
	z-index: 10;
    background: rgb(0,109,182);
    background: linear-gradient(
        90deg, 
        rgba(0,109,182,1) 0%, 
        rgba(9,57,121,1) 100%);
`;

const HeaderContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 0px 35px 50px;
`;

const HeaderText = styled.h2`
	font-size: 40px;
	font-weight: 600;
	line-height: 1.24;
	color: #fff;
	z-index: 10;
	margin: 0;
`;

const SmallText = styled.h5`
	color: #fff;
	font-weight: 500;
	font-size: 11px;
	z-index: 10;
	margin: 0;
	margin-top: 7px;
`;

const InnerContainer = styled.div`
	/* width: 100%; */
	display: flex;
	flex-direction: column;
	padding: 0 1.8em;
	/* background-color: violet; */
`;

const backdropVariants = {
    expanded: {
        width: "313%",
        height: "1350px",
        borderRadius: "20%",
        transform: "rotate(60deg)",
    },
    collapsed: {
        width: "160%",
        height: "650px",
        borderRadius: "50%",
        transform: "rotate(60deg)",
    },
};

const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
};

export function AccountBox(props) {
    document.title = "Login / Register"
    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState(props.type);

    const playExpandingAnimation = () => {
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, expandingTransition.duration * 1000 - 1500);
    };

    const switchToPatientRegistration = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("registerPatient");
        }, 400);
    };

    const switchToDoctorRegistration = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("registerDoctor");
        }, 400);
    };

    const switchToLogin = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("login");
        }, 400);
    };

    const contextValue = { switchToDoctorRegistration, switchToLogin };

    return (
        <AccountContext.Provider value={contextValue}>
			<PageWrapper>
				<BackgroundImage><img src={Img} /></BackgroundImage>
				<BoxContainer>
					<TopContainer>
						<BackDrop initial={false} animate={isExpanded ? "expanded" : "collapsed"} variants={backdropVariants} transition={expandingTransition} />
						{active === "registerDoctor" && (
							<HeaderContainer>
								<HeaderText>Welcome</HeaderText>
								<HeaderText style={{ fontSize: '45px'}}>DOCTOR</HeaderText>
								<SmallText>Please Fill Your Credentials To Continue !</SmallText>
							</HeaderContainer>
						)}
						{active === "registerPatient" && (
							<HeaderContainer>
								<HeaderText style={{ fontSize: '45px'}}>Hi There</HeaderText>
								<HeaderText></HeaderText>
								<SmallText>Please Fill Your Credentials To Continue !</SmallText>
							</HeaderContainer>
						)}
						{active === "login" && (
							<HeaderContainer>
								<HeaderText>Login</HeaderText>
							</HeaderContainer>
						)}
					</TopContainer>
					<InnerContainer>
						{active === "registerDoctor" && (<>
							<DoctorRegistrationForm />							
							<MutedLink>Not a Doctor? <BoldLink onClick={switchToPatientRegistration}>Register as Patient</BoldLink></MutedLink>				
							<MutedLink>Already Have An Account? <BoldLink onClick={switchToLogin}>Log In</BoldLink></MutedLink>
						</>)}
						{active === "registerPatient" && (<>
							<PatientRegistrationForm />							
							<MutedLink>Not a Patient? <BoldLink onClick={switchToDoctorRegistration}>Register as Doctor</BoldLink></MutedLink>				
							<MutedLink>Already Have An Account? <BoldLink onClick={switchToLogin}>Log In</BoldLink></MutedLink>
						</>)}
						{active === "login" && (<>
							<LoginInForm />
							<MutedLink>Don't have an Account? Register as<BoldLink onClick={switchToDoctorRegistration}> Doctor</BoldLink>or<BoldLink onClick={switchToPatientRegistration}> Patient</BoldLink></MutedLink>
						</>)}
						{/* {active === "signup" && <SignupForm />} */}
					</InnerContainer>
				</BoxContainer>
			</PageWrapper>
        </AccountContext.Provider>
    );
}
