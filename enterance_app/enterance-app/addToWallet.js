/*
 *  SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const path = require('path');

const fixtures = path.resolve(__dirname, '../../crypto-config');

// A wallet stores a collection of identities
const wallet = new FileSystemWallet('./identity/user/jiwon/wallet');

async function addWallet(Barcode) {

    // Main try/catch block
    try {

        // Identity to credentials to be stored in the wallet
        const credPath = path.join(fixtures, 'peerOrganizations/org1.ptunstad.no/users/User1@org1.ptunstad.no');
        const cert = fs.readFileSync(path.join(credPath, '/msp/signcerts/User1@org1.ptunstad.no-cert.pem')).toString();
        const key = fs.readFileSync(path.join(credPath, '/msp/keystore/424cc061e990df87fc49c9ecab0d244be0250fc0f85a5826c01f9a3352278c5a_sk')).toString();

        // Load credentials into wallet
        const identityLabel = 'User1@org1.ptunstad.no';
        const identity = X509WalletMixin.createIdentity('Org1MSP', cert, key);

        const Barcode_num=Barcode;

        await wallet.import(identityLabel, identity); //wallet.import 구문이 끝나기 전에는 밑의 return Barcode가 실행되지 않는다
        
        return Barcode_num
    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
        console.log(error.stack);
    }
}

// addWallet().then(() => {
//     console.log('done');
// }).catch((e) => {
//     console.log(e);
//     console.log(e.stack);
//     process.exit(-1);
// });