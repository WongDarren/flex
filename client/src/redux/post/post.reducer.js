import Post from '../../components/post/Post';
import PostActionTypes from './post.types';

const INITIAL_STATE = {
	posts: [],
	post: null,
	loading: true,
	error: {},
};

const postReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case PostActionTypes.GET_POST:
			return {
				...state,
				post: payload,
				loading: false,
			};
		case PostActionTypes.GET_POSTS:
			return {
				...state,
				posts: payload,
				loading: false,
			};
		case PostActionTypes.ADD_POST:
			return {
				...state,
				posts: [payload, ...state.posts],
				loading: false,
			};
		case PostActionTypes.DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== payload),
				loading: false,
			};
		case PostActionTypes.POST_ERROR:
			return {
				...state,
				posts: payload,
				loading: false,
			};
		case PostActionTypes.UPDATE_LIKES:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === payload.id ? { ...post, likes: payload.likes } : post
				),
				loading: false,
			};
		case PostActionTypes.ADD_COMMENT:
			return {
				...state,
				posts: { ...state.post, comments: payload },
				loading: false,
			};
		case PostActionTypes.DELETE_COMMENT:
			return {
				...state,
				post: {
					...state.post,
					comments: state.post.comments.filter(
						(comment) => comment._id !== payload
					),
				},
				loading: false,
			};
		default:
			return state;
	}
};

export default postReducer;
