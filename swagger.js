import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "W02/W03 CRUD API - Contacts, Authors, and Books",
      version: "1.0.0",
      description:
        "Interactive API documentation built with Swagger. This API includes full CRUD operations for Contacts, Authors, and Books collections.",
      contact: {
        name: "Dylan Rhoton",
        email: "dylan@example.com",
      },
    },
    servers: [
      {
        url: "https://w03-crud-api-0yjb.onrender.com",
        description: "Deployed Render Server",
      },
      {
        url: "http://localhost:8080",
        description: "Local Development Server",
      },
    ],
    tags: [
      { name: "Contacts", description: "Manage contact records" },
      { name: "Authors", description: "Manage author records" },
      { name: "Books", description: "Manage book records" },
    ],
  },
  apis: ["./routes/*.js"], // All route files included
};

const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger Docs available at /api-docs");
}
