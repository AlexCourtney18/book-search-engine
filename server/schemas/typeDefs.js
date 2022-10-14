const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID
    authors: []
    description: String
    title: String
    image: String
    link: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }

  input SaveListInput {
    bookId: ID!
    authors: [{}]!
    description: String!
    title: String!
    image: String!
    link: Int!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: SaveListInput): User!
    removeBook(bookId: String!):User
  }
`;

module.exports = typeDefs;