import express from "express";
import cors from "cors";
import { router } from "../routes/user.routes.js";

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userRoutesPath = "/api/user";

    // Middlewares
    //Funcion que siempre se va ejecutar cuando se levante el servidor
    this.middlewares();

    //Rutas de mi aplicacion
    this.routes();
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
