import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Home } from './pages/home';
import { AccountBox } from './pages/accountBox';
import { AdminPanel } from './pages/adminPanel';
import { DoctorPanel } from './pages/doctorPanel';
import { PatientPanel } from './pages/patientPanel';

function App() {
	return (<>
		<Router>
			<Switch>
				<Route exact path="/">
					<Navbar />
					<Home />
					{/* <AdminPanel /> */}
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
					<PatientPanel />
				</Route>
			</Switch>
		</Router>
	</>);
}

export default App;
