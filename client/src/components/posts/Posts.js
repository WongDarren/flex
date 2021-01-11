import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPosts } from '../../redux/post/post.actions';

import Spinner from '../layouts/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import Alert from '../layouts/Alert';

const Posts = ({ getPosts, post: { posts, loading } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<div className='container'>
						<Alert />
						<h1 className='large text-primary'>Posts</h1>
						<p className='lead'>
							<i className='fas fa-user'></i> Welcome to the community
						</p>
						<PostForm />
						<div className='posts'>
							{posts.map((post) => (
								<PostItem key={post._id} post={post} />
							))}
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ post: state.postReducer });

export default connect(mapStateToProps, { getPosts })(Posts);
