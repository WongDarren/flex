import AlertActionTypes from './alert.types';

import uuid from 'uuid';

export const setAlert = (msg, alertType) => (dispatch) => {
	const id = uuid.v5();
	dispatch({
		type: AlertActionTypes.SET_ALERT,
		payload: { msg, alertType, id },
	});
};
