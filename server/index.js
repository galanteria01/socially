// Import section
const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')

const pubsub = new PubSub();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req, pubsub })
})

//Connect to server
mongoose.connect(process.env.MONGO_TOKEN, { useNewUrlParser: true })
	.then(() => {
		return server.listen({ port: 5001 });
	})
	.then(
		res => {
			console.log(`Server is running at ${res.url}`)
		}
	);