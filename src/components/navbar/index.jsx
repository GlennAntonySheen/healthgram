import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import LogoImg from '../../assets/logo/Technology to Customize Your Design _ GraphicSprings - Brave 20-Jun-21 11_44_14 AM.png';

const Wrapper = styled.div`
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    position: fixed;
    padding: 4px;
    background-color: ${ props => props.opaque || props.scroll ? 'white' : 'transparent' };
    top: 0;
    z-index: 100;
    box-shadow:  ${ props => props.opaque || props.scroll ? '0 1px 3px rgba(15, 15, 15, 0.13)' : 'none' };
    transition: .08s ease-in-out;
`;

const LeftSection = styled.div`
    height: 100%;
    width: auto;
    display: flex;
    flex: 1;
    /* background-color: yellow; */
`;

const LogoWrapper = styled.div`
    height: 100%;
    width: auto;
    display: flex;
    align-items: center;
    margin-left: 40px;
    /* background-color: red; */

    img {
        height: 100%;
        flex-grow: 1;
        border-radius: 1rem;
    }

    h1 {
        height: auto;
        margin-left: 5px;
        font-size: 40px;
        color: ${ props => props.opaque || props.scroll ? '#006DB6' : 'white' } ;
    }
`;

const MiddleSection = styled.div`
    height: 100%;
    display: flex;
    flex: 1;
    /* background-color: green; */
`;

const RightSection = styled.div`
    height: 100%;
    display: flex;
    flex: 1;
    justify-content: flex-end;
    padding-right: 3rem;
    /* background-color: blue; */
`;

const Accessibility = styled.div`
    height: 100%;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 2rem;
    /* background-color: red; */
`;

const AccessibilityItem = styled(Link)`
    height: 50px;
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: .9rem;
    padding: .4rem;
    color: #006DB6;
    text-decoration: none;
    /* background-color: orange; */

    h2 {
        margin: 0;
        color: ${ props => props.opaque || props.scroll ? '#006DB6' : 'white' } ;
        transition: .3s;
        text-decoration: none;
        /* background-color: lightblue; */

        &:hover {
            cursor: pointer;
            letter-spacing: .9px;
        }
    }

    h3 {
        margin: 0;
        padding: 0;
        font-size: 1.1rem;
        color: ${ props => props.opaque || props.scroll ? '#006DB6' : 'white' } ;
        font-weight: 500;
        font-family: 'Karla', sans-serif;
        /* background-color: lightreen; */
    }
`;

export function Navbar(props) {
    const [scroll, setScroll] = useState(false);
    
    window.addEventListener('scroll', () => {setScroll(window.scrollY > 10)})

return <Wrapper scroll={scroll} opaque={props.opaque}>
        <LeftSection >
            <LogoWrapper scroll={scroll} opaque={props.opaque}>
                <img src={LogoImg} alt=""/>
                <h1>HealthGram</h1>
            </LogoWrapper>
        </LeftSection>
        <MiddleSection></MiddleSection>
        <RightSection>
            <Accessibility>
                <AccessibilityItem to="/registerPatient" scroll={scroll} opaque={props.opaque}><h2>Register</h2><h3>as Patient</h3></AccessibilityItem>
                <AccessibilityItem to="/registerDoctor" scroll={scroll} opaque={props.opaque}><h2>Register</h2><h3>as Doctor</h3></AccessibilityItem>
                <AccessibilityItem to="/login" scroll={scroll} opaque={props.opaque}><h2>Log In</h2></AccessibilityItem>
            </Accessibility>
        </RightSection>
    </Wrapper>
}