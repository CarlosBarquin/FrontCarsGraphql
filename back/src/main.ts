import { ApolloServer } from "npm:@apollo/server@^4.1";
import { startStandaloneServer } from "npm:@apollo/server@^4.1/standalone";
;

import { typeDefs } from "./schema.ts";
import { Mutation } from "./resolvers/mutation.ts";
import { Query } from "./resolvers/query.ts";
const resolvers = {
  Mutation,
  Query
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  includeStacktraceInErrorResponses: false,
});

console.log("Starting server on http://localhost:8080");
const { url } = await startStandaloneServer(server, {
  listen: { port: 8080 },
});
console.log(`Server ready at ${url}`);