/* main.ts */

/* Initial setup */
import "./setup";

/* Imports */
import cors, { CorsOptions } from "cors";
import express from "express";

import { useCookies } from "@whatwg-node/server-plugin-cookies";
import { createYoga } from "graphql-yoga";

import { schema } from "@models/index";
import { getUserFromRequest } from "@utils/context";

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
  /* Context setter callback */
  context: async ({ request }) => {
    const userId = await getUserFromRequest(request);

    return { userId };
  },
  plugins: [useCookies()],
});

/* Register GraphQL Yoga endpoint */
app.use(yoga.graphqlEndpoint, yoga);

/* Run server */
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
