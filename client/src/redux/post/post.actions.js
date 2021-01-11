import axios from 'axios';

import { setAlert } from '../alert/alert.actions';

import PostActionTypes from './post.types';

// Get post
export const getPost = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/posts/${id}`);

		dispatch({ type: PostActionTypes.GET_POST, payload: res.data });
	} catch (err) {
		dispatch({
			type: PostActionTypes.POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

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

// Add like
export const addLike = (id) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/posts/like/${id}`);

		dispatch({
			type: PostActionTypes.UPDATE_LIKES,
			payload: { id, likes: res.data },
		});
	} catch (err) {
		dispatch({
			type: PostActionTypes.POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/posts/unlike/${id}`);

		dispatch({
			type: PostActionTypes.UPDATE_LIKES,
			payload: { id, likes: res.data },
		});
	} catch (err) {
		dispatch({
			type: PostActionTypes.POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Delete post
export const deletePost = (id) => async (dispatch) => {
	try {
		await axios.delete(`/api/posts/${id}`);

		dispatch({
			type: PostActionTypes.DELETE_POST,
			payload: { id },
		});

		dispatch(setAlert('Post Removed', 'success'));
	} catch (err) {
		dispatch({
			type: PostActionTypes.POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Add post
export const addPost = (formData) => async (dispatch) => {
	const config = { headers: { 'Content-Type': 'application/json' } };

	try {
		const res = await axios.post('/api/posts/', formData, config);

		dispatch({
			type: PostActionTypes.ADD_POST,
			payload: res.data,
		});

		dispatch(setAlert('Post Created', 'success'));
	} catch (err) {
		dispatch({
			type: PostActionTypes.POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
	const config = { headers: { 'Content-Type': 'application/json' } };

	try {
		const res = await axios.post(
			`/api/posts/comment/${postId}`,
			formData,
			config
		);

		dispatch({
			type: PostActionTypes.ADD_COMMENT,
			payload: res.data,
		});

		dispatch(setAlert('Comment Added', 'success'));
	} catch (err) {
		dispatch({
			type: PostActionTypes.POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
	try {
		await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

		dispatch({
			type: PostActionTypes.DELETE_COMMENT,
			payload: commentId,
		});

		dispatch(setAlert('Comment Deleted', 'success'));
	} catch (err) {
		dispatch({
			type: PostActionTypes.POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
