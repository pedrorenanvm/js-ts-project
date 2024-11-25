import { createConnection } from "typeorm";

createConnection()
    .then(() => console.log("Database connection successfully established!"))
    .catch((error) => console.log("Error connecting to database:", error));
