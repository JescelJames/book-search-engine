const typeDefs =`

  type User {
    _id: ID
    username: String!
    email: String!
    

  }


  type Query {
    me: User

  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
  }

`;

module.exports = typeDefs;