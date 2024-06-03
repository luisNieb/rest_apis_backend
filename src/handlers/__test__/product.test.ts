import request from "supertest";
import server from "../../server";
import { response } from "express";

describe("POST /api/productos", () => {
  //precio mayor a cero

  it("should validate that the price is greater that 0", async () => {
    const response = await request(server).post("/api/productos").send({
      name: "Product",
      price: 0
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toHaveLength(1);

    expect(response.status).not.toBe(404);
    expect(response.body.error).not.toHaveLength(2);
  });

  //test para precio mayor a cero y que sea un numero
  it("should validate that the price is a number and greater that 0", async () => {
    const response = await request(server).post("/api/productos").send({
      name: "Product",
      price: "hola"
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toHaveLength(2);

    expect(response.status).not.toBe(404);
    expect(response.body.error).not.toHaveLength(4);
  });

  //test para los campos vacios
  it("should display validation errors", async () => {
    const response = await request(server).post("/api/productos").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toHaveLength(4);

    expect(response.status).not.toBe(404);
    expect(response.body.error).not.toHaveLength(2);
  });

  //prueba  insertar datos
  it("should create a new product", async () => {
    const response = await request(server).post("/api/productos").send({
      name: "Raton -testing",
      price: 150
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/productos", () => {
  it("should check if api/product usl exists", async () => {
    const response = await request(server).get("/api/productos");
    expect(response.status).not.toBe(404);
  });
  it("GET a json with products", async () => {
    const response = await request(server).get("/api/productos");

    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(1);
    expect(response.status).toBe(200);
    expect(response.status).not.toHaveProperty("error");
  });
});

describe("GET /api/productos/:id", () => {
  it("Should return a 404 resonse for a non-existent product", async () => {
    const productId = 2000;
    const response = await request(server).get(`/api/productos/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Product not found");
  });

  it("should check a valid Id in the url", async () => {
    const response = await request(server).get("/api/productos/novalido");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toHaveLength(1);
    expect(response.body.error[0].msg).toBe("ID no valido");
  });

  it("Get JSON  response for a single product", async () => {
    const response = await request(server).get("/api/productos/");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("PUT /api/productos/:id", () => {

  it("should check a valid Id in the url", async () => {
    const response = await  request(server).
                                   put("/api/productos/novalido")
                                  .send({
                                        name: "Monitor curvo -Actualizado 2",
                                        price: 300,
                                        disponible: true

                                        })
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toHaveLength(1);
    expect(response.body.error[0].msg).toBe("ID no valido");
  });


  it("should display validation error messges when updatind product", async () => {
    const response = await request(server).put("/api/productos/2").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBeTruthy();
    expect(response.body.error).toHaveLength(5);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  it("should validate that the price is greater than 0", async () => {
    const response = await request(server).put("/api/productos/1")
                           .send({
                                name: "Monitor curvo -Actualizado 2",
                                price: 0,
                                disponible: true
                              });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBeTruthy();
    expect(response.body.error).toHaveLength(1);
    expect(response.body.error[0].msg).toBe("Precio no valido")

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });


  it("should return a 404 reponse for a non-existent product", async () => {
    const response = await request(server).put("/api/productos/444")
                           .send({
                                name: "Monitor curvo -Actualizado 2",
                                price: 3333,
                                disponible: true
                              });

    expect(response.status).toBe(404);
   
    expect(response.body.error).toBe("Product not found")

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });


  it("should update an existing product with valid data", async () => {

   
    const response = await request(server).put("/api/productos/1").send({
                                name: "Monitor curvo -Actualizado si se va",
                                price: 333,
                                disponible: true
                              });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  
    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("error");
  });


});

describe("PATCH /api/productos/:id", () => {
     it("should return a 404 response for a non-existing" , async () => {
      const productId=2000
      const response = await request(server).patch(`/api/productos/${productId}`)
      expect(response.status).toBe(404)
      expect(response.body.error).toBe("Product not found")
      expect(response.status).not.toBe(200)
      expect(response.body).not.toHaveProperty("data") 
        }
    )

    it("should update the product availability" , async () => {
      
      const response = await request(server).patch("/api/productos/1")
      expect(response.status).toBe(200)
      expect(response.body.error).not.toBe("Product not found")
      expect(response.status).not.toBe(404)
      expect(response.status).not.toBe(400)
      expect(response.body).toHaveProperty("data") 
        }
    )



})
describe("DELETE /api/productos/:id",() =>{
    it("should check a valida ID",async() =>{
        const response = await request(server).delete("/api/productos/noValido")
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error[0].msg).toBe("ID no valido")

    })
    it('should return a 404 response for a non -existent product', async () =>{
      const productID=2000
       const response = await request(server).delete(`/api/productos/${productID}`)
       expect(response.status).toBe(404);
       expect(response.body.error).toBe("Product not found")
        expect(response.status).not.toBe(200)
    })

    it('should delete', async () =>{
      const response = await request(server).delete(`/api/productos/1`)
      expect(response.status).toBe(200)
      expect(response.body.data).toBe("Product deleted")
      expect(response.status).not.toBe(400)
    })
    }
  )


