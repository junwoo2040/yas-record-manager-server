import "./setup";

/* Imports */
import express from "express";
import cors, { CorsOptions } from "cors";

import { createYoga } from "graphql-yoga";
import { schema } from "@models/index";

/* Load environment variables */
const port = process.env.PORT;
const origin = process.env.ORIGINS;

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
const yoga = createYoga({ schema });

/* Register GraphQL Yoga endpoint */
app.use(yoga.graphqlEndpoint, yoga);

/* Run server */
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
