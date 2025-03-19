import { authSwagger } from "./auths.swagger.js";
import { cartSwagger } from "./carts.swagger.js";
import { productSwagger } from "./products.swagger.js";
import { userSwagger } from "./users.swagger.js";

export const swaggerDocument = {
  openapi: "3.1.0",
  info: {
    title: "API Teelab",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3002",
      description: "hehe",
    },
    { url: "https://daolucdev.io.vn/api-docs" },
  ],
  components: {
    securitySchemes: {
      teelabToken: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
  },
  paths: {
    ...authSwagger,
    ...productSwagger,
    ...cartSwagger,
    ...userSwagger,
  },
};
