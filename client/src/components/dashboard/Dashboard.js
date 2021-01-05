import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile } from '../../redux/profile/profile.actions';

import Spinner from '../layouts/Spinner';
import { DashboardActions } from './DashboardActions';
import Alert from '../layouts/Alert';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
	getCurrentProfile,
	profile: { profile, loading },
	auth: { user },
}) => {
	useEffect(() => {
		getCurrentProfile();
		// eslint-disable-next-line
	}, []);

	return loading && profile == null ? (
		<Spinner />
	) : (
		<Fragment>
			<div className='container'>
				<Alert />
				<h1 className='large text-primary'>Dashboard</h1>
				<p className='lead'>
					<i className='fas fa-user'></i> Welcome {user && user.name}
				</p>
				{profile !== null ? (
					<Fragment>
						<DashboardActions />
						<Experience experience={profile.experience} />
						<Education education={profile.education} />
					</Fragment>
				) : (
					<Fragment>
						<p> You have not yet set up a profile. Please add some info.</p>
						<Link to='/create-profile' className=' btn btn-primary my-1'>
							Create Profile
						</Link>
					</Fragment>
				)}
			</div>
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.authReducer,
	profile: state.profileReducer,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
