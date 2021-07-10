import './App.css';
import { Navbar } from './components/navbar';
import { Home } from './pages/home';
import { AccountBox } from './pages/accountBox';
import { AdminPanel } from './pages/adminPanel';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
          <AccountBox type={'registerPatient'}/>
        </Route>
        <Route exact path="/registerDoctor">
          <AccountBox type={'registerDoctor'}/>
        </Route>
        <Route exact path="/login">
          <AccountBox type={'login'}/>
        </Route>
        <Route exact path="/admin">
          <AdminPanel />
        </Route>
      </Switch>
    </Router>
    
  </>);
}

export default App;
