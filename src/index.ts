// npm install @apollo/server express graphql cors body-parser
import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { buildSchema } from "type-graphql";
import RecipeResolver from "./components/recipe/resolver";
import HelloResolver from "./components/hello/resolver";

interface MyContext {
  token?: String;
}

const { json } = bodyParser;
const app = express();
const httpServer = http.createServer(app);

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver, RecipeResolver],
  });

  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
};
main();
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
