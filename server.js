require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress, GraphQLUpload } from "graphql-upload";
import { typeDefs, resolvers } from "./schema.js";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;
const server = new ApolloServer({
  uploads: false,
  typeDefs,
  resolvers,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },
});

const app = express();
app.use("/files", express.static("files"));
app.use(graphqlUploadExpress({ maxFileSize: 100000000000, maxFiles: 110 }));
server.applyMiddleware({ app });
app.listen({ port: PORT }, () => {
  console.log(`🚀Server is running on http://localhost:${PORT} ✅`);
});
