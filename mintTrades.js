const { DataTypes } = require("sequelize");
const { sequelize } = require("./database");

// Define the User model
const mint_trades = sequelize.define("mint_trades", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  token_mint: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  open: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  close: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  high: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  low: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// Sync the model with the database
(async () => {
  await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait for 10 seconds
  await sequelize.sync({ alter: true }); // Creates table if not exists
  console.log("✅Mint trades table synchronized");
})();

module.exports = mint_trades;
