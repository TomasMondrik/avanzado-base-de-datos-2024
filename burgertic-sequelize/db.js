import "dotenv/config";

export const config = {
   // user: process.env.DB_USER,
   // host: process.env.DB_HOST,
    //database: process.env.DB_NAME,
   // password: process.env.DB_PASSWORD,
    //port: 5432,
   // ssl: true,
    url: "postgresql://burgertic_owner:V43yvkmxXzMS@ep-broad-sun-a5jxy499.us-east-2.aws.neon.tech/burgertic?sslmode=require",
    user: "burgertic_owner",//process.env.DB_USER,
    host: "ep-broad-sun-a5jxy499.us-east-2.aws.neon.tech",//process.env.DB_HOST,
    database: "burgertic",//process.env.DB_NAME,
    password: "V43yvkmxXzMS",//process.env.DB_PASSWORD,
    port: 5432,
    ssl: true
};

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    config.url
);

try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}