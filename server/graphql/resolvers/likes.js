const { GraphQLError } = require("graphql");
const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Mutation: {
    likePost: async (_, { postId }, context) => {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // Post already liked
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // Not liked yet
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
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
  },
};
