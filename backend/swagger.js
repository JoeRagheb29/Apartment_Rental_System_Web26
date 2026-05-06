const swaggerJSDoc = require("swagger-jsdoc");

const options = {

  definition: {
    openapi: "3.0.0",
    info: {
      title: "Apartment Rental API",
      version: "1.0.0",
      description: "API documentation for Apartment Rental System"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
    
  },
      components: {
  schemas: {
    User: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        role: { type: "string" }
      }
    }
  }
},
  apis: ["./Routes/*.js"], // 👈 important
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;