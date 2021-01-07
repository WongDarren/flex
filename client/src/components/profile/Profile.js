import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layouts/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';

import { getProfileById } from '../../redux/profile/profile.actions';

const Profile = ({
	getProfileById,
	profile: { profile, loading },
	auth,
	match,
}) => {
	useEffect(() => {
		getProfileById(match.params.id);
	}, [getProfileById]);

	return (
		<Fragment>
			<div className='container'>
				{profile === null || loading ? (
					<Spinner />
				) : (
					<Fragment>
						<Link to='/profiles' className='btn btn-light'>
							Back to developers
						</Link>
						{auth.isAuthenticated &&
							auth.loading === false &&
							auth.user._id === profile.user._id && (
								<Link to='/edit-profile' className='btn btn-dark'>
									Edit Profile
								</Link>
							)}
						<div class='profile-grid my-1'>
							<ProfileTop profile={profile} />
							<ProfileAbout profile={profile} />
						</div>
					</Fragment>
				)}
			</div>
		</Fragment>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profileReducer,
	auth: state.authReducer,
});

export default connect(mapStateToProps, { getProfileById })(Profile);