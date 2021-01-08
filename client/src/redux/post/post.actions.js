import axios from 'axios';

import PostActionTypes from './post.types';

// Get posts
export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/posts');

		dispatch({ type: PostActionTypes.GET_POSTS, payload: res.data });
	} catch (err) {
		dispatch({
			type: PostActionTypes.POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
