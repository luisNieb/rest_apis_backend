import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Products",
        description:'Api  operations related to products'
      }
    ],
    info: {
        title: 'Rest Api Node.js / Express / TypeScript',
        version: '1.0.0',
        description: 'Api Docs for products'
    }

  },
  apis:['./src/router.ts'] // para agregar mas rutas solo separamos por comas cada ruta
};

const swaggerSpec= swaggerJSDoc(options);
const swaggerUIOptions : SwaggerUiOptions={
  customCss:`
          .topbar-wapper .link{
             
          }
  `
}

export default swaggerSpec