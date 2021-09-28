import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

const Sidebar = styled.div`
    height: calc(100% - 20px);
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    margin: 10px;
    padding: 0;
    position: fixed;
    width: ${ props => props.isActive ? '210px' : '78px' };
    background: linear-gradient(45deg,rgba(0,109,182,1) 0%,  rgba(9,57,121,1) 100%);
    box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
    border-radius: 1rem;
    z-index: 99;
    transition: all 0.2s ease;
`;

const LogoContainer = styled.div`
    width: 100%;
    display:flex;
    flex-direction: row;
    align-items: flex-end;
    padding-top: 10px;
    /* background-color: green; */

    #btn{
        /* position: ${ props => props.isActive ? 'absolute' : 'absolute' }; */
        position: relative;
        color: #fff;
        /* left: ${ props => props.isActive ? '90%' : '5%' }; */
        font-size: 26px;
        height: 50px;
        width: 50px;
        cursor: pointer;
        text-align: center;
        line-height: 50px;
        transform: ${ props => props.isActive ? 'translateX(0%)' : 'translateX(-70%)' };
        /* transform: calc(translateX(-50%)) */
        /* background-color: yellow; */
    }
`;

const Logo = styled.div`
    color: #fff;
    display: flex;
    height: 50px;
    width: 100%;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    transition: all 0.5s ease;
    opacity: ${ props => props.isActive ? 1 : 0 };
    pointer-events: none;

    i {
        font-size: 28px;
        margin-right: 5px;
    }

    div {
        display: ${ props => props.isActive ? '' : 'none' };
        margin-left: 15px;
        font-size: 22px;
        font-weight: 400;
        /* transition: .5s; */
        /* background-color: yellow; */
    }
`;

const NavList = styled.ul`
    height: 100%;
    /* padding-top: 400px; */
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    /* background-color: blue; */
`;

const Nav = styled.li`
    position: relative;
    height: 50px;
    /* width: 100%; */
    margin: 0 5px;
    list-style: none;
    line-height: 50px;
    margin: 5px 14px;
    /* background-color: azure; */

    div {
        position: absolute;
        left: 125px;
        top: 0;
        transform: translate(-35% , -50%);
        border-radius: 6px;
        height: 35px;
        width: 150px;
        background: linear-gradient(90deg,#15519f 0%, rgba(0,109,182,1) 100%);
        line-height: 35px;
        text-align: center;
        color: white;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        transition: 0s;
        opacity: 0;
        pointer-events: none;
        display: block;
    }

    
    &:hover  div {
        transition: ${ props => props.isActive ? 'none' : 'all .5s ease' };
        
        opacity: ${ props => props.isActive ? 0 : 1 };
        top: ${ props => props.isActive ? '0' : '50%' };
        /* background-color: red; */
    }

    a {
        color: #fff;
        display: flex;
        align-items: center;
        text-decoration: none;
        border-radius: 12px;
        white-space: nowrap;
        transition: all 0.4s ease;

        &:hover {
            color: #11101d;
            background: #fff;
        }
    }

    i {
        font-size: 23px;
        font-weight: 400;
        height: 50px;
        min-width: 50px;
        border-radius: 12px;
        line-height: 50px;
        text-align: center;
    }

    span {
        font-size: 15px;
        font-weight: 400;
        transition: 0s;
        opacity: 1;
        pointer-events: auto;
        display: ${ props => props.isActive ? 'block' : 'none' };
    }
`;

const ProfileContent = styled.div`
    width: 100%;
    display: flex;
    /* position: absolute; */
    color: #fff;
    bottom: 0;
    left: 0;
    /* background-color: green; */
`;

const Profile = styled.div`
    width: 100%;
    position: relative;
    padding: 10px 6px;
    height: 60px;
    background: none;
    transition: all 0.4s ease;
    background: none;
    /* background-color: blue; */


    #log_out{
        /* position: ${ props => props.isActive ? 'static' : 'absolute' }; */
        position: absolute;
        bottom: 5px;
        left: ${ props => props.isActive ? '88%' : '50%' };
        /* left: 88%; */
        transform: translateX(-50%);
        min-width: 50px;
        line-height: 50px;
        font-size: 26px;
        border-radius: 12px;
        text-align: center;
        transition: all 0.4s ease;
        background: none;
        cursor: pointer;
    }
`;

const ProfileDetails = styled.div`
    display: flex;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    white-space: nowrap;
    transition: all 0.4s ease;

    img {
        height: 45px;
        width: 45px;
        object-fit: cover;
        border-radius: 12px;
    }
`;

const NameJob = styled.div`
    margin-left: 10px;

    .name {
        font-size: 15px;
        font-weight: 400;
    }
    .job {
        font-size: 12px;
    }
`;


export default function SideBar (props) {
    // const [ active, setActive ] = useState(false);
    const history = useHistory();

    const logout = async () => {
        let response = await fetch("http://localhost/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`UPDATE tbl_login SET Logout_Time=CURRENT_TIMESTAMP WHERE Logout_Time IS NULL AND Username='${sessionStorage.getItem('Username')}' ORDER BY Login_Time DESC LIMIT 1; ;`})
        });
        sessionStorage.removeItem('Username')
        sessionStorage.removeItem('UserType')
        history.push('./home');
    }

    return <><Sidebar isActive={props.isActive}>
        <LogoContainer isActive={props.isActive}>
            <Logo isActive={props.isActive}>
                {/* <i class='bx bxl-c-plus-plus'></i> */}
                <div>Admin Panel</div>
            </Logo>
            <i class={props.isActive ? 'bx bx-menu-alt-right' :'bx bx-menu'} id="btn"  onClick={() => props.setActive(!props.isActive)}></i>
        </LogoContainer>
        <NavList>
            <Nav isActive={props.isActive} onClick={() => props.setMenu('userbase')}>
                <a href="#">
                    <i class='bx bx-user-circle'></i>
                    <span>User Base</span>
                </a>
                <div>User Base</div>
            </Nav>
            <Nav isActive={props.isActive} onClick={() => props.setMenu('doctorCategory')}>
                <a href="#">
                    <i class='bx bx-category'></i>
                    {/* <LocalHospitalIcon id="icon"></LocalHospitalIcon> */}
                    <span>Doctor Category</span>
                </a>
                <div>Doctor Category</div>
            </Nav>
            <Nav isActive={props.isActive} onClick={() => props.setMenu('doctor')}>
                <a href="#">
                    <i class='bx bx-user'></i>
                    <span>Doctors</span>
                </a>
                <div>Doctors</div>
            </Nav>
            <Nav isActive={props.isActive} onClick={() => props.setMenu('patient')}>
                <a href="#">
                    <i class='bx bx-user'></i>
                    <span>Patients</span>
                </a>
                <div>Patients</div>
            </Nav>
            <Nav isActive={props.isActive}>
                <a href="#">
                    <i class='bx bx-calendar-event'></i>
                    <span>Booking</span>
                </a>
                <div>Booking</div>
            </Nav>
            <Nav isActive={props.isActive}>
                <a href="#">
                    <i class='bx bx-cog' ></i>
                    <span>Settings</span>
                </a>
                <div>Settings</div>
            </Nav>
        </NavList>
        <ProfileContent>
            <Profile isActive={props.active}>
                <ProfileDetails>
                    <NameJob>
                        <div class="name">Prem Shahi</div>
                        <div class="job">Web Designer</div>
                    </NameJob>
                </ProfileDetails>
                <i class='bx bx-log-out' id="log_out" onClick={logout}></i>
            </Profile>
        </ProfileContent>
    </Sidebar>
    </>
}