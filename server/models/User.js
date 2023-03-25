const { model, Schema } = require('mongoose');

const userSchema = new Schema({
	username: String,
	password: String,
	email: String,
	createdAt: String,
	description: {
		type: String,
		required: false
	}
})

module.exports = model('User', userSchema);