import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    unique_id: ID!
    name: String
    email: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): String
  }
`;
