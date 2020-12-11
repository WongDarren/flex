import AuthActionTypes from './auth.types';

const INITIAL_STATE = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case AuthActionTypes.REGISTER_SUCCESS:
			localStorage.setItem('token', payload.token);
			return { ...state, ...payload, isAuthenticated: true, loading: false };
		case AuthActionTypes.REGISTER_FAIL:
			return { ...state, token: null, isAuthenticated: false, loading: false };
		case AuthActionTypes.USER_LOADED:
			return { ...state, isAuthenticated: true, loading: false, user: payload };
		case AuthActionTypes.AUTH_ERROR:
			localStorage.removeItem('token');
			return { ...state, token: null, isAuthenticated: false, loading: false };
		default:
			return state;
	}
};

export default authReducer;
