const cluster = require("cluster");
const os = require("os");
const { generateVanityAddress } = require("./generateVanityAddress");
const process = require("process");

const exit = (err) => {
  for (const id in cluster.workers) {
    const worker = cluster.workers[id];
    worker?.process.kill();
  }

  if (err) {
    console.error(err);
    process.exit(1);
  }

  process.exit(0);
};
const suffix = "chu";
const caseSensitive = true;
// Default to half your CPUs
const defaultWorkers = os.cpus().length;
let addressesFound = 0;
let addressesFoundArray = [];
/**
 * Parse arguments
 */

if (cluster.isMaster || cluster.isPrimary) {
  let addressesGenerated = 0;
  const numWorkers = Number(defaultWorkers);
  for (let i = 0; i < numWorkers; i++) {
    const childProcess = cluster.fork();
    childProcess.on("message", function (message) {
      if (message.keypair) {
        if (addressesFound < 21) {
          console.log(addressesFound);
          console.log(addressesFoundArray);
          // console.log("Address found!");
          // console.log("Public Key:", message.keypair.publicKey);
          // console.log("Secret Key:", message.keypair.secretKey);
          // console.log("Addresses Checked:", addressesGenerated);
          addressesFoundArray.push({
            publicKey: message.keypair.publicKey,
            secretKey: message.keypair.secretKey,
          });
          addressesFound++;
          addressesGenerated++;
        } else {
          exit();
        }
      } else if (message.incrementCounter) {
        addressesGenerated++;
        // spinner.text = `Generating vanity address (${addressesGenerated.toLocaleString()})`
      }
    });
  }
} else {
  /**
   * Worker Process
   */
  const keypair = generateVanityAddress(suffix, caseSensitive, () => {
    process.send && process.send({ incrementCounter: true });
  });
  if (keypair) {
    process.send &&
      process.send({
        keypair: {
          raw: keypair,
          publicKey: keypair.publicKey.toBase58(),
          secretKey: Buffer.from(keypair.secretKey).toString("hex"),
        },
      });
  }
}

process.stdin.resume();
process.on("exit", exit.bind({}));
process.on("SIGINT", exit.bind({}));
process.on("uncaughtException", exit.bind({}));
