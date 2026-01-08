import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

console.log("Starting GraphQL server...");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: "http://localhost:3333",
    credentials: true,
  },
});


server.listen({ port: 4000, host: "127.0.0.1" }).then(({ url }) => {
  console.log(`GraphQL Server ready at ${url}`);
});
