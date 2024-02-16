const { User } = require('../models');
const { signToken, AuthenticationError } =  require('../utils/auth');

const resolvers = {

  Query: {
    // By adding context to "me" query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        const userInfo = await 
        User
          .findOne({ _id: context.user._id }).select('-__v -password');
          return userInfo;
      }
      throw AuthenticationError;
    },

    users: async () => {
      return await User
        .find({});
        
    },

  },


  Mutation: {
    
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password});
      const token = signToken(user);
      return { token, user }
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (_, { newBook }, context) => {
      if (context.user) {
        const updateUsersBooks = await 
          User.findByIdAndUpdate(
            { _id: context.user._id }, 
            { $push: { savedBooks: newBook }}, 
            { new: true }
          );
        return updateUsersBooks;  
      }
      throw AuthenticationError;
    },

    addBook: async (parent, { userId, newBook }, context) => {
      
      // if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: { savedBooks: newBook },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      // }
     
      throw AuthenticationError;
    },

  }


};

module.exports = resolvers; 
