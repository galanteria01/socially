const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

module.exports = (context) => {
	const authHeader = context.req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split("Bearer ")[1];
		if (token) {
			try {
				const user = jwt.verify(token, process.env.SECRET_TOKEN);
				return user
			} catch (err) {
				throw new AuthenticationError('Invalid/Expire Token');
			}
		}

		throw new Error("Authentication token must be 'Bearer [token]' ")
	}

	throw new Error("Authorisation header must be provided ");
}