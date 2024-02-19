const { User } = require('../models');
const { signToken, AuthenticationError } =  require('../utils/auth');

const resolvers = {

  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        // const userInfo = await 
        return await User.findOne({ _id: context.user._id });
        // return await User.findOne({ _id: userId });
          // .findOne(context.user._id);
          // return userInfo;
      }
      throw AuthenticationError;
    },

    users: async () => {
      return await User
        .find({});
        
    },

    user: async (_, { userId }) => {
      return await User.findOne({ _id: userId });

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

    saveBook: async (parent, { newBook }, context) => {
      if (context.user) {
        const updateUsersBooks = await 
          User.findOneAndUpdate(
            { _id: context.user._id }, 
            { $addToSet: { savedBooks: newBook }}, 
            { new: true }
          );
        return updateUsersBooks;  
      }
      throw AuthenticationError;
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updateUsersBooks = await 
          User.findOneAndUpdate(
            { _id: context.user._id}, 
            { $pull: { savedBooks: { bookId } } }, 
            { new: true }
          );
        return updateUsersBooks;
      }
      throw AuthenticationError;
    },

    // addBook: async (parent, { userId, newBook }, context) => {
      
    //   // if (context.user) {
    //     return User.findOneAndUpdate(
    //       { _id: userId },
    //       {
    //         $addToSet: { savedBooks: newBook },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   // }
     
    //   throw AuthenticationError;
    // },

  }


};

module.exports = resolvers; 
