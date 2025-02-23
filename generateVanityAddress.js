// import { Keypair } from "@solana/web3.js";
const { Keypair } = require("@solana/web3.js");

/**
 * Check if an address matches the given prefix and suffix
 *
 * @returns true if the address matches the criteria
 */
const isValidVanityAddress = (address, suffix, caseSensitive) => {
  const addressToCheck = caseSensitive ? address : address.toLowerCase();
  //   const prefixToCheck = caseSensitive ? prefix : prefix.toLowerCase()
  const suffixToCheck = caseSensitive ? suffix : suffix.toLowerCase();
  return addressToCheck.endsWith(suffixToCheck);
};

/**
 * Generate a vanity address matching the provided prefix and suffix. If a
 * generated address does not match, the function will try again until a valid
 * address is generated.
 *
 * @returns a keypair containing the public and private keys for the vanity address
 */
const generateVanityAddress = (suffix, caseSensitive, incrementCounter) => {
  let keypair = Keypair.generate();

  while (
    !isValidVanityAddress(keypair.publicKey.toBase58(), suffix, caseSensitive)
  ) {
    incrementCounter();
    keypair = Keypair.generate();
  }
  return keypair;
};

module.exports = { generateVanityAddress };
