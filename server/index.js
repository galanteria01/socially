// Import section
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { PubSub } = require("graphql-subscriptions");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  
});

//Connect to server
mongoose
  .connect(process.env.MONGO_TOKEN)
  .then(async () => {
    return await startStandaloneServer(server, {
      listen: { port: 5001 },
      context: ({ req }) => ({ req, pubsub }),
    });
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  });
