const { Worker } = require("worker_threads");
const os = require("os");
const suffix = "chu";
const caseSensitive = true;
const numWorkers = os.cpus().length;
let addressesGenerated = 0;
let addressesFound = 0;
let addressesFoundArray = [];
const workers = [];

// Start worker threads for generating the vanity address.
for (let i = 0; i < numWorkers; i++) {
  const worker = new Worker("./worker.js", {
    workerData: { suffix, caseSensitive },
  });
  workers.push(worker);
  worker.on("message", (message) => {
    if (message.keypair ) {
      if (addressesFound < 21) {
        console.log(addressesFound);
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
        // Terminate all workers once the address is found.
        console.log(addressesFoundArray);
        workers.forEach((w) => w.terminate());
      }
    } else if (message.incrementCounter) {
      addressesGenerated++;
      console.log("Addresses Generated:", addressesGenerated);
    }
  });
}
