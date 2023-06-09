import React, { useContext } from 'react'
import { AuthContext } from '../context/auth';
import { Container } from 'semantic-ui-react';

const UserProfile = () => {
	const { user } = useContext(AuthContext);
	return (
		<Container>
			<h2 className="ui center aligned icon header">
				<i className="circular users icon"></i>
				{user.username}
			</h2>
		</Container>
	)
}

export default UserProfile
