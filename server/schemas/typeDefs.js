const typeDefs =`

  type User {
    _id: ID!
    username: String!
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  input InputBook {
    authors: [String]
    description: String
    bookId: String!
    title: String!
    image: String
    link: String
    
  }


  type Auth {
    token: ID!
    user: User
  }


  type Query {
    me: User
    users: [User]
    user(userId: ID!): User

  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(newBook: InputBook!): User
    addBook(userId: ID!, newBook: InputBook): User
    removeBook(bookId: ID!): User
  }

`;

module.exports = typeDefs;