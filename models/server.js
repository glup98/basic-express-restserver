import express from "express";
import cors from "cors";
import { userRouter } from "../routes/user.routes.js";
import { authRouter } from "../routes/auth.routes.js";
import { dbConnection } from "../db/config.db.js";

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userRoutesPath = "/api/users";
    this.authPath = "/api/auth/";
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
    //CORS
    this.app.use(cors());
    //Directorio publico
    this.app.use(express.static("public"));
    // Parseo y lectura del body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.authPath, authRouter);
    this.app.use(this.userRoutesPath, userRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on:", this.port);
    });
  }
}
