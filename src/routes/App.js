import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Dashboard from '../containers/Dashboard';
import MyAccount from '../containers/MyAccount';

const App = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Login} />
			<Route exact path='/register' component={Register} />
			<Route exact path='/dashboard' component={Dashboard} />
			<Route exact path='/myaccount' component={MyAccount} />
		</Switch>
	</BrowserRouter>
);

export default App;
