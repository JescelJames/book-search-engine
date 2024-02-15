const { User } = require('../models');
const { signToken, AuthenticationError } =  require('../utils/auth');

const resolvers = {

  Query: {
    // By adding context to "me" query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User
          .findOne({ _id: context.user._id});
      }
      throw AuthenticationError;
    }



  },


  // Mutation: {


  // }


};

module.exports = resolvers; 
