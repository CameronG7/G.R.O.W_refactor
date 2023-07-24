const { gql } = require('apollo-server-express');

const typeDefs = gql` 
  input bookInput{
    authors: [String]
    description: String
    bookId: ID!
    image: String
    link: String
    title: String
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type User {
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
    all: [User]
  }

  type Mutation {
    login(email: String!, password:String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: bookInput): User
    removeBook(bookId: String!): User
  }

  `;

module.exports = typeDefs