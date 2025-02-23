// worker.js
const { parentPort, workerData } = require("worker_threads");
const { generateVanityAddress } = require("./generateVanityAddress");

const { suffix, caseSensitive } = workerData;

const keypair = generateVanityAddress(suffix, caseSensitive, () => {
  // Send an update back to the parent for every candidate generated
  parentPort.postMessage({ incrementCounter: true });
});

if (keypair) {
  parentPort.postMessage({
    keypair: {
      // Return the full keypair info
      raw: keypair,
      publicKey: keypair.publicKey.toBase58(),
      secretKey: Buffer.from(keypair.secretKey).toString("hex")
    }
  });
}
