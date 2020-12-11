import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import Alert from '../layouts/Alert';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({
			...formData,

			[e.target.email]: e.target.value,
			[e.target.password]: e.target.value,
		});

	const onSubmit = async (e) => {
		e.preventDefault();

		console.log('SUCCESS');
	};

	return (
		<Fragment>
			<div className='container'>
				<Alert />
				<h1 className='large text-primary'>Sign In</h1>
				<p className='lead'>
					<i className='fas fa-user'></i> Sign Into Your Account
				</p>
				<form className='form' onSubmit={(e) => onSubmit(e)}>
					<div className='form-group'>
						<input
							type='email'
							placeholder='Email Address'
							name='email'
							required
							value={email}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							placeholder='Password'
							name='password'
							minLength='6'
							value={password}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<input type='submit' className='btn btn-primary' value='Login' />
				</form>
				<p className='my-1'>
					Don't have an account? <Link to='/register'>Sign Up</Link>
				</p>
			</div>
		</Fragment>
	);
};

export default Login;
