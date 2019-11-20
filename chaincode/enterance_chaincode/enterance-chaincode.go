// SPDX-License-Identifier: Apache-2.0

/*
  Sample Chaincode based on Demonstrated Scenario

 This code is based on code written by the Hyperledger Fabric community.
  Original code can be found here: https://github.com/hyperledger/fabric-samples/blob/release/chaincode/fabcar/fabcar.go
 */

 package main


 import (
	 "bytes"
	 "encoding/json"
	 "fmt"
	 
 
	 "github.com/hyperledger/fabric/core/chaincode/shim"
	 sc "github.com/hyperledger/fabric/protos/peer"
 )
 
 // Define the Smart Contract structure
 type SmartContract struct {
 }
 

 type Enterance struct {
	 Name string `json:"name"`
	 Timestamp string `json:"timestamp"`
	 Location string `json:"location"`
	 State string `json:"state"`
 }

 func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	 return shim.Success(nil)
 }
 

 func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {
 
	 // Retrieve the requested Smart Contract function and arguments
	 function, args := APIstub.GetFunctionAndParameters()
	 // RGENETRATEDe to the appropriate handler function to interact with the ledger
	 if function == "queryEnterance" {
		 return s.queryEnterance(APIstub, args)
	 } else if function == "initLedger" {
		 return s.initLedger(APIstub)
	 } else if function == "recordBarcode" {
		 return s.recordBarcode(APIstub, args)
	 } else if function == "queryAllEnterance" {
		 return s.queryAllEnterance(APIstub)
	 } else if function == "UpdateEnterance" {
		return s.UpdateEnterance(APIstub, args)
	} else if function == "queryHistory" {
		return s.queryHistory(APIstub, args)
	}
 
	 return shim.Error("Invalid Smart Contract function name.")
 }
 

 func (s *SmartContract) queryEnterance(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
 
	 if len(args) != 1 {
		 return shim.Error("Incorrect number of arguments. Expecting 1") //query by name
	 }
 
	 enteranceAsBytes, _ := APIstub.GetState(args[0])
	 if enteranceAsBytes == nil {
		 return shim.Error("Could not query Enterance")
	 }
	 return shim.Success(enteranceAsBytes)
 }
 

 func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {
	 enterance := []Enterance{
		 Enterance{Name: "JiWon", Timestamp: "2019.11.20", Location: "GATE_A", State: "GENERATED"},
		 Enterance{Name: "YoungChan", Timestamp: "2019.11.20", Location: "GATE_A", State: "GENETRATED"},
		 Enterance{Name: "person_A", Timestamp: "2019.11.20", Location: "GATE_A", State: "GENETRATED"},
		 Enterance{Name: "person_B", Timestamp: "2019.11.20", Location: "GATE_B", State: "GENETRATED"},
		 Enterance{Name: "person_C", Timestamp: "2019.11.20", Location: "GATE_B", State: "GENETRATED"},
		 Enterance{Name: "person_D", Timestamp: "2019.11.20", Location: "GATE_B", State: "GENETRATED"},
		 Enterance{Name: "person_E", Timestamp: "2019.11.20", Location: "GATE_B", State: "GENETRATED"},
		 Enterance{Name: "person_F", Timestamp: "2019.11.20", Location: "GATE_B", State: "GENETRATED"},
		 Enterance{Name: "person_G", Timestamp: "2019.11.20", Location: "GATE_B", State: "GENETRATED"},
	 }

	 nfc_key := [...]string{"dccaa283","d5a5a7c3","a924a283","464da283","f14da7c3","853da7c3","cb02a783","0ad8a283","6e7fa6c3"}

	 i := 0
	 for i < len(enterance) {
		 fmt.Println("i is ", i)
		 enteranceAsBytes, _ := json.Marshal(enterance[i])
		 APIstub.PutState(nfc_key[i], enteranceAsBytes)
		 fmt.Println("Added", enterance[i])
		 i = i + 1
	 }
 
	 return shim.Success(nil)
 }
 

 func (s *SmartContract) recordBarcode(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
 
	 if len(args) != 5 {
		 return shim.Error("Incorrect number of arguments. Expecting 4")
	 }
 
	 var enterance = Enterance{ Name: args[1], Timestamp: args[2], Location: args[3], State: args[4]}
 
	 enteranceAsBytes, _ := json.Marshal(enterance)
	 err := APIstub.PutState(args[0], enteranceAsBytes)
	 if err != nil {
		 return shim.Error(fmt.Sprintf("Failed to record Enterance: %s", args[0]))
	 }
 
	 return shim.Success(nil)
 }

 func (s *SmartContract) queryAllEnterance(APIstub shim.ChaincodeStubInterface) sc.Response {

	startKey := ""
	endKey := ""

	resultsIterator, err := APIstub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add comma before array members,suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- queryAllEnterance:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}
 
func (s *SmartContract) UpdateEnterance(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 4 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	enteranceAsBytes, _ := APIstub.GetState(args[0])
	if enteranceAsBytes == nil {
		return shim.Error("Could not locate Enterance")
	}
	enterance := Enterance{}

	json.Unmarshal(enteranceAsBytes, &enterance)

	enterance.Timestamp = args[1]
	enterance.Location=args[2]
	enterance.State=args[3]
	enteranceAsBytes, _ = json.Marshal(enterance)
	err := APIstub.PutState(args[0], enteranceAsBytes)
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to change Enterance time: %s", args[0]))
	}

	return shim.Success(nil)
}


func (s *SmartContract) queryHistory(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	barcodeName := args[0]
	resultsIterator, err := APIstub.GetHistoryForKey(barcodeName)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing historic values for the marble
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"TxId\":")
		buffer.WriteString("\"")
		buffer.WriteString(response.TxId)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Value\":")
	
		if response.IsDelete {
			buffer.WriteString("null")
		} else {
			buffer.WriteString(string(response.Value))
		}

		// buffer.WriteString(", \"Timestamp\":")
		// buffer.WriteString("\"")
		// buffer.WriteString(time.Unix(response.Timestamp.Seconds, int64(response.Timestamp.Nanos)).String())
		// buffer.WriteString("\"")

		// buffer.WriteString(", \"IsDelete\":")
		// buffer.WriteString("\"")
		// buffer.WriteString(strconv.FormatBool(response.IsDelete))
		// buffer.WriteString("\"")

		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	return shim.Success(buffer.Bytes())
}


 func main() {
 
	 // Create a new Smart Contract
	 err := shim.Start(new(SmartContract))
	 if err != nil {
		 fmt.Printf("Error creating new Smart Contract: %s", err)
	 }
 }

