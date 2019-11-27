import React from 'react';
import Script from 'react-load-script';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Dashboard from '../containers/Dashboard';
import MyAccount from '../containers/MyAccount';
import Favorites from '../containers/Favorites';
import Header from '../components/Header';
import Notification from '../containers/Notification';

// const APIMAP = process.env.API_MAPS;
const APIMAP = 'AIzaSyBT0i5Q5Wmyr7N4N3RSjojWNIhA2tBPE9o';

const App = ({ isLogin, notification }) => (
	<BrowserRouter>
		<Script
			url={`https://maps.googleapis.com/maps/api/js?key=${APIMAP}&libraries=drawing,geometry,places`}
		/>
		{isLogin && <Header />}
		<Notification data={notification} />
		<div>
			<Switch>
				<Route exact path='/' component={Login} />
				<Route exact path='/register' component={Register} />
				<Route
					exact
					path='/dashboard'
					component={isLogin ? Dashboard : Login}
				/>
				<Route
					exact
					path='/myaccount'
					component={isLogin ? MyAccount : Login}
				/>
				<Route
					exact
					path='/favorites'
					component={isLogin ? Favorites : Login}
				/>
			</Switch>
		</div>
	</BrowserRouter>
);

const mapStateToProps = state => {
	return {
		isLogin: state.user.id_usuario,
		notification: state.notificationstate,
	};
};
export default connect(mapStateToProps, null)(App);
