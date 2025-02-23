const { DataTypes } = require("sequelize");
const { sequelize } = require("./database");

// Define the User model
const mint_keys = sequelize.define("mint_keys", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  private_key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  public_key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the model with the database
(async () => {
  await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait for 10 seconds
  await sequelize.sync({ alter: true }); // Creates table if not exists
  console.log("✅Mint keys table synchronized");
})();

module.exports = mint_keys;
