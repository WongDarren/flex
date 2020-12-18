import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile } from '../../redux/profile/profile.actions';

const Dashboard = ({ getCurrentProfile }) => {
	useEffect(() => {
		getCurrentProfile();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='container'>
			<div>Dashboard</div>
		</div>
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
