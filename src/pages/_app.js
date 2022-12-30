import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/configureStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { getCookie, removeCookies } from "cookies-next";
import { useRouter } from "next/router";
import { Box } from "@material-ui/core";
import Web3 from "web3";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});

  // const web3Handler = async () => {
  //   const accounts = await window.ethereum.request({
  //     method: "eth_requestAccounts",
  //   });
  //   setAccount(accounts[0]);
  //   // Get provider from Metamask
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   // Set signer
  //   const signer = provider.getSigner();

  //   window.ethereum.on("chainChanged", (chainId) => {
  //     window.location.reload();
  //   });

  //   window.ethereum.on("accountsChanged", async function (accounts) {
  //     setAccount(accounts[0]);
  //     await web3Handler();
  //   });
  //   loadContracts(signer, accounts[0]);
  // };

  // const loadContracts = async (signer, metaAccount) => {
  //   // Get deployed copies of contracts
  //   const marketplace = new ethers.Contract(
  //     MarketplaceAddress.address,
  //     MarketplaceAbi.abi,
  //     signer
  //   );
  //   setMarketplace(marketplace);
  //   const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
  //   const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  //   const list = await new web3.eth.Contract(NFTAbi.abi, NFTAddress.address);
  //   const count = await list.methods
  //     .balanceOf("0xadc4971cd642b8638affd41cb215532901f5c9f8")
  //     .call();

  //   setNFT(nft);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   async function listenMMAccount() {
  //     window.ethereum.on("accountsChanged", async function () {
  //       // Time to reload your interface with accounts[0]!
  //       try {
  //         const accounts = await window.ethereum.request({
  //           method: "eth_requestAccounts",
  //         });
  //         if (accounts.length) {
  //           const add = getCookie("walletAdd");
  //           if (add != accounts[0]) {
  //             console.log(accounts[0]);
  //             toast.error("Invalid wallet address");
  //             // removeCookies("token");
  //             // router.replace("/login");
  //           }
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     });
  //   }
  //   // listenMMAccount();
  //   web3Handler();
  // }, []);

  return (
    <Provider store={store}>
      <Component
        {...pageProps}
        nft={nft}
        marketplace={marketplace}
        account={account}
      />
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
