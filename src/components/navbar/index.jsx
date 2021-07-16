import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Logo } from '../logo'

const Wrapper = styled.div`
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    background-color: #fff;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 3px rgba(15, 15, 15, 0.13);
`;

const LeftSection = styled.div`
    height: 100%;
    display: flex;
    flex: 1;
    /* background-color: yellow; */
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
        text-decoration: none;
    /* background-color: orange; */

    h2 {
        margin: 0;
        color: #006DB6;
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
        color: #3a3939;
        font-weight: 500;
        font-family: 'Karla', sans-serif;
        /* background-color: lightreen; */
    }
`;

export function Navbar(props) {

    useEffect(()=>{
    //  fetch("http://localhost/healthgram/test.php",{
    //      method: "GET",
    //      headers:{
    //          'Accept': 'application/json'
    //      }
    //  })
    //  .then(data=>data.json())
    //  .then(jsondata=>console.log(jsondata));
        fetch("http://localhost/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":"SELECT * FROM test_table;"})
        }).then(data=>data.json())
        .then(jsondata=>console.log(jsondata));
    },[])
    return <Wrapper>
        <LeftSection><Logo></Logo></LeftSection>
        <MiddleSection></MiddleSection>
        <RightSection>
            <Accessibility>
                <AccessibilityItem to="/registerPatient"><h2>Register</h2><h3>as Patient</h3></AccessibilityItem>
                <AccessibilityItem to="/registerDoctor" ><h2>Register</h2><h3>as Doctor</h3></AccessibilityItem>
                <AccessibilityItem to="/login"><h2>Log In</h2></AccessibilityItem>
            </Accessibility>
        </RightSection>
    </Wrapper>
}