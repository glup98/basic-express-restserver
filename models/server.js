import express from "express";
import cors from "cors";
import { router } from "../routes/user.routes.js";
import { dbConnection } from "../db/config.db.js";

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userRoutesPath = "/api/users";
    // Conectar a base de datos
    this.dbConnect();
    // Middlewares
    //Funcion que se ejecuta antes de llamar o seguir con alguna peticion
    this.middlewares();

    //Rutas de mi aplicacion
    this.routes();
  }

  async dbConnect() {
    await dbConnection();
  }

  middlewares() {
    //Directorio publico
    this.app.use(express.static("public"));
    // Parseo y lectura del body
    this.app.use(express.json());
    //CORS
    this.app.use(cors());
  }

  routes() {
    this.app.use(this.userRoutesPath, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on:", this.port);
    });
  }
}
