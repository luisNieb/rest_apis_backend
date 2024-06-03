import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config()//para poder usar las variables de entorno

const db = new Sequelize(process.env.DATABASE_URL,{
    models:[__dirname + "/../models/**/*"],//buscara lo modelos que tengamos en la carpeta models para agreagarlos a la base de datos
    logging: false,
    dialectOptions:{
        ssl:{
            require:false
        }
    }
})

export default db