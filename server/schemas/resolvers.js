const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('books')

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    // users: async () => {
    //   return User.find()
    //     .select('-__v -password')
    //     .populate('thoughts')
    //     .populate('friends');
    // },
    // user: async (parent, { username }) => {
    //   return User.findOne({ username })
    //     .select('-__v -password')
    //     .populate('friends')
    //     .populate('thoughts');
    // },
    // books: async (parent, { username }) => {
    //   const params = username ? { username } : {};
    //   return Book.find(params).sort({ createdAt: -1 });
    // },
    // book: async (parent, { _id }) => {
    //   return book.findOne({ bookId });
    // }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, args, context) => {

      console.log("saveBook RESOLVER");

      if (context.user) {
        //const book = await Book.create({ ...args, username: context.user.username });

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: args } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    removeBook: async (parent, args, context) => {
        if (context.user) {
            //const book = await Book.delete({ bookId });
    
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: {bookId: args.bookId} } },
              { new: true }
            );
    
            return updatedUser;
          }
    
          throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;