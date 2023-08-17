// Imports ES6 (With mopdules)
import "dotenv/config.js";
import Server from "./models/server.js";
// import express from "express";
// const app = express();

const server = new Server();

server.listen();
