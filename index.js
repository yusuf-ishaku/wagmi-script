const { generateVanityAddress } = require("./generateVanityAddress");
const process = require("process");

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

while (addressesFound < 21) {
  const keypair = generateAddress();
  if (keypair) {
    addressesFoundArray.push({
      publicKey: keypair.publicKey.toBase58(),
      secretKey: Buffer.from(keypair.secretKey).toString("hex"),
    });
    addressesFound++;
    console.log(
      `Found ${addressesFound} addresses so far. Total addresses checked: ${addressesGenerated}`
    );
  }
}

console.log("All addresses found:");
console.log(addressesFoundArray);
