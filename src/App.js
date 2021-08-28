import './App.css';
// import Header from './comps/header'; // used for the amazon clone
// import Products from './comps/products'; // used for the amazon clone
import HeaderV2 from './comps/v2Header';
import UserPage from './comps/userPage';
import UserEditPage from './comps/editProfile';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderV2/>
        <br/>

        <Switch>
          <Route path="/" exact={true}>
              <br/>
              A simple LinkTree clone :) 
              <br/>
              <a href="https://github.com/Serakoi" target="_blank">Author</a>
          </Route>
          <Route path="/me/edit">
              <UserEditPage/>
          </Route>
          <Route path="/u/:id">
              <UserPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;