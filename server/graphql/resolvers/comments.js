const {
  AuthenticationError,
} = require("@apollo/server/errors");
const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");
const { GraphQLError } = require("graphql");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new GraphQLError("Empty Comment", {
          extensions: {
            code: 500,
            errors: {
              body: "Comment body must not be empty",
            },
          },
        });
      }

      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString,
        });
        await post.save();
        return post;
      } else {
        throw new GraphQLError("Post not found", {
          extensions: {
            code: 404,
          },
        });
      }
    },

    deleteComment: async (_, { postId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        if (post.comments[commentIndex].username == username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new GraphQLError("Post not found", {
          extensions: {
            code: 404,
          },
        });
      }
    },
  },
};
