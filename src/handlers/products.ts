//interfaces  de express
import { Request, Response } from "express";
//importamos el modelo
import Product from "../models/Product.model";
import { check, validationResult } from "express-validator";




export const getProducts = async (req: Request, res: Response) => {
   
    try {
        const productos = await Product.findAll({
            order:[['price', 'DESC']],
            attributes:{exclude: ['createdAt','updatedAt']}
          //  attributes:{exclude: ['createdAt','updatedAt', 'disponible']}
        })
        res.json({data: productos});
    } catch (error) {
        console.log(error);
    }
}

export const getProductByID = async (req: Request, res: Response) => {
   
        try {
             const {id} = req.params

             const product= await Product.findByPk(id)
            //
           
             if(!product){
                return res.status(404).json({
                        error: 'Product not found'
                        
                })
             }else{
                res.json({data: product});
             }

        } catch (error) {
            console.log(error);
        }
    }

//crear un producto la funcion debe sen async por que se esta haciendo una cosulta a la base de datos
export const createProduct= async (req: Request,  res :Response) => {

    /*
    await check('name').notEmpty().withMessage('nombre dl produto no puede ir vacio')
            .run(req)

    await check('price')
            .isNumeric().withMessage('valor no valido')
            .notEmpty().withMessage('nombre dl produto no puede ir vacio')
            .custom(value=> value>0).withMessage('Precio no valido')
            .run(req)
    */
    
   try {
        const product= await Product.create(req.body)
        res.status(201).json({data: product})
   } catch (error) {
        console.log(error)
   }
    //en una sola linea 
   
  /*console.log(req.body);
  const producto=  new Product(req.body)
  //esperamos hasta que producto se almacene
  const savedProduct= await producto.save();
  */
  
}

export const updateProduct = async (req:Request, res:Response) => {
     
        try {
                const {id} = req.params
                const product= await Product.findByPk(id)
               
              
                if(!product){
                   return res.status(404).json({
                           error: 'Product not found'
                           
                   })
                }else{
                    res.json({data: product})
                }
                //actualizar en caso que el procuto si exista
                await product.update(req.body)
                await product.save()
   
           } catch (error) {
               console.log(error);
           }
   
}

export const updateDisponible = async (req: Request, res: Response) => {

        try {
                const {id} = req.params
                const product= await Product.findByPk(id)
                
                if(!product){
                   return res.status(404).json({
                           error: 'Product not found'
                           
                   })
                }
                //actualizar en caso que el procuto si exista
                product.disponible= !product.dataValues.disponible
                await product.save()
                res.json({data: product});
                
   
           } catch (error) {
               console.log(error);
           }
}

export const deleteProduct = async (req: Request, res: Response) => {

        try {
                const {id} = req.params
                const product= await Product.findByPk(id)
                
                if(!product){
                   return res.status(404).json({
                           error: 'Product not found'
                           
                   })
                }
                await product.destroy()
                res.json({data: 'Product deleted'})
              
   
           } catch (error) {
               console.log(error);
           }
}