import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

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
						<PrivateRoute
							exact
							path='/create-profile'
							component={CreateProfile}
						/>
						<PrivateRoute exact path='/edit-profile' component={EditProfile} />
						<PrivateRoute
							exact
							path='/add-experience'
							component={AddExperience}
						/>
						<PrivateRoute
							exact
							path='/add-education'
							component={AddEducation}
						/>
						<PrivateRoute exact path='/posts' component={Posts} />
						<PrivateRoute exact path='/posts/:id' component={Post} />
						<Route exact path='/profiles' component={Profiles} />
						<Route exact path='/profile/:id' component={Profile} />
						<Route exact path='/register' component={Register} />
						<Route exact path='/login' component={Login} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
