const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
const { GraphQLError } = require("graphql");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_TOKEN,
    { expiresIn: "1h" }
  );
};

module.exports = {
  Mutation: {
    async login(_, { username, password }, context, info) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        // throw new UserInputError("Fields are not properly formatted", {
        //   errors,
        // });

        throw new GraphQLError("Fields are not properly formatted", {
          extensions: {
            code: "500",
            errors
          },
        });
      }

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User not found";
        // throw new UserInputError("User doesn't exists", { errors });
        throw new GraphQLError("User doesn't exists", {
          extensions: {
            code: "500",
            errors
          },
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        // throw new UserInputError("Credentials are invalid", { errors });
        throw new GraphQLError("Credentials are invalid", {
          extensions: {
            code: "500",
            errors
          },
        });
      }
      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new GraphQLError("Fields are not properly formatted", {
          extensions: {
            code: "500",
            errors
          },
        });
      }
      const user = await User.findOne({ username });
      if (user) {
        throw new GraphQLError("Username is taken", {
          extensions: {
            code: "500",
            errors: {
              username: "This username is taken",
            },
          },
        });

      }

      hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
