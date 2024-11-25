import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import "express-async-errors";
import cors from "cors";
import { errors } from "celebrate";
import AppError from "../errors/AppError";
import routes from "./routes/index.routes";
import { createConnection } from "typeorm";  // Adiciona o createConnection

const app = express();

createConnection().then(() => {
    console.log("Conexão com o banco de dados estabelecida.");

    app.use(cors());
    app.use(express.json());

    app.use(routes);

    app.use(errors());

    app.use(
      (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: "error",
            message: err.message,
          });
        }

        console.error(err);

        return response.status(500).json({
          status: "error",
          message: "Internal server error",
        });
      }
    );

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
}).catch(error => {
    console.error("Erro ao conectar com o banco de dados:", error);
});
