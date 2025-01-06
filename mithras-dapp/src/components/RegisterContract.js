import React, { useState } from 'react';
import algosdk from 'algosdk';

const RegisterContract = () => {
  const [contractDetails, setContractDetails] = useState({
    crop: '',
    quantity: '',
    price: '',
    deliveryLocation: '',
    deliveryDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContractDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const algodServer = process.env.REACT_APP_ALGORAND_SERVER;
      const algodToken = { 'X-API-Key': process.env.REACT_APP_ALGORAND_API_KEY };
      const algodPort = process.env.REACT_APP_ALGORAND_PORT;

      const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
      const txnParams = await algodClient.getTransactionParams().do();

      const senderMnemonic = "YourMnemonicPhrase"; // Replace with secure storage or wallet integration.
      const senderAccount = algosdk.mnemonicToSecretKey(senderMnemonic);

      const note = new TextEncoder().encode(JSON.stringify(contractDetails));
      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: senderAccount.addr,
        to: "ReceiverWalletAddress", // Replace with your dApp's wallet.
        amount: 0,
        note: note,
        suggestedParams: txnParams,
      });

      const signedTxn = txn.signTxn(senderAccount.sk);
      const sendTxn = await algodClient.sendRawTransaction(signedTxn).do();

      alert(`Transaction ID: ${sendTxn.txId}`);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <form>
      <input
        type="text"
        name="crop"
        placeholder="Crop (e.g., coffee)"
        value={contractDetails.crop}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="quantity"
        placeholder="Quantity (e.g., 1 ton)"
        value={contractDetails.quantity}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="price"
        placeholder="Price (e.g., $2000)"
        value={contractDetails.price}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="deliveryLocation"
        placeholder="Delivery Location"
        value={contractDetails.deliveryLocation}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="deliveryDate"
        value={contractDetails.deliveryDate}
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleSubmit}>
        Register Contract
      </button>
    </form>
  );
};

export default RegisterContract;