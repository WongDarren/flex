import AlertActionTypes from './alert.types';

import { v4 as uuid } from 'uuid';

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
	const id = uuid();
	dispatch({
		type: AlertActionTypes.SET_ALERT,
		payload: { msg, alertType, id },
	});

	setTimeout(
		() => dispatch({ type: AlertActionTypes.REMOVE_ALERT, payload: id }),
		timeout
	);
};
