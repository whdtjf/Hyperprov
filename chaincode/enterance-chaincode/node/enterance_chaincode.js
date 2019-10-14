/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Enterance_Chaincode extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const enterance = [
            {
                name: "Jiwon",
                timestamp: "15132",
                location: "east",
                state: "IN",
            },
            {
                name: "YoungChan",
                timestamp: "21323",
                location: "west",
                state: "OUT",
            },
           
        ];

        for (let i = 0; i < enterance.length; i++) {
            enterance[i].docType = 'enterance';
            await ctx.stub.putState(i, Buffer.from(JSON.stringify(enterance[i])));
            console.info('Added <--> ', enterance[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryEnterance(ctx, Barcode) {
        const enteranceAsBytes = await ctx.stub.getState(Barcode); 
        if (!enteranceAsBytes || enteranceAsBytes.length === 0) {
            throw new Error(`${Barcode} does not exist`);
        }
        console.log(enteranceAsBytes.toString());
        return enteranceAsBytes.toString();
    }



    async recordBarcode(ctx, Barcode, name, timestamp, location, state) {
        console.info('============= START : Add Barcode ===========');

        const enterance = {
            name,
            docType: 'enterance',
            timestamp,
            location,
            state,
        };

        await ctx.stub.putState(Barcode, Buffer.from(JSON.stringify(enterance)));
        console.info('============= END : Add Barcode ===========');
    }

    
    async queryHistory(ctx, Barcode) {
    
        const iterator = await ctx.stub.getHistoryForKey(Barcode);
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                console.log(res.value.value.toString('utf8'));
                jsonRes.TxId = res.value.tx_id;
                jsonRes.Timestamp = res.value.timestamp;
                try {
                    jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    jsonRes.Value = res.value.value.toString('utf8');
                }
                allResults.push(jsonRes);
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
      }

    async queryAllEnterance(ctx) {
        const startKey = '0';
        const endKey = '999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }



    async UpdateEnterance(ctx, Barcode, newTimestamp, newLocation, newState) {
        console.info('============= START : UpdateEnterance ===========');

        const enteranceAsBytes = await ctx.stub.getState(Barcode); 
        if (!enteranceAsBytes || enteranceAsBytes.length === 0) {
            throw new Error(`${Barcode} does not exist`);
        }
        const enterance = JSON.parse(enteranceAsBytes.toString());
        enterance.timestamp=newTimestamp;
        enterance.location=newLocation;
        enterance.state=newState;
        await ctx.stub.putState(Barcode, Buffer.from(JSON.stringify(enterance)));
        console.info('============= END : UpdateEnterance ===========');
    }



}

module.exports = Enterance_Chaincode;
