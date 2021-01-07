import axios from 'axios';

import { setAlert } from '../alert/alert.actions';
import AuthActionTypes from './auth.types';
import ProfileActionTypes from '../profile/profile.types';
import setAuthToken from './auth.utils';

// Load User
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');

		dispatch({ type: AuthActionTypes.USER_LOADED, payload: res.data });
	} catch (err) {
		dispatch({ type: AuthActionTypes.AUTH_ERROR });
	}
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
	const config = { headers: { 'Content-Type': 'application/json' } };
	const body = JSON.stringify({ name, email, password });

	try {
		const res = await axios.post('/api/users/', body, config);

		dispatch({ type: AuthActionTypes.REGISTER_SUCCESS, payload: res.data });
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({ type: AuthActionTypes.REGISTER_FAIL });
	}
};

// Login
export const login = (email, password) => async (dispatch) => {
	const config = { headers: { 'Content-Type': 'application/json' } };
	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post('/api/auth', body, config);

		dispatch({ type: AuthActionTypes.LOGIN_SUCCESS, payload: res.data });
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({ type: AuthActionTypes.LOGIN_FAIL });
	}
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
	dispatch({ type: ProfileActionTypes.CLEAR_PROFILE });
	dispatch({ type: AuthActionTypes.LOGOUT });
};

// Delete account & profile
export const deleteAccount = (id) => async (dispatch) => {
	if (window.confirm('Are you sure? This can not be undone.')) {
		try {
			await axios.delete('/api/profile');

			dispatch({ type: ProfileActionTypes.CLEAR_PROFILE });
			dispatch({ type: AuthActionTypes.DELETE_ACCOUNT });

			dispatch(setAlert('Your account has been permanently deleted.'));
		} catch (err) {
			dispatch({
				type: ProfileActionTypes.PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
		}
	}
};
