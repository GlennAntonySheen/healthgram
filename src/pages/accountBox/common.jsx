import styled from "styled-components";

export const FormContainer = styled.div`
    height: 300px;
    width: 100%;
    display: flex;
    flex-direction: column;
    
    /* background-color: red; */
`;

export const Form = styled.form`
    width: 100%;
    position: relative;
    transition: 0.5s all;
    /* display: flex; */
    /* background-color: yellow;   */

    #Page2, #Page3, #Page4, #Page5 {
        left: 450px;
    }
`;

export const FormPage = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    transition: 0.3s all;  
    /* background-color: rgba(0, 250, 0, 0.164); */

    h3 {
        margin: 13px 0 10px 0;
        font-family: sans-serif;
        font-weight: 500;
    }

    h5 {
        margin: 13px 0 1px 0;
        padding: 0;
        font-weight: 600;
    }
`;

export const ShowPaswd = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    
    p {
        margin: 0;
        padding: 0;
        color: #9e9e9e;
    }                   
`;

export const ErrorText = styled.p`
    margin: 0;
    padding: 0;
    font-size: .8rem;
    text-align: right;
    color: red;
`;

export const InputDiv = styled.div`
    /* height: auto; */
    /* width: 100%; */
    /* position: relative; */
    /* margin: 10px 0; */
    /* background-color: green; */

    

    input {
        width: 100%;
        height: 42px;
        margin: 5px 0;
        padding: 0 5px;
        /* border: 1px solid var(#DADCE0); */
        background-color: #fff;
        border-radius: .5rem;
        outline: none;
    }

    span {
        height: auto;
        margin: 0;
        padding: 0 3px;
        position: absolute;
        top: ${ props => props.textValue ? '-6px' : '11px' };
        left: ${ props => props.textValue ? '14px' : '19px' };
        transition: 0.3s;
        font-size: ${ props => props.textValue ? '.9rem': '1.2rem'};
        background-color: ${ props => props.textValue ? '#fff' : 'transparent'};
        /* background-color:#fff; */
        pointer-events: none;
    }

    input:focus + span {
        top: -6px;
        left: 14px;
        font-size: .9rem;
        background-color:#fff;
    }
`;

export const FileUpload = styled.input`
/* border: 0; */
  /* clip: rect(0, 0, 0, 0); */
  /* height: 1px; */
  /* overflow: hidden; */
  /* padding: 0; */
  /* position: absolute !important; */
  /* white-space: nowrap; */
  /* width: 1px; */
    background-color: yellow;
`;

export const PageNav = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    align-items: center;
    /* background-color: orange; */

    img {
        height: 30px;
        width: 30px;
        top: -20;
        left: 10;
        display: none;
        position: absolute;
        z-index: 1;
        transition: .2s all ease-in-out;
        /* background-color: green; */

        &:hover {
            height: 33px;
            width: 33px;
            cursor: pointer;
        }

        &:active {
            height: 31px;
            width: 31px;
            transition: .03s all ease-in-out;
        }
    }

    p {
        width: 70%;
        margin: 0;
        text-align: center;
        /* background-color: lightsteelblue; */
    }
`;

export const MutedLink = styled.a`
    font-size: .8rem;
    color: rgb(87, 85, 85);
    font-weight: 500;
    text-decoration: none;
    /* background-color: red; */
`;

export const BoldLink = styled.a`
    font-size: .85rem;
    color: rgb(0,109,182);
    font-weight: 500;
    text-decoration: none;
    margin: 0 4px;
    /* background-color: red; */

    &:hover {
        cursor: pointer;
    }
`;


export const Button = styled.button`
    height: 40px;
    width: 100%;
    margin-bottom: 10px;
    padding: 11px 40%;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 100px 100px 100px 100px;
    cursor: pointer;
    transition: all, 240ms ease-in-out;
    background: rgb(0,109,182);
    background: linear-gradient(
        90deg, 
        rgba(0,109,182,1) 0%, 
        rgba(9,57,121,1) 100%);

    &:hover {
        filter: brightness(1.03);
        cursor: ${ props => props.disable ? 'pointer' : 'not-allowed' }
    }
`;
