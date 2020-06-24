import React from 'react';
import './App.css';
import {Redirect, Route, Switch} from 'react-router-dom';
import Login from './containers/Login/Login';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {BASE_URL} from './apis/constants';
import Dashboard from './containers/Dashboard/Dashboard';

axios.defaults.baseURL = BASE_URL;

function App() {
    const user = useSelector(state => state.user.user);

    axios.defaults.headers.common = {'Authorization': `Bearer ${user?.access}`};

    React.useEffect(() => {
        //todo: validate token
    }, []);
    return (
        <Switch>
            {
                user &&
                <Route path={'/dashboard'}>
                    <Dashboard/>
                </Route>
            }
            {
                !user &&
                <Route path='/login'>
                    <Login/>
                </Route>
            }
            {
                !user &&
                <Redirect to={'/login'}/>
            }
            {
                user &&
                <Redirect to={'/dashboard'}/>
            }
        </Switch>
    );
}

export default App;
