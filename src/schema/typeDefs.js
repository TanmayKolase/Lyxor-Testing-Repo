const { gql } = require('graphql-tag');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String!
    phone: String
    password: String!  # Sensitive field - should not be exposed
    address: String
    dateOfBirth: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User!]!
    getUserByEmail(email: String!): User
    searchUsers(searchTerm: String!): [User!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
  }

  input CreateUserInput {
    email: String!
    name: String!
    phone: String
    password: String!
    address: String
    dateOfBirth: String
  }

  input UpdateUserInput {
    email: String
    name: String
    phone: String
    password: String
    address: String
    dateOfBirth: String
  }
`;

module.exports = { typeDefs };

