import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Home } from './pages/home';
import { AccountBox } from './pages/accountBox';
import { AdminPanel } from './pages/adminPanel';
import { DoctorPanel } from './pages/doctorPanel';
import { PatientPanel } from './pages/patientPanel';
import { Booking } from './pages/booking';

function App() {
	return (<>
		<Router>
			<Switch>
				<Route exact path="/">
					<Navbar />
					<Booking />
				</Route>
				<Route exact path="/home">
					<Navbar textColor={'white'}/> 
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
					<Navbar textColor={'white'} opaque={true}/>
					<PatientPanel />
				</Route>
				<Route exact path="/booking">
					<Navbar textColor={'white'}/>
					<Booking />
				</Route>
			</Switch>
		</Router>
	</>);
}

export default App;
