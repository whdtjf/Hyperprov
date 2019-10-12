//SPDX-License-Identifier: Apache-2.0

/*
  This code is based on code written by the Hyperledger Fabric community.
  Original code can be found here: https://github.com/hyperledger/fabric-samples/blob/release/fabcar/query.js
  and https://github.com/hyperledger/fabric-samples/blob/release/fabcar/invoke.js
 */

// call the packages we need
var express       = require('express');        // call express
var app           = express();                 // define our app using express
var bodyParser    = require('body-parser');
var http          = require('http')
var fs            = require('fs');
var Fabric_Client = require('fabric-client');
var path          = require('path');
var util          = require('util');
var os            = require('os');
const { FileSystemWallet, Gateway } = require('fabric-network');
const ccpPath = path.resolve(__dirname, '..', '..', 'first-network', 'connection-org1.json');


module.exports = (function() {
return{
	get_all_enterance: function(req, res){
		try {
			// Create a new file system based wallet for managing identities.
			const walletPath = path.join(process.cwd(), 'wallet');
			const wallet = new FileSystemWallet(walletPath);
			console.log(`Wallet path: ${walletPath}`);
	
			// Check to see if we've already enrolled the user.
			const userExists = await wallet.exists('user1');
			if (!userExists) {
				console.log('An identity for the user "user1" does not exist in the wallet');
				console.log('Run the registerUser.js application before retrying');
				return;
			}
	
			// Create a new gateway for connecting to our peer node.
			const gateway = new Gateway();
			await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
	
			// Get the network (channel) our contract is deployed to.
			const network = await gateway.getNetwork('mychannel');
	
			// Get the contract from the network.
			const contract = network.getContract('enterance_chaincode');
	
			// Evaluate the specified transaction.
			// queryEnterance transaction - requires 1 argument, ex: ('queryEnterance', '0101092')
			// queryAllEnterance transaction - requires no arguments, ex: ('queryAllEnterance')
			const query_responses = await contract.evaluateTransaction('queryAllEnterance');
			console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

			if (query_responses && query_responses.length == 1) {
				if (query_responses[0] instanceof Error) {
					console.error("error from query = ", query_responses[0]);
				} else {
					console.log("Response is ", query_responses[0].toString());
					res.send(query_responses[0].toString())
				}
			} else {
				console.log("No payloads were returned from query");
			}
	
		} catch (error) {
			console.error(`Failed to evaluate transaction: ${error}`);
			process.exit(1);
		}
	},
	add_barcode: function(req, res){
		console.log("submit recording of a enterance catch: ");
		try {

			// Create a new file system based wallet for managing identities.
			const walletPath = path.join(process.cwd(), 'wallet');
			const wallet = new FileSystemWallet(walletPath);
			console.log(`Wallet path: ${walletPath}`);
			// Check to see if we've already enrolled the user.
			const userExists = await wallet.exists('user1');
			if (!userExists) {
				console.log('An identity for the user "user1" does not exist in the wallet');
				console.log('Run the registerUser.js application before retrying');
				return;
			}
	
			// Create a new gateway for connecting to our peer node.
			const gateway = new Gateway();
			await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
	
			// Get the network (channel) our contract is deployed to.
			const network = await gateway.getNetwork('mychannel');
	
			// Get the contract from the network.
			const contract = network.getContract('enterance_chaincode');
	
			// Submit the specified transaction.
			await contract.submitTransaction('recordBarcode', '2', 'JongWha', '2019.09.23', 'North', 'IN');
			console.log('Transaction has been submitted');
	
			// Disconnect from the gateway.
			await gateway.disconnect();
	
		} catch (error) {
			console.error(`Failed to submit transaction: ${error}`);
			process.exit(1);
		}

	},
	get_enterance: function(req, res){

		try {
			// Create a new file system based wallet for managing identities.
			const walletPath = path.join(process.cwd(), 'wallet');
			const wallet = new FileSystemWallet(walletPath);
			console.log(`Wallet path: ${walletPath}`);
	
			// Check to see if we've already enrolled the user.
			const userExists = await wallet.exists('user1');
			if (!userExists) {
				console.log('An identity for the user "user1" does not exist in the wallet');
				console.log('Run the registerUser.js application before retrying');
				return;
			}
	
			// Create a new gateway for connecting to our peer node.
			const gateway = new Gateway();
			await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
	
			// Get the network (channel) our contract is deployed to.
			const network = await gateway.getNetwork('mychannel');
	
			// Get the contract from the network.
			const contract = network.getContract('enterance_chaincode');
	
			// Evaluate the specified transaction.
			// queryEnterance transaction - requires 1 argument, ex: ('queryEnterance', '0101092')
			// queryAllEnterance transaction - requires no arguments, ex: ('queryAllEnterance')
			const query_responses = await contract.evaluateTransaction('queryEnterance', '1');
			console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

			if (query_responses && query_responses.length == 1) {
				if (query_responses[0] instanceof Error) {
					console.error("error from query = ", query_responses[0]);
				} else {
					console.log("Response is ", query_responses[0].toString());
					res.send(query_responses[0].toString())
				}
			} else {
				console.log("No payloads were returned from query");
			}
	
		} catch (error) {
			console.error(`Failed to evaluate transaction: ${error}`);
			process.exit(1);
		}
	},
	update_enterance: function(req, res){
		console.log("changing timestamp of enterance catch: ");

		try {

			// Create a new file system based wallet for managing identities.
			const walletPath = path.join(process.cwd(), 'wallet');
			const wallet = new FileSystemWallet(walletPath);
			console.log(`Wallet path: ${walletPath}`);
			// Check to see if we've already enrolled the user.
			const userExists = await wallet.exists('user1');
			if (!userExists) {
				console.log('An identity for the user "user1" does not exist in the wallet');
				console.log('Run the registerUser.js application before retrying');
				return;
			}
	
			// Create a new gateway for connecting to our peer node.
			const gateway = new Gateway();
			await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
	
			// Get the network (channel) our contract is deployed to.
			const network = await gateway.getNetwork('mychannel');
	
			// Get the contract from the network.
			const contract = network.getContract('enterance_chaincode');
	
			// Submit the specified transaction.
			await contract.submitTransaction('UpdateEnterance', '1', '2020.2.2', 'South', 'IN');
			console.log('Transaction has been submitted');
	
			// Disconnect from the gateway.
			await gateway.disconnect();
	
		} catch (error) {
			console.error(`Failed to submit transaction: ${error}`);
			process.exit(1);
		}

	}

}
})();