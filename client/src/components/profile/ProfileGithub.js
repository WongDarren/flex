import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getGithubRepos } from '../../redux/profile/profile.actions';

import Spinner from '../layouts/Spinner';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
	useEffect(() => {
		getGithubRepos(username);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getGithubRepos]);

	return (
		<Fragment>
			<div className='profile-github'>
				<h2 className='text-primary my-1'>Github Repos</h2>
				{repos === null ? (
					<Spinner />
				) : (
					repos.map((repo) => (
						<div key={repo._id} className='repo bg-white p-1 my-1'>
							<div>
								<h4>
									<a
										href={repo.html_url}
										target='_blank'
										rel='noopener noreferrer'
									>
										{repo.name}
									</a>
								</h4>
								<p>{repo.description}</p>
							</div>
							<div>
								<ul>
									<li className='badge badge-primary'>
										Stars: {repo.stargazer_count}
									</li>
									<li className='badge badge-dark'>
										Watchers: {repo.watchers_count}
									</li>
									<li className='badge badge-light'>
										Forks: {repo.forks_count}
									</li>
								</ul>
							</div>
						</div>
					))
				)}
			</div>
		</Fragment>
	);
};

ProfileGithub.propTypes = {
	getGithubRepos: PropTypes.func.isRequired,
	repos: PropTypes.array.isRequired,
	username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	repos: state.profileReducer.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
