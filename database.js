const { Sequelize } = require("sequelize");
const { getLocalIP } = require("./utils");
// Create a new Sequelize instance
const database = process.env.DATABASE;
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const sequelize = new Sequelize(database, user, password, {
  host: getLocalIP(),
  port: 5000,
  dialect: "mysql",
});

module.exports = { sequelize };
