const {createTunnel} = require('tunnel-ssh');
const { getLocalIP } = require('./utils');
const h1ost = process.env.SSHOPTIONS_HOST;
const p1ort = process.env.SSHOPTIONS_PORT;
const u1sername = process.env.SSHOPTIONS_USER;
const p1assword = process.env.SSHOPTIONS_PW;
const sshOptions = {
	host: h1ost,
	port: p1ort,
	username: u1sername,
	password: p1assword
};

function mySimpleTunnel(sshOptions, port, autoClose = true){
    let forwardOptions = {
        srcAddr: getLocalIP(),
        srcPort: port,
        dstAddr:'127.0.0.1',
        dstPort: 3306
    }

    let tunnelOptions = {
        autoClose:autoClose
    }
    
    let serverOptions = {
        port: port
    }

    return createTunnel(tunnelOptions, serverOptions, sshOptions, forwardOptions);
}

module.exports = {mySimpleTunnel, sshOptions};