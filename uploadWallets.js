require("dotenv").config();
// const process = require("process");
const { sequelize } = require("./database");
const { mySimpleTunnel, sshOptions } = require("./tunnel");
const mint_keys = require("./walletAddresses");

(async () => {
  try {
    await mySimpleTunnel(sshOptions, 5000);
    await sequelize.authenticate();
    await mint_keys.bulkCreate();
    console.log("connection established");
  } catch (error) {
    console.log(error);
  }
})();
