import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import TopMenu from './components/layout/TopMenu';
import Users from './components/Users';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AboutPage from './components/AboutPage';
import Search from './components/Search';
import UserDetail from './components/UserDetail';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]); 
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    const fetchData = async () =>  {
      const res = await axios.get(`https://api.github.com/users?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`);
      setUsers(res.data);
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  const searchUsers = async (userText) => {
    const res = await axios.get(`https://api.github.com/search/users?q=${userText}&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`);
    setUsers(res.data.items);
  }

  const getUser = async(login) => {
    const res = await axios.get(`https://api.github.com/users/${login}?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`);
    setUserDetail(res.data);
  }

  return (
    <Router>
      <div>
        <TopMenu />
        <Container>
          <Switch>
            <Route exact path="/" render={(props) => (
              <React.Fragment>
                <Search searchUsers={searchUsers} />
                <Users users={users} />
              </React.Fragment>
            )} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/userDetail/:login" render={props => (
              <UserDetail {...props} getUser={getUser} userDetail={userDetail} />
            )} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
