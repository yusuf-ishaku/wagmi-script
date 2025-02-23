require("dotenv").config();
const { generateVanityAddress } = require("./generateVanityAddress");
// const process = require("process");
// const { sequelize } = require("./database");
// const { mySimpleTunnel, sshOptions } = require("./tunnel");
// const mint_keys = require("./walletAddresses");
const fs = require('fs');

const suffix = "chu";
const caseSensitive = true;

let addressesFound = 0;
let addressesFoundArray = [];
let addressesGenerated = 0;

// Define a helper to generate a single vanity address.
function generateAddress() {
  // The callback is invoked (potentially repeatedly) during the generation process.
  // Here, we use it to increment a counter for each attempt.
  const keypair = generateVanityAddress(suffix, caseSensitive, () => {
    addressesGenerated++;
  });
  // Count the final (successful) attempt as well.
  addressesGenerated++;
  return keypair;
}

while (addressesFound < 1) {
  const keypair = generateAddress();
  if (keypair) {
    addressesFoundArray.push({
      status: "0",
      public_key: keypair.publicKey.toBase58(),
      private_key: Buffer.from(keypair.secretKey).toString("hex"),
    });
    addressesFound++;
    console.log(
      `Found ${addressesFound} addresses so far. Total addresses checked: ${addressesGenerated}`
    );
  }
}

(async () => {
try {
    let existingAddresses = [];
    if (fs.existsSync('addressesFoundArray.json')) {
        const data = fs.readFileSync('addressesFoundArray.json');
        existingAddresses = JSON.parse(data);
    }
    const mergedAddresses = existingAddresses.concat(addressesFoundArray);
    fs.writeFileSync('addressesFoundArray.json', JSON.stringify(mergedAddresses, null, 2));
    console.log("connection established and addresses written to addressesFoundArray.json");
} catch (error) {
    console.log(error);
}
})();
console.log(addressesFoundArray);
