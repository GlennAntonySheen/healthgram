import React, { useState, useContext } from 'react';
import styled from 'styled-components'
import { Button, TextField, Grid, Typography, Container, Paper, Dialog, IconButton, Tooltip } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { makeStyles } from '@material-ui/core/styles';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import EventNoteIcon from '@mui/icons-material/EventNote';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { SocketContext } from '../Context';

const DialogContainer = styled.div`
    /* height: 170px; */
    width: 300px;
    padding:30px;
	padding-bottom: 10px;
    display: flex;
    flex-direction: column;
	justify-content: center;
	align-items: flex-end;

    span {
        color: rgba(0, 0, 0, 0.6);
    }	
`;

const ControlWrapper = styled.div`
    height: 80px;
    width: fit-content;
    display: flex;
    justify-content: space-evenly;
    position: absolute;
    margin-left: auto; 
    margin-right: auto;
    bottom: 15px;
    left: 0; 
    right: 0; 
	border-radius: 3rem;
	background-color: white;
    box-shadow: 0 9px 24px rgb(0 0 0 / 12%), 0 9px 24px rgb(0 0 0 / 12%);
`;

const ControlItem = styled.div`
	width: 70px;
	margin: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 100%;
	background-color: white;
`;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
	},
	gridContainer: {
		width: '100%',
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
		},
	},
	container: {
		width: '600px',
		margin: '35px 0',
		padding: 0,
		[theme.breakpoints.down('xs')]: {
			width: '80%',
		},
	},
	margin: {
		marginTop: 20,
	},
	padding: {
		padding: 20,
	},
	paper: {
		padding: '10px 20px',
		border: '2px solid black',
	},
}));

const Sidebar = ({ children }) => {
	const { me, callAccepted, name, setName, callEnded, leaveCall, callUser, showPrescriptions, setShowPrescriptions } = useContext(SocketContext);
	const [idToCall, setIdToCall] = useState('');
	const classes = useStyles();

	return (<>
		{sessionStorage.getItem('UserType') === 'patient' &&
			<Dialog 
				open={!callAccepted}
				PaperProps={{
					style: {
						overflow: 'visible',
						boxShadow: 'none',
						borderRadius: '1rem',
						backgroundColor: 'white',
						boxShadow: '0 9px 24px rgb(0 0 0 / 12%), 0 9px 24px rgb(0 0 0 / 12%)'
					},
				}}
			>
				<DialogContainer>
					<TextField 
						label="Paste Join Link *" 
						variant="outlined" 
						color="primary"
						focused
						autoFocus 
						fullWidth
						onChange={(e) => setIdToCall(e.target.value)}
					/>		
					<div>		
						<Tooltip title="End Call">
							<IconButton onClick={() => leaveCall()}>
								<CallEndIcon sx={{ color: 'red', fontSize: 30 }} />
							</IconButton>
						</Tooltip>			
						<Tooltip title="Join Video Call">
							<IconButton 								
								onClick={() => callUser(idToCall)}
								disabled={idToCall == ''}
							>
								<MeetingRoomIcon color={idToCall == '' ? 'disabled' : "primary"} sx={{ fontSize: 30 }} />
							</IconButton>
						</Tooltip>
					</div>
				</DialogContainer>
			</Dialog>
		}		
		<ControlWrapper>
			<ControlItem  style={{ 'background-color': '#1976d2' }}>
				<Tooltip title="End Call">
            		<IconButton onClick={() => leaveCall()}><CallEndIcon sx={{ color: 'white', fontSize: 40 }} /></IconButton>
				</Tooltip>
			</ControlItem>
			<ControlItem>
				<Tooltip title="Toggle Prescription View">
					<IconButton onClick={() => setShowPrescriptions(!showPrescriptions)}>
						<CopyToClipboard text={me}><EventNoteIcon color="primary" sx={{ fontSize: 40 }} /></CopyToClipboard>
					</IconButton>
				</Tooltip>
			</ControlItem>
			<ControlItem>
				<Tooltip title="Copy Your ID">
					<IconButton>
						<CopyToClipboard text={me}><InfoOutlinedIcon color="primary" sx={{ fontSize: 40 }} /></CopyToClipboard>
					</IconButton>
				</Tooltip>
			</ControlItem>
		</ControlWrapper>
		{children}
		{/* <Container className={classes.container}>
			<Paper elevation={10} className={classes.paper}> 
				{/* <form className={classes.root} noValidate autoComplete="off"> 
					{/* <Grid container className={classes.gridContainer}>
						<Grid item xs={12} md={6} className={classes.padding}>
							<Typography gutterBottom variant="h6">Account Info</Typography>
							<TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
							<CopyToClipboard text={me} className={classes.margin}>
								<Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
									Copy Your ID
								</Button>
							</CopyToClipboard>
						</Grid>
						<Grid item xs={12} md={6} className={classes.padding}>
							<Typography gutterBottom variant="h6">Make a call</Typography>
							<TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
							{callAccepted && !callEnded ? (
								<Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} className={classes.margin}>
									Hang Up
								</Button>
							) : (
								<Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)} className={classes.margin}>
									Call
								</Button>
							)}
						</Grid>
					</Grid> */}
				{/* </form> */}
			{/* </Paper>
		</Container> */}
	</>
	);
};

export default Sidebar;
