import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Dashboard from '../containers/Dashboard';
import MyAccount from '../containers/MyAccount';
import Favorites from '../containers/Favorites';
import Header from '../components/Header';

const App = ({ isLogin }) => (
	<BrowserRouter>
		{isLogin && <Header />}
		<div>
			<Switch>
				<Route exact path='/' component={Login} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/dashboard' component={Dashboard} />
				<Route exact path='/myaccount' component={MyAccount} />
				<Route exact path='/favorites' component={Favorites} />
			</Switch>
		</div>
	</BrowserRouter>
);

const mapStateToProps = state => {
	return {
		isLogin: state.user.id_usuario,
	};
};
export default connect(mapStateToProps, null)(App);
