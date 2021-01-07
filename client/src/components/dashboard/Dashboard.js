import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile } from '../../redux/profile/profile.actions';
import { deleteAccount } from '../../redux/auth/auth.actions';

import Spinner from '../layouts/Spinner';
import { DashboardActions } from './DashboardActions';
import Alert from '../layouts/Alert';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
	getCurrentProfile,
	deleteAccount,
	profile: { profile, loading },
	auth: { user },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

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
						<div className='my-2'>
							<button
								className='btn btn-danger'
								onClick={() => deleteAccount()}
							>
								<i className='fas fa-user-minus'></i> Delete My Account
							</button>
						</div>
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
	deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.authReducer,
	profile: state.profileReducer,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard
);
