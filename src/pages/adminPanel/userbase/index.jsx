import React, { useState} from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import MaterialTable from 'material-table';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import CachedIcon from '@material-ui/icons/Cached';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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
    height: auto;
    width: 100%;
    /* display: block; */
    margin: 10px;
    /* margin-left: auto;
    margin-right: auto; */
    cursor: pointer;
    border: none;
    border-radius: 1rem;
    /* scale: 1.6; */
    box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;    
    /* background-color: transparent; */
    background-color: white;

    & :hover {
        transform: rotate(-180deg);
        transition: transform .3s linear .3s;
    }
`;

const AllUsers = styled.div`
    width: 100%;
    margin-top: 20px;
    /* background-color: green; */
`;

const AddAdmin = styled.div`
    /* height: auto; */
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
    box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
    border-radius: 1rem;    
    padding: 20px;
    transition: 12s  ease-in-out;
    background-color: white;

    h3 {
        margin: auto 0px;
        font-family: sans-serif;
        font-weight: 600;
        color: #444444;
    }
`;

export default function Userbase (props) {
    const [usersDetails, setUsersDetails] = useState([]);
    const [loadForFirstTime, setLoadForFirstTime] = useState(true);
    const [duplicateAdminInsert, setDuplicateAdminInsert] = useState(false)
    const { 
        watch, 
        register, 
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({ mode: "all" });   

    const addAdminStyle = { 
        marginTop: '5px',
    }

    const getUserDetails = async () => {
        let response= await fetch("http://localhost/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`SELECT * FROM tbl_userbase;`})
        });
        let table = await response.json();
        setUsersDetails(table);
    }

    const addAdmin = async (data) => {
        // Checking if the new user already exist
        let response= await fetch("http://localhost/healthgram/test.php",{
            method:"POST",
            header:{"Content-Type": "application/json"},
            body:JSON.stringify({"query":`SELECT * FROM tbl_userbase WHERE Username="${data.email}";`})
        });
        let table = await response.json();
        console.log(table);

        // no duplicate user exist
        if (table.length == 0) {
            console.log(data)
            let response= await fetch("http://localhost/healthgram/test.php",{
                method:"POST",
                header:{"Content-Type": "application/json"},
                body:JSON.stringify({"query":`INSERT INTO tbl_userbase(Username, Password, User_Type, User_Status) VALUES ('${data.email}','${data.password}','admin','verified');`})
            });
            getUserDetails()
        } else {
            setDuplicateAdminInsert(true)
        }
    }

    // Automatically Fetch doctor data at first of loading
    if (loadForFirstTime) {
        getUserDetails();
        setLoadForFirstTime(false);
    }

    return <ContentWrapper isActive={props.isActive}>
        <RefreshButton onClick={ () => getUserDetails() }><CachedIcon style={{ color: '#035aa0', fontSize: '40px'}} /></RefreshButton>
        <AllUsers>
            <MaterialTable
                title="Users Details"
                data={usersDetails}
                columns={[
                    { title: "User Type", field: "User_Type", lookup: {'admin': '👨‍💼 admin', 'doctor': '🩺 doctor', 'patient': '😷 patient'}  },
                    { title: "Status", field: "User_Status", lookup: {'verified': '🟢 verified', 'not verified': '🟡 not verified', 'inactive': '⛔ inactive'} },
                    { title: "Email", field: "Username" },
                ]}
                options={{
                    actionsColumnIndex: 0, addRowPosition: "first",
                    search: true,                   
                    exportButton: true
                }} 
                editable={{    
                                    
                    // onRowAdd: async (newData) => {
                    //     console.log(newData);
                    //     let response= await fetch("http://localhost/healthgram/test.php",{
                    //         method:"POST",
                    //         header:{"Content-Type": "application/json"},
                    //         body:JSON.stringify({"query":`INSERT INTO tbl_userbase(Username, Password, User_Type, User_Status) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]');`})
                    //     });
                    //     let table = await response.json();
                    //     getUserDetails();
                    // }
                    // new Promise((resolve, reject) => {
                    //   setTimeout(() => {
                    //     {
                    //       const data = this.state.data;
                    //       data.push(newData);
                    //       this.setState({ data }, () => resolve());
                    //     }
                    //     resolve()
                    //   }, 1000)
                    // })
                }}
                actions={[
                    rowData => ({
                        icon: () => <RemoveCircleOutlineOutlinedIcon fontSize={'medium'} />,
                        tooltip: 'Remove User',
                        disabled: rowData.User_Status == 'inactive',
                        onClick: async (event, rowData) => {
                            let response= await fetch("http://localhost/healthgram/test.php",{
                                method:"POST",
                                header:{"Content-Type": "application/json"},
                                body:JSON.stringify({"query":`UPDATE tbl_userbase SET User_Status = 'inactive' WHERE tbl_userbase.Username = '${rowData.Username}';`})
                            });
                            let table = await response.json();
                            getUserDetails();
                        }
                    }),
                ]}
                style={{
                    height: 'auto',
                    width: '100%',
                    display: 'flex',
                    boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
                    flexDirection: 'column',
                    borderRadius: '1rem',    
                    padding: '0px 20px'
                    // backgroundColor: 'transparent'
                }}
            />
        </AllUsers> 
        <AddAdmin>
            <h3>ADD ADMIN</h3>         
            <Tooltip title="Add Admin">
                <IconButton aria-label="delete" size="large" color="primary" onClick={handleSubmit(addAdmin)} disabled={!isValid}>
                    <PersonAddIcon />
                </IconButton>
            </Tooltip>            
            <TextField 
                name="email"
                label="Email ID *" 
                variant="outlined" 
                error={!!errors.email}
                helperText={!!errors.email ? errors.email.message : ''}
                {...register("email", { 
                    required: "Please Enter E-mail ID",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid E-mail Address"
                    }
                })}
            />
            <TextField 
                name="password" 
                label="Password *" 
                variant="outlined" 
                fullWidth={false} 
                error={!!errors.password}
                helperText={!!errors.password ? errors.password.message : ''} 
                {...register("password", { 
                    required: "Please Enter A Password",
                    minLength: {
                        value: 8,
                        message: "Password Must Contain Atleast 8 Characters"                            
                    }
                })}
            />
            <TextField disabled label="User Type" defaultValue="admin" />
            <TextField disabled label="User Type" defaultValue="🟢 verified" />
            {/* <button onClick={() =>  setDuplicateAdminInsert(true)  }>dhfg</button>  */}
            {/* <pre>{JSON.stringify(watch(), null, 2)}</pre>  */}
        </AddAdmin>
        <Snackbar 
            anchorOrigin={{
                vertical: "center",
                horizontal: "center"
            }}
            open={duplicateAdminInsert} 
            autoHideDuration={3000} 
            onClose={() => setDuplicateAdminInsert(false)}>
            <Alert onClose={() => setDuplicateAdminInsert(false)} severity="error" variant="filled"  sx={{ width: '400px' }}>This Admin already exists!</Alert>
      </Snackbar>
    </ContentWrapper>
}