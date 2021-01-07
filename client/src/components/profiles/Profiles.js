import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layouts/Spinner';
import ProfileItem from './ProfileItem';

import { getAllProfiles } from '../../redux/profile/profile.actions';

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
	useEffect(() => {
		getAllProfiles();
	}, [getAllProfiles]);

	return (
		<Fragment>
			<div className='container'>
				{loading ? (
					<Spinner />
				) : (
					<Fragment>
						<h1 className='large text-primary'>Developers</h1>
						<p className='lead'>
							<i className='fab fa-connectdevelop'></i> Browse and Connect with
							developers
						</p>
						<div className='profiles'>
							{profiles.length > 0 ? (
								profiles.map((profile) => (
									<ProfileItem
										key={profile._id}
										profile={profile}
									></ProfileItem>
								))
							) : (
								<h4>No Profiles Found</h4>
							)}
						</div>
					</Fragment>
				)}
			</div>
		</Fragment>
	);
};

Profiles.propTypes = {
	getAllProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ profile: state.profileReducer });

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
