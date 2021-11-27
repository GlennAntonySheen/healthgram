import React, { useState } from 'react';
import styled from 'styled-components';
import MaterialTable from 'material-table';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CachedIcon from '@material-ui/icons/Cached';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const ContentWrapper = styled.div`
    width: 100%;
    padding: 10px;
    overflow: scroll;
    scrollbar-width: none;
    position: relative;
    margin-left: ${ props => props.isActive ? '230px' : '98px' }; 
    /* background-color: red; */
    transition: all 0.2s ease;
`;

const RefreshButton = styled.button`
    display: block;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    border: none;
    scale: 1.6;
    background-color: transparent;

    & :hover {
        transform: rotate(-180deg);
        transition: transform .3s linear .3s;
    }
`;

const NotVerifiedDoctorsPannel = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    margin-top: 20px;
    /* position: relative; */
    background-color: transparent;
`;

const AllDoctors = styled.div`
    width: 100%;
    margin-top: 20px;
    background-color: transparent;
`;

export default function Doctor(props) {
    const [notVerifiedDoctors, setNotVerifiedDoctors] = useState([]);
    const [doctorDetails, setDoctorDetails] = useState([]);
    const [loadForFirstTime, setLoadForFirstTime] = useState(true);


    const getUnverifiedDoctors = async () => {
        let response= await fetch("http://localhost:8080/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`SELECT doctor.Username, Doc_Id, Sp_Id, Doc_Name, Doc_Phone_No, Doc_Dob, Doc_Date_Registered, Doc_Proof
            , Doc_Age_Proof FROM healthgram.tbl_userbase userbase JOIN healthgram.tbl_doctor doctor On userbase.Username = doctor.Username and userbase.User_Status = 'not verified';`})
        });
        let table = await response.json();
        setNotVerifiedDoctors(table)
    }

    const getDoctorDetails = async () => {
        let response= await fetch("http://localhost:8080/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`SELECT * FROM healthgram.tbl_doctor doctor JOIN  healthgram.tbl_userbase userbase On userbase.Username = doctor.Username;`})
        });
        let table = await response.json();
        setDoctorDetails(table);
    }

    function fetchAllData() {
        getUnverifiedDoctors();
        getDoctorDetails();
    }

    // Automatically Fetch doctor data at first of loading
    if (loadForFirstTime) {
        fetchAllData();
        setLoadForFirstTime(false);
    }

    return <ContentWrapper isActive={props.isActive}>
        <RefreshButton onClick={ () => fetchAllData() }><CachedIcon style={{ color: '#035aa0'}} /></RefreshButton>
        <NotVerifiedDoctorsPannel>
            <MaterialTable
                title="Doctors to be verified"
                data={notVerifiedDoctors}
                columns={[
                    { title: "Doc ID", field: "Doc_Id", editable: false },
                    { title: "Specialization ID", field: "Doc_Id", editable: false },
                    { title: "Email", field: "Username" },
                    { title: "Name", field: "Doc_Name" },
                    { title: "Phone Number", field: 'Doc_Phone_No', },
                    { title: "DOB", field: "Doc_Dob", },
                    { title: "Registerd on", field: 'Doc_Date_Registered', },
                ]}
                options={{
                    actionsColumnIndex: 0, addRowPosition: "first",
                    search: false,
                    pageSizeOptions: [3, 5, 10],
                    pageSize: 3,
                }} 
                actions={[{
                    icon: () => <VerifiedUserIcon fontSize={'medium'} style={{ color: '#2ecc71' }} />,
                    tooltip: 'Verify',
                    onClick: async (event, rowData) => {
                        let response= await fetch("http://localhost:8080/healthgram/test.php",{
                            method:"POST",
                            header:{"Content-Type": "application/json"},
                            body:JSON.stringify({"query":`UPDATE tbl_userbase SET User_Status = 'verified' WHERE tbl_userbase.Username = '${rowData.Username}';`})
                        });
                        let table = await response.json();
                        fetchAllData();
                    }
                }]}
                detailPanel={rowData => {
                    // console.log('rowData is: ', (notVerifiedDoctors.find(o => o.Doc_Id == rowData.Doc_Id)).Doc_Proof);
                    return (
                        <>
                            <img src={(notVerifiedDoctors.find(o => o.Doc_Id == rowData.Doc_Id)).Doc_Proof } />
                            <img src={(notVerifiedDoctors.find(o => o.Doc_Id == rowData.Doc_Id)).Doc_Age_Proof} />
                        </>
                    )
                  }}
                style={{
                    height: 'auto',
                    // height: '200px',
                    width: '100%',
                    display: 'flex',
                    boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
                    flexDirection: 'column',
                    borderRadius: '1rem'
                    // backgroundColor: 'transparent'
                }}
            />
        </NotVerifiedDoctorsPannel>
        <AllDoctors>
            <MaterialTable
                title="Doctors Details"
                data={doctorDetails}
                columns={[
                    { title: "Doc ID", field: "Doc_Id" },
                    { title: "Status", field: "User_Status", lookup: {'verified': '🟢 verified', 'not verified': '🟡 not verified', 'inactive': '⛔ inactive'} },
                    { title: "Specialization ID", field: "Doc_Id" },
                    { title: "Email", field: "Username" },
                    { title: "Name", field: "Doc_Name" },
                    { title: "Phone Number", field: 'Doc_Phone_No', },
                    { title: "DOB", field: "Doc_Dob", },
                    { title: "Registerd on", field: 'Doc_Date_Registered', },
                    { title: "Tokens", field: "Doc_No_Of_Tokens", },
                    { title: "Fee", field: 'Doc_Fee', },
                    { title: "Gender", field: "Doc_Gender", },
                    { title: "House Number", field: 'Doc_House_No', },
                    { title: "Street", field: 'Doc_Street', },
                    { title: "District", field: "Doc_Dist", },
                    { title: "Pin Code", field: 'Doc_Pin', },
                ]}
                options={{
                    actionsColumnIndex: 0, addRowPosition: "first",
                    search: true,
                    exportButton: true
                }} 
                editable={{                    
                    isEditable: row=> row.Doc_Id==1
                }}
                actions={[
                    rowData => ({
                        icon: () => <RemoveCircleOutlineOutlinedIcon fontSize={'medium'} />,
                        tooltip: 'Remove User',
                        disabled: rowData.User_Status == 'inactive',
                        hidden: rowData.User_Status == 'inactive',
                        onClick: async (event, rowData) => {
                            let response= await fetch("http://localhost:8080/healthgram/test.php",{
                                method:"POST",
                                header:{"Content-Type": "application/json"},
                                body:JSON.stringify({"query":`UPDATE tbl_userbase SET User_Status = 'inactive' WHERE tbl_userbase.Username = '${rowData.Username}';`})
                            });
                            let table = await response.json();
                            console.log('table is: ', table);
                            getDoctorDetails();
                        }
                    }),
                    rowData => ({
                        icon: () => <VolunteerActivismIcon fontSize={'medium'} />,
                        tooltip: 'Activate User',
                        disabled: rowData.User_Status == 'verified',
                        hidden: rowData.User_Status == 'verified',
                        onClick: async (event, rowData) => {
                            let response= await fetch("http://localhost:8080/healthgram/test.php",{
                                method:"POST",
                                header:{"Content-Type": "application/json"},
                                body:JSON.stringify({"query":`UPDATE tbl_userbase SET User_Status = 'verified' WHERE tbl_userbase.Username = '${rowData.Username}';`})
                            });
                            let table = await response.json();
                            getDoctorDetails();
                        }
                    }),
                ]}
                detailPanel={rowData => {
                    console.log('rowData is: ', doctorDetails);
                    return (
                        <>
                            <img src={rowData.Doc_Proof } />
                            <img src={rowData.Doc_Age_Proof} />
                        </>
                    )
                }}
                style={{
                    height: 'auto',
                    width: '100%',
                    display: 'flex',
                    boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
                    flexDirection: 'column',
                    borderRadius: '1rem',    
                    marginBottom: '0px'
                    // backgroundColor: 'transparent'
                }}
            />
        </AllDoctors> 
    </ContentWrapper>
}