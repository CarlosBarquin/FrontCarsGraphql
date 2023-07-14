import { gql } from "graphql_tag";

export const typeDefs = gql`
  type Car {
    id: ID!
    plate: String!
    brand: String!
    seats: Int!
  }
  type Query {
    test : String!
    getCars: [Car!]!
    getCar(id: ID!): Car
    getCarsbyseats(seats: Int!): [Car!]!
  }

  type Mutation {
    createCar(plate: String!, brand: String!, seats: Int!): Car!
    updateCar(id: ID!, plate: String!, brand: String!, seats: Int!): Car!
    deleteCar(id: ID!): Car!
  }
`;
