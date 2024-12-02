const postsResolvers = require("./posts");
const usersResolver = require("./users");
const commentsResolver = require("./comments");
const likesResolver = require("./likes");

module.exports = {
  Post: {
    likeCount: (parent) => {
      return parent.likes.length;
    },
    commentCount: (parent) => {
      return parent.comments.length;
    },
  },
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolver.Mutation,
    ...likesResolver.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};
