import express from "express";
import cors,{ CorsOptions }  from 'cors'
import morgan from "morgan"
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from "./config/swagger";
import router from "./router";
import db from "./config/db";


export async function connectDB(){
 try {
    await db.authenticate();
    db.sync()
   // console.log("Conexion exitosa a la base de datos");
 } catch (error) {
    console.log(error);
    console.log("Hubo un error al conectar a la base de datos");
 }
}

connectDB() 

//istancia de express
const server= express();

//permitir conexiones
const corsOptions : CorsOptions = {
   
   origin:  function( origin, callback){
      console.log(origin)
          if(origin === process.env.SERVER_URL || origin === process.env.FRONTEND_URL){//desde las variables de entorno
   
             callback(null, true)
          }else{
            console.log("rechazar")
             callback(new Error ("Error de Cors"))
          }
   }
}

server.use(cors(corsOptions));


server.use(morgan('dev'))

//leer datos de formularios
server.use(express.json());

//engloba todos los verbos 
server.use('/api/productos' , router);



//documentacion
server.use('/docs', swaggerUi.serve ,swaggerUi.setup(swaggerSpec))


export default server;






