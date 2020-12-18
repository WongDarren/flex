import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/auth/auth.actions';
import setAuthToken from './redux/auth/auth.utils';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	});
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Route exact path='/' component={Landing} />
					<Switch>
						<PrivateRoute exact path='/dashboard' component={Dashboard} />
						<Route exact path='/register' component={Register} />
						<Route exact path='/login' component={Login} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
