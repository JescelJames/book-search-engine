const typeDefs =`

  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
  }

  input InputBook {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]

  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(newBook: InputBook!): User
    addBook(userId: ID!, newBook: InputBook): User
  }

`;

module.exports = typeDefs;