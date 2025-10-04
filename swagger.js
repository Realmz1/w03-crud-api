import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "W03 CRUD API",
      version: "1.0.0",
      description: "API Documentation for Authors and Books collections",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
      {
        url: "https://YOUR-RENDER-APP.onrender.com" // replace with your Render link later
      }
    ],
  },
  apis: ["./routes/*.js"], // Path to the route files
};

const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger Docs available at /api-docs");
}
