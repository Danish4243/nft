import Web3 from "web3";
import {
  ABI1155,
  ABI721,
  ABIMarket,
  ADDRESS1155,
  ADDRESS721,
  ADDRESSMarket,
} from "../utils/contractData";

import React from "react";
import { toast } from "react-toastify";

var web3 = new Web3(Web3.givenProvider);

let contract721;

contract721 = new web3.eth.Contract(ABI721, ADDRESS721);

let contract1155;

contract1155 = new web3.eth.Contract(ABI1155, ADDRESS1155);

let contractMarket;

contractMarket = new web3.eth.Contract(ABIMarket, ADDRESSMarket);

let sLogin = "no";

// async function loginWithMetaMask() {
//   let nId = await web3.eth.net.getId();
//   if (nId != 5) {
//     userWallet.innerText =
//       "Invalid network please select gorel testnet to continue";
//     return console.log(
//       "invalid network please select gorel testnet to continue"
//     );
//   } else {
//     const sAccounts = await window.ethereum
//       .request({ method: "eth_requestAccounts" })
//       .catch((e) => {
//         console.error(e.message);
//         return;
//       });
//     console.log(sAccounts[0]);
//     if (!sAccounts) {
//       return;
//     } else {
//       loginButton.innerText = "Sign out of MetaMask";
//       userWallet.innerText = sAccounts[0];
//       loginButton.onclick = "signOutOfMetaMask()";

//       loginButton.removeEventListener("click", loginWithMetaMask);
//       setTimeout(() => {
//         loginButton.addEventListener("click", signOutOfMetaMask);
//       }, 200);
//     }
//     sLogin = "yes";
//   }
// }

// function signOutOfMetaMask() {
//   console.log("sign out called");

//   userWallet.innerText = "";
//   loginButton.innerText = "Sign in with MetaMask";

//   loginButton.removeEventListener("click", signOutOfMetaMask);
//   setTimeout(() => {
//     loginButton.addEventListener("click", loginWithMetaMask);
//   }, 200);

//   sLogin = "no";
// }

export async function asset721Details(id) {
  try {
    let info = contractMarket.methods
      ._assetId721(id)
      .call(function (err, oBalance) {
        console.log(oBalance);
        console.log("biddingPrice=" + oBalance.biddingPrice);
        console.log("quantityOnBidding=" + oBalance.quantityOnBidding);
        console.log("quantityOnSale=" + oBalance.quantityOnSale);
        console.log("remainingQuantity=" + oBalance.remainingQuantity);
        console.log("salePrice=" + oBalance.salePrice);
        console.log("tokenType=" + oBalance.tokenType);
        console.log("url=" + oBalance.url);
      });
    return info;
  } catch (err) {
    console.log(err);
  }
}

export async function asset1155Details(id) {
  try {
    let info = contractMarket.methods
      ._assetId1155(id)
      .call(function (err, oBalance) {
        console.log("biddingPrice=" + oBalance.biddingPrice);
        console.log("quantityOnBidding=" + oBalance.quantityOnBidding);
        console.log("quantityOnSale=" + oBalance.quantityOnSale);
        console.log("remainingQuantity=" + oBalance.remainingQuantity);
        console.log("salePrice=" + oBalance.salePrice);
        console.log("tokenType=" + oBalance.tokenType);
        console.log("url=" + oBalance.url);
      });
    return info;
  } catch (err) {
    console.log(err);
  }
}

// async function mintToken() {
//   if (sLogin == "no") {
//     mintTkn.innerText = "please login to continue";
//     return console.log("please login to continue");
//   }

//   try {
//     let sTokenUri = document.getElementById("tokenuri").value;
//     let nQuantity = document.getElementById("quantity").value;

//     // if (!checkInput(sAddress, mintTkn)) { return }
//     // if (!checkInput(nMetaData, mintTkn)) { return }
//     // if (!checkAmount(nMetaData, mintTkn)) { return }
//     // if (!checkAddress(sAddress, mintTkn)) { return }

//     mintTkn.innerText = "";
//     let sAccounts = await web3.eth.getAccounts();
//     let sMsgsender = sAccounts[0];

//     let nGasUsed = await contractMarket.methods
//       .mintUser(sTokenUri, nQuantity)
//       .estimateGas({ from: sMsgsender });
//     alert(
//       "gas used for this transation is " +
//         nGasUsed +
//         " click on confirm in metamask to continue"
//     );

//     contractMarket.methods
//       .mintUser(sTokenUri, nQuantity)
//       .send({ from: sMsgsender })
//       .on("transactionHash", function (sHash) {
//         if (
//           window.confirm(
//             "Your transation hash is" +
//               sHash +
//               "press ok to visit the transation details on ether scan"
//           )
//         ) {
//           window.open(`https://goerli.etherscan.io/tx/${sHash}`);
//         }
//       })
//       .on("receipt", function (receipt) {
//         receiptStatus(receipt);
//       })
//       .catch(function (err) {
//         alert(err.message);
//       });
//   } catch (err) {
//     console.log(err);
//   }
// }

export async function setOnSale(sTokenUri, nPrice, nQuantity) {
  try {
    let sAccounts = await web3.eth.getAccounts();
    let sMsgsender = sAccounts[0];

    let nGasUsed = await contractMarket.methods
      .setOnSale(sTokenUri, nPrice, nQuantity)
      .estimateGas({ from: sMsgsender });
    alert(
      "gas used for this transation is " +
        nGasUsed +
        " click on confirm in metamask to continue"
    );

    contractMarket.methods
      .setOnSale(sTokenUri, nPrice, nQuantity)
      .send({ from: sMsgsender })
      .on("transactionHash", function (sHash) {
        if (
          window.confirm(
            "Your transation hash is" +
              sHash +
              "press ok to visit the transation details on ether scan"
          )
        ) {
          window.open(`https://goerli.etherscan.io/tx/${sHash}`);
        }
      })
      .on("receipt", function (receipt) {
        receiptStatus(receipt);
      })
      .catch(function (err) {
        alert(err.message);
      });
  } catch (err) {
    console.log(err);
  }
}

export async function getMarket721() {
  try {
    let sResult = await contract721.methods.market().call();
    console.log(sResult);
    return sResult;
  } catch (err) {
    console.log(err);
  }
}

export async function getMarket1155() {
  try {
    let sResult = await contract1155.methods.market().call();
    console.log(sResult);
    return sResult;
  } catch (err) {
    console.log(err);
  }
}

export async function getId(tokenUri) {
  try {
    var sUri = tokenUri;
    let val = contractMarket.methods._uriId(sUri).call(function (err, id) {
      console.log(id);
      return id;
    });

    return val;
  } catch (err) {
    console.log(err);
  }
}

export async function getBalance(sAddress) {
  try {
    const accbalance = contractMarket.methods
      ._addressAccumlatedAmount(sAddress)
      .call(function (err, balance) {
        console.log(balance);
        return balance;
      });
    return accbalance;
  } catch (err) {
    console.log(err);
  }
}

export async function approve721() {
  try {
    let sAccounts = await web3.eth.getAccounts();
    let sMsgsender = sAccounts[0];
    let sMarket = await getMarket721();

    let nGasUsed = await contract721.methods
      .setApprovalForAll(sMarket, true)
      .estimateGas({ from: sMsgsender });
    alert(
      "gas used for this transation is " +
        nGasUsed +
        " click on confirm in metamask to continue"
    );

    contract721.methods
      .setApprovalForAll(sMarket, true)
      .send({ from: sMsgsender })
      .on("transactionHash", function (sHash) {
        if (
          window.confirm(
            "Your transation hash is" +
              sHash +
              "press ok to visit the transation details on ether scan"
          )
        ) {
          window.open(`https://goerli.etherscan.io/tx/${sHash}`);
        }
      })
      .on("receipt", function (receipt) {
        receiptStatus(receipt);
      })
      .catch(function (err) {
        alert(err.message);
      });
  } catch (err) {
    console.log(err);
  }
}

export async function approve1155() {
  try {
    let sAccounts = await web3.eth.getAccounts();
    let sMsgsender = sAccounts[0];
    let sMarket = await getMarket1155();

    let nGasUsed = await contract1155.methods
      .setApprovalForAll(sMarket, true)
      .estimateGas({ from: sMsgsender });
    alert(
      "gas used for this transation is " +
        nGasUsed +
        " click on confirm in metamask to continue"
    );

    contract1155.methods
      .setApprovalForAll(sMarket, true)
      .send({ from: sMsgsender })
      .on("transactionHash", function (sHash) {
        if (
          window.confirm(
            "Your transation hash is" +
              sHash +
              "press ok to visit the transation details on ether scan"
          )
        ) {
          window.open(`https://goerli.etherscan.io/tx/${sHash}`);
        }
      })
      .on("receipt", function (receipt) {
        console.log(receipt, "kkkkkkkkkkk");
        // receiptStatus(receipt);
      })
      .catch(function (err) {
        alert(err.message);
      });
  } catch (err) {
    console.log(err);
  }
}

export async function buyNft(sOwner, uri, nAmount) {
  console.log(nAmount, "buypriceeeeee");
  try {
    let sMarket = await getMarket721();

    let sAccounts = await web3.eth.getAccounts();
    let sMsgsender = sAccounts[0];

    let nGasUsed = await contractMarket.methods
      .buyImage(sOwner, uri)
      .estimateGas({
        from: sMsgsender,
        to: sMarket,
        value: web3.utils.toWei(nAmount.toString(), "wei"),
      });
    alert(
      "gas used for this transation is " +
        nGasUsed +
        " click on confirm in metamask to continue"
    );

    await contractMarket.methods
      .buyImage(sOwner, uri)
      .send({
        from: sMsgsender,
        to: sMarket,
        value: web3.utils.toWei(nAmount.toString(), "wei"),
      })
      .on("transactionHash", function (sHash) {
        if (
          window.confirm(
            "Your transation hash is" +
              sHash +
              "press ok to visit the transation details on ether scan"
          )
        ) {
          window.open(`https://goerli.etherscan.io/tx/${sHash}`);
        }
      })
      .on("receipt", function (receipt) {
        receiptStatus(receipt);
      })
      .catch(function (err) {
        alert(err.message);
      });
  } catch (err) {
    console.log(err);
  }
}

// async function checkChange() {
//   window.ethereum.on("accountsChanged", function (sAccounts) {
//     console.log("accountsChanged", sAccounts);
//     alert("Account Changed");
//     location.reload(true);
//   });
//   window.ethereum.on("chainChanged", function (nNetworkId) {
//     console.log("chainChanged", nNetworkId);
//     alert("chain Changed");
//     location.reload(true);
//   });
// }

// function checkAddress(sAddress, sErrorId) {
//   if (!web3.utils.isAddress(sAddress)) {
//     console.log("invalid address");
//     sErrorId.innerText = "invalid address";
//     return false;
//   } else {
//     return true;
//   }
// }

// function checkInput(sInput, sErrorId) {
//   if (sInput.length == 0) {
//     console.log("empty parameter sent");
//     sErrorId.innerText = "empty parameter sent";
//     return false;
//   } else {
//     return true;
//   }
// }

// function checkAmount(nAmount, sErrorId) {
//   if (nAmount <= 0) {
//     console.log("inavalid amount");
//     sErrorId.innerText = "inavalid amount";
//     return false;
//   } else {
//     return true;
//   }
// }

// async function checkMetamask() {
//   let sAccount = await web3.eth.getAccounts();
//   if (sAccount.length == 0) return alert("metaMask not connected");
// }

// function loginCheck() {
//   if (sLogin == "no") {
//     console.log("please login to continue");
//     return false;
//   } else {
//     return true;
//   }
// }

// checkChange();

export function receiptStatus(receipt) {
  if (receipt.status == true) {
    alert(`You have approved ${sSpender} the amount of ${nAmount} token`);
    console.log(receipt);
  } else {
    alert("Transaction reverted due to some technical issues.");
  }
}

export async function isApproved721() {
  let sAccounts = await web3.eth.getAccounts();
  let sOwner = sAccounts[0];
  let sMarket = await getMarket721();
  try {
    let approveStatus = contract721.methods
      .isApprovedForAll(sOwner, sMarket)
      .call(function (err, status) {
        console.log(status);
        return status;
      });
    return approveStatus;
  } catch (err) {
    console.log(err);
  }
}

export async function isApproved1155() {
  let sAccounts = await web3.eth.getAccounts();
  let sOwner = sAccounts[0];
  let sMarket = await getMarket1155();
  console.log(sAccounts, sOwner, sMarket, "hiii");
  try {
    let approveStatus = contract1155.methods
      .isApprovedForAll(sOwner, sMarket)
      .call(function (err, status) {
        console.log(status, "stattssss");
        return status;
      });
    return approveStatus;
  } catch (err) {
    console.log(err, "lplperrorrr");
  }
}

export async function removeFromSale(uri) {
  try {
    let sAccounts = await web3.eth.getAccounts();
    let sMsgsender = sAccounts[0];

    let nGasUsed = await contractMarket.methods
      .removeFromSale(uri)
      .estimateGas({ from: sMsgsender });
    alert(
      "gas used for this transation is " +
        nGasUsed +
        " click on confirm in metamask to continue"
    );

    await contractMarket.methods
      .removeFromSale(uri)
      .send({ from: sMsgsender })
      .on("transactionHash", function (sHash) {
        if (
          window.confirm(
            "Your transation hash is" +
              sHash +
              "press ok to visit the transation details on ether scan"
          )
        ) {
          window.open(`https://goerli.etherscan.io/tx/${sHash}`);
        }
      })
      .on("receipt", function (receipt) {
        receiptStatus(receipt);
      })
      .catch(function (err) {
        alert(err.message);
      });
  } catch (err) {
    console.log(err);
  }
}

export async function getOwner(id) {
  try {
    // var id = document.getElementById("wallet").value;
    const ownerAdd = contract721.methods
      .ownerOf(id)
      .call(function (err, owner) {
        console.log(owner);
        return owner;
      });
    return ownerAdd;
  } catch (err) {
    console.log(err);
  }
}

// export async function getAmount721(sAddress) {
//   try {
//     // var sAddress = document.getElementById("wallet").value;
//     contract721.methods.balanceOf(sAddress).call(function (err, id) {
//       console.log(id);
//       return id;
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

export async function getAmount1155(sAddress, nId) {
  try {
    // var sAddress = document.getElementById("wallet").value;
    const nftBalance = contract1155.methods
      .balanceOf(sAddress, nId)
      .call(function (err, balance) {
        console.log(balance);
        return balance;
      });
    return nftBalance;
  } catch (err) {
    console.log(err);
  }
}

export async function withdrawAccumlatedAmount(nAmount) {
  try {
    let sAccounts = await web3.eth.getAccounts();
    let sMsgsender = sAccounts[0];

    let nGasUsed = await contractMarket.methods
      .withdrawAccumlatedAmount(nAmount)
      .estimateGas({ from: sMsgsender });
    alert(
      "gas used for this transation is " +
        nGasUsed +
        " click on confirm in metamask to continue"
    );

    contractMarket.methods
      .withdrawAccumlatedAmount(nAmount)
      .send({ from: sMsgsender })
      .on("transactionHash", function (sHash) {
        if (
          window.confirm(
            "Your transation hash is" +
              sHash +
              "press ok to visit the transation details on ether scan"
          )
        ) {
          window.open(`https://goerli.etherscan.io/tx/${sHash}`);
        }
      })
      .on("receipt", function (receipt) {
        receiptStatus(receipt);
      })
      .catch(function (err) {
        toast.error(err.message);
        // alert(err.message);
      });
  } catch (err) {
    toast.error(err.message);
    console.log(err.message);
  }
}

const ramdom = () => {
  return <div></div>;
};

export default ramdom;
