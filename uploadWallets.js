require("dotenv").config();
// const process = require("process");
const { sequelize } = require("./database");
const { mySimpleTunnel, sshOptions } = require("./tunnel");
const mint_keys = require("./walletAddresses");

(async () => {
  try {
    await mySimpleTunnel(sshOptions, 5000);
    await sequelize.authenticate();
    await mint_keys.bulkCreate([
        {
          status: '0',
          public_key: '7pL7Yadz1HgJKQGtfFiwgT5yB3oUWdE6KffVEiaibchu',
          private_key: '92455544e17e1c3aa88f1e989e9f71c1a3b61f8a5ee97cce3f6dc48de077f24e654607d1474f71dafdcc55591eb0cc01894a1ed837e28c549a9d555294914870'
        }
      ]);
    console.log("connection established");
  } catch (error) {
    console.log(error);
  }
})();
