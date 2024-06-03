import request from "supertest"
import server ,{connectDB} from "../server"
import db from "../config/db"

/*
describe('Nuestro primer test', () => {
    it('Deve reviar que 1 + 1 =10',() => {
        expect(1+1).toBe(2)

    })
   // test()
})
*/


jest.mock("../config/db")


describe('connectDB', () => {
    it('shol handle  database connection error', async () => {
        //toda dos parametros ,crea una funcion para obserbar el comportamiento del metodo en este caso authenticate
        jest.spyOn(db,'authenticate').mockRejectedValueOnce(new Error('Hubo un error al conectar a la BD'))//se fuerza la la exepción
        const consoleSpy = jest.spyOn(console,"log")

        await connectDB()
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Hubo un error al conectar a la base de datos"))
    }
    )
})