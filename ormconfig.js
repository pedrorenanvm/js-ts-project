require("dotenv").config();

const requiredEnv = ["DB_HOST", "DB_PORT", "DB_USER", "DB_PASS", "DB_NAME"];
requiredEnv.forEach((env) => {
    if (!process.env[env]) {
        console.warn(`Environment variable ${env} is not set.`);
    }
});

module.exports = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: ["src/modules/**/typeorm/entities/*.ts"],
    migrations: ["src/shared/typeorm/migrations/*.ts"],
    cli: {
        migrationsDir: "src/shared/typeorm/migrations",
    },
};
