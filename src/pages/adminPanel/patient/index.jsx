import React, { useState } from 'react';
import styled from 'styled-components';
import MaterialTable from 'material-table';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import CachedIcon from '@material-ui/icons/Cached';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const ContentWrapper = styled.div`
    width: 100%;
    padding: 10px;
    overflow: scroll;
    scrollbar-width: none;
    position: relative;
    margin-left: ${ props => props.isActive ? '230px' : '98px' }; 
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
    /* background-color: violet; */

    & :hover {
        transform: rotate(-180deg);
        transition: transform .3s linear .3s;
    }
`;

const NotVerifiedPatientsPannel = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    margin-top: 20px;
    /* position: relative; */
    background-color: transparent;
`;

const AllPatients = styled.div`
    width: 100%;
    margin-top: 20px;
    background-color: transparent;
`;

export default function Patient(props) {
    const [notVerifiedPatients, setNotVerifiedPatients] = useState([]);
    const [patientDetails, setPatientDetails] = useState([]);
    const [loadForFirstTime, setLoadForFirstTime] = useState(true);


    const getUnverifiedPatients = async () => {
        let response= await fetch("http://localhost:8080/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`SELECT patient.Username, Pat_Id, Pat_Name, Pat_Phone_No, Pat_Dob, Pat_Date_Registered, Pat_Id_Proof FROM healthgram.tbl_userbase userbase JOIN healthgram.tbl_patient patient On userbase.Username = patient.Username and userbase.User_Status = 'not verified';`})
            
        });
        let table = await response.json();
        setNotVerifiedPatients(table)
    }

    const getPatientDetails = async () => {
        let response= await fetch("http://localhost:8080/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`SELECT * FROM healthgram.tbl_patient patient JOIN  healthgram.tbl_userbase userbase On userbase.Username = patient.Username;`})
        });
        let table = await response.json();
        setPatientDetails(table);
    }

    function fetchAllData() {
        getUnverifiedPatients();
        getPatientDetails();
    }

    // Automatically Fetch patient data at first of loading
    if (loadForFirstTime) {
        fetchAllData();
        setLoadForFirstTime(false);
    }

    return <ContentWrapper isActive={props.isActive}>
        <RefreshButton onClick={ () => fetchAllData() }><CachedIcon style={{ color: '#035aa0'}} /></RefreshButton>
        <NotVerifiedPatientsPannel>
            <MaterialTable
                title="Patients to be verified"
                data={notVerifiedPatients}
                columns={[
                    { title: "Pat ID", field: "Pat_Id", editable: false },
                    { title: "Email", field: "Username" },
                    { title: "Name", field: "Pat_Name" },
                    { title: "Phone Number", field: 'Pat_Phone_No', },
                    { title: "DOB", field: "Pat_Dob", },
                    { title: "Registerd on", field: 'Pat_Date_Registered', },
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
                    return (
                        <>
                            <img src={(notVerifiedPatients.find(o => o.Pat_Id == rowData.Pat_Id)).Pat_Id_Proof  } />
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
        </NotVerifiedPatientsPannel>
        <AllPatients>
            <MaterialTable
                title="Patients Details"
                data={patientDetails}
                columns={[
                    { title: "Patient ID", field: "Pat_Id" },
                    { title: "Status", field: "User_Status", lookup: {'verified': '🟢 verified', 'not verified': '🟡 not verified', 'inactive': '⛔ inactive'}},
                    { title: "Email", field: "Username" },
                    { title: "Name", field: "Pat_Name" },
                    { title: "Phone Number", field: 'Pat_Phone_No', },
                    { title: "DOB", field: "Pat_Dob", },
                    { title: "Registerd on", field: 'Pat_Date_Registered', },
                    { title: "Gender", field: "Pat_Gender", },
                    { title: "House Number", field: 'Pat_House_No', },
                    { title: "Street", field: 'Pat_Street', },
                    { title: "District", field: "Pat_Dist", },
                    { title: "Pin Code", field: 'Pat_Pin', },
                ]}
                options={{
                    actionsColumnIndex: 0, addRowPosition: "first",
                    search: true,  
                    exportButton: {
                        csv: true,
                        pdf: false
                    }
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
                            console.log(rowData.Doc_Id == 1)
                            let response= await fetch("http://localhost:8080/healthgram/test.php",{
                                method:"POST",
                                header:{"Content-Type": "application/json"},
                                body:JSON.stringify({"query":`UPDATE tbl_userbase SET User_Status = 'inactive' WHERE tbl_userbase.Username = '${rowData.Username}';`})
                            });
                            let table = await response.json();
                            console.log('table is: ', table);
                            getPatientDetails();
                        }
                    }),
                    rowData => ({
                        icon: () => <VolunteerActivismIcon fontSize={'medium'} />,
                        tooltip: 'Activate User',
                        disabled: rowData.User_Status == 'verified',
                        hidden: rowData.User_Status == 'verified' || rowData.User_Status == 'not verified',
                        onClick: async (event, rowData) => {
                            let response= await fetch("http://localhost:8080/healthgram/test.php",{
                                method:"POST",
                                header:{"Content-Type": "application/json"},
                                body:JSON.stringify({"query":`UPDATE tbl_userbase SET User_Status = 'verified' WHERE tbl_userbase.Username = '${rowData.Username}';`})
                            });
                            let table = await response.json();
                            getPatientDetails();
                        }
                    }),
                ]}
                detailPanel={rowData => {
                    return (
                        <>
                            <img src={rowData.Pat_Id_Proof } />
                        </>
                    )
                }}
                style={{
                    height: 'auto',
                    width: '100%',
                    display: 'flex',
                    boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
                    flexDirection: 'column',
                    borderRadius: '1rem'
                    // backgroundColor: 'transparent'
                }}
            />
        </AllPatients> 
    </ContentWrapper>;
}