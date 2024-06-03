import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductByID,
  getProducts,
  updateDisponible,
  updateProduct
} from "./handlers/products";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The product name
 *           example: Monitor curvo de 50 pulgadas
 *         price:
 *           type: number
 *           description: The product price
 *           example: 300
 *         disponible:
 *           type: boolean
 *           description: The product availability
 */


/**
 * @swagger
 * /api/productos:
 *    get:
 *       summary: Get a list of products
 *       tags:
 *           - Products
 *       description: Returns a list of products
 *       responses:
 *             200:
 *                 description: Success response
 *                 content:
 *                     application/json:
 *                        schema: 
 *                           type: array
 *                           items:
 *                                $ref: '#/components/schemas/Product'
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/productos/{id}:
 *    get: 
 *       summary: Get product by id
 *       tags: 
 *          - Products
 *       description: Return a product based on its unique id
 *       parameters: 
 *         - in: path
 *           name: id
 *           description: The id of the product
 *           required: true
 *           schema: 
 *              type: integer
 *       responses:
 *         200:
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Product'                       
 *         404:
 *           description: Not found
 *         400:
 *           description: Bad request
 */

router.get(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  handleInputErrors,
  getProductByID
);

/**
 * @swagger
 * /api/productos:
 *   post: 
 *      summary: Cretes a new product 
 *      tags: 
 *         - Products
 *      description: Returns a new record int database
 *      requestBody: 
 *         required: true
 *         content: 
 *           application/json:
 *             schema: 
 *                 type: object
 *                 properties:
 *                       name:
 *                           type: string
 *                           example: "Monitor curvo 40 pulgdas"
 *                       price:
 *                          type: number
 *                          example: 444
 *      responses: 
 *          201:
 *             description: Product created successfully
 *          400:
 *             description: Invalid input parameters
 * 
 * 
 * 
 */

router.post(
  "/",

  body("name").notEmpty().withMessage("nombre dl produto no puede ir vacio"),

  body("price")
    .isNumeric()
    .withMessage("valor no valido")
    .notEmpty()
    .withMessage("nombre dl produto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
  handleInputErrors, //middleware
  createProduct
);

/**
 * @swagger
 * /api/productos/{id}:  
 *   put:
 *      summary: Update product
 *      tags:
 *         - Products
 *      description: Returns the updated product
 *      parameters: 
 *        - in: path
 *          name: id
 *          description: The id of the product to update
 *          required: true
 *          schema: 
 *              type: integer
 *      requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                         name:
 *                             type: string
 *                             example: "Monitor curvo Actualizado 50 pulgadas"
 *                         price:
 *                             type: number
 *                             example: 2999
 *                         disponible:
 *                             type: boolean
 *                             example: true
 *      responses:
 *          200:
 *             description: Successfully updated
 *             content: 
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/Product'        
 *          400:
 *             description: Bad request - invalid parameters
 *          404:
 *             description: Product not found
 */


router.put(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  body("name").notEmpty().withMessage("nombre dl produto no puede ir vacio"),

  body("price")
    .isNumeric()
    .withMessage("valor no valido")
    .notEmpty()
    .withMessage("nombre dl produto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),

  body("disponible")
    .isBoolean()
    .withMessage("valor para disponibilidad no valido"),
  handleInputErrors, //middleware

  updateProduct
);

/**
 * @swagger
 * /api/productos/{id}:  
 *   patch:
 *     summary: Update availability
 *     tags:
 *       - Products
 *     description: Update availability of product
 *     parameters:
 *       - in: path 
 *         name: id
 *         description: The ID of the product to update
 *         required: true
 *         schema: 
 *           type: integer 
 *     
 *     responses:
 *       200:
 *         description: Success response
 *         content: 
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - invalid id or invalid input data
 *       404:
 *         description: Not found
 */


router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  handleInputErrors, //middle handler
  updateDisponible
);

/**
 * @swagger
 * /api/productos/{id}:  
 *   delete:
 *     summary: delete product
 *     tags:
 *       - Products
 *     description: Delete a product
 *     parameters:
 *       - in: path 
 *         name: id
 *         description: The ID of the product to delete
 *         required: true
 *         schema: 
 *           type: integer 
 *     
 *     responses:
 *       200:
 *         description: Success response
 *         content: 
 *           application/json:
 *             schema: 
 *               type: string 
 *               value: 'Product eliminates'
 *       400:
 *         description: Bad request - invalid id or invalid input data
 *       404:
 *         description: Not found
 */

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  handleInputErrors, //middle handler
  deleteProduct
);

export default router;
