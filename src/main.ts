/* main.ts */

/* Initial setup */
import "./setup";

/* Imports */
import express from "express";
import cors, { CorsOptions } from "cors";

import { createYoga } from "graphql-yoga";
import { schema } from "@models/index";
import { useCookies } from "@whatwg-node/server-plugin-cookies";
import { verify } from "jsonwebtoken";

/* Load environment variables */
const port = process.env.PORT;
const origin = process.env.ORIGINS?.split(",");

/* Initialize express server */
const app = express();

/* Middlewares */

/* Create CORS config */
const options: CorsOptions = { origin };

/* Register CORS middleware */
app.use(cors(options));

/* Endpoints */

/* GraphQL */
/* Create GraphQL Yoga */
const yoga = createYoga({
  schema,
  plugins: [useCookies()],
});

/* Register GraphQL Yoga endpoint */
app.use(yoga.graphqlEndpoint, yoga);

/* Run server */
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
