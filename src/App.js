import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Home } from './pages/home';
import { AccountBox } from './pages/accountBox';
import { AdminPanel } from './pages/adminPanel';
import { DoctorPanel } from './pages/doctorPanel';
import { PatientPanel } from './pages/patientPanel';
import { AllDoctors } from './pages/patientPanel/allDoctors.jsx';
import { Booking } from './pages/booking';
import { Consultation } from './pages/consultation';
import { BookingReport } from './components/reports/bookingReport';
import { PatientReport } from './components/reports/patientReport';
import { DoctorReport } from './components/reports/doctorReport';

function App() {
	return (<>
		<Router>
			<Switch>
				<Route exact path="/">
					<Consultation />
				</Route>
				<Route exact path="/home">
					<Navbar textColor={'white'} opaque={true} type={'home'}/> 
					<Home />
				</Route>
				<Route exact path="/registerPatient">
					<AccountBox type={'registerPatient'} />
				</Route>
				<Route exact path="/registerDoctor">
					<AccountBox type={'registerDoctor'} />
				</Route>
				<Route exact path="/login">
					<AccountBox type={'login'} />
				</Route>
				<Route exact path="/admin">
					<AdminPanel />
				</Route>
				<Route exact path="/doctor">
					<DoctorPanel />
				</Route>
				<Route exact path="/patient">
					<Navbar textColor={'white'} opaque={true} type={'patient'}/>
					<PatientPanel />
				</Route>
				<Route exact path="/allDoctors">
					<Navbar textColor={'white'} opaque={true} type={'patient'}/>
					<AllDoctors />
				</Route>
				<Route exact path="/booking">
					<Navbar textColor={'white'} type={'patient'} />
					<Booking />
				</Route>
				<Route exact path="/consultation/:bookidorvideolink">
					<Consultation />
				</Route>
				<Route exact path="/doctorReport">
					<DoctorReport />
				</Route>
				<Route exact path="/patientReport">
					<PatientReport />
				</Route>
				<Route exact path="/bookingReport/:fromDate/:toDate">
					<BookingReport />
				</Route>
			</Switch>
		</Router>
	</>);
}

export default App;
