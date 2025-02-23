const os = require('os');

function convertToFloat(value, decimals){
    return value / Math.pow(10, decimals);
}

const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    for (const net of interfaces[interfaceName]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address; // Return first non-internal IPv4 address
      }
    }
  }
  return 'No external IPv4 found';
};

const updateBonded = async (data) => {
    const res = await fetch("https://handlers.gochu.fun/updateBondedandMigratedTableandMainTokenList.php", {
        body: JSON.stringify(data),
        method: 'POST'
    });
    console.log(await res.json());
}

function isTransactionUpdateString(str) {
    const regex = /^transaction_updates:([a-zA-Z0-9]+)$/;
    return regex.test(str);
  }
  
  function extractAddress(str) {
    const regex = /^transaction_updates:([a-zA-Z0-9]+)$/;
    const match = str.match(regex);
    return match ? match[1] : null;
  }
  

module.exports = {convertToFloat, getLocalIP, updateBonded, isTransactionUpdateString, extractAddress}