import React, { useState } from 'react';
import styled from 'styled-components';
import MaterialTable from 'material-table';
import CachedIcon from '@material-ui/icons/Cached';

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

    & :hover {
        transform: rotate(-180deg);
        transition: transform .3s linear .3s;
    }
`;

const DoctorSpecializations = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    margin-top: 20px;
    background-color: transparent;
`;

export default function DoctorCategory(props) {
    const [specializations, setSpecializations] = useState([]);
    const [loadForFirstTime, setLoadForFirstTime] = useState(true);

    const getSpecializationsDetails = async () => {
        let response= await fetch("http://localhost:8080/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`SELECT * FROM tbl_doctor_category;`})
        });
        let table = await response.json();
        setSpecializations(table);
    }
    
    // Automatically Fetch doctor data at first of loading
    if (loadForFirstTime) {
        getSpecializationsDetails();
        setLoadForFirstTime(false);
    }

    return <ContentWrapper isActive={props.isActive}>
        <RefreshButton onClick={ () => getSpecializationsDetails() }><CachedIcon style={{ color: '#035aa0'}} /></RefreshButton>
        <DoctorSpecializations>
            <MaterialTable
                title="Doctor Categories"
                data={specializations}
                columns={[
                    { title: "Spec ID", field: "Sp_Id" },
                    { title: "Specialization", field: "Sp_Name" }
                ]}
                editable={{
                    onRowAdd:  async (newData) => {
                        let response= await fetch("http://localhost:8080/healthgram/test.php",{
                            method:"POST",
                            header:{"Content-Type": "application/json"},
                            body:JSON.stringify({"query":`INSERT INTO tbl_doctor_category (Sp_Id, Sp_Name) VALUES (NULL, '${newData.Sp_Id}');`})
                        });
                        let table = await response.json();
                        setSpecializations(table);
                        getSpecializationsDetails()
                    }
                }}
                options={{
                    actionsColumnIndex: 0, addRowPosition: "first",
                    pageSizeOptions: [5, 8, 10],
                    pageSize: 8,
                    exportButton: true
                }} 
                style={{
                    height: 'auto',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
                    flexDirection: 'column',
                    borderRadius: '1rem'
                }}
            />
        </DoctorSpecializations>
    </ContentWrapper>
}