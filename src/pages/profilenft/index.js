import {
  Box,
  Button,
  capitalize,
  CardMedia,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import {
  getNfts,
  getNfts_ById,
  imageUpload,
  tempData,
  updateNft,
  updateProfile,
} from "../../redux/actions";
import { Tab, Tabs, Tooltip } from "@mui/material";
import { Header, Loader } from "../../components";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { LoadingButton, TabContext, TabPanel } from "@mui/lab";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import Web3 from "web3";
import { isNumber } from "../../utils/validations";
import { toast } from "react-toastify";
import {
  getBalance,
  isApproved1155,
  isApproved721,
  withdrawAccumlatedAmount,
} from "../ramdom";
import {
  ABI1155,
  ABI721,
  ADDRESS1155,
  ADDRESS721,
} from "../../utils/contractData";

const ProfileNft = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [bannerImage, setbannerImage] = useState("");
  const [userImage, setuserImage] = useState("");
  const [imageType, setimageType] = useState("");
  const [toolTipMessage, setToolTipMessage] = useState("Copy wallet address.");
  const [userData, setuserData] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState("1");
  const [accBalance, setaccBalance] = useState("");
  const [isapprove1155, setisapprove1155] = useState(false);
  const [isapprove721, setisapprove721] = useState(false);

  var web3 = new Web3(Web3.givenProvider);
  let contract1155 = new web3.eth.Contract(ABI1155, ADDRESS1155);
  let contract721 = new web3.eth.Contract(ABI721, ADDRESS721);

  const nftData = useSelector((state) => state.nftReducer.nftData);
  const temporaryData = useSelector((state) => state.authReducer.tempData);
  const walletAddress = useSelector((state) => state.authReducer.walletAddress);

  // ---- for tab  -------//
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // ------------------------------------------//

  // ----- to check approval from marketplace for 721 and 1155 ------//
  useEffect(() => {
    approval();
  }, []);

  const approval = async () => {
    let ap1155 = await isApproved1155();
    let ap721 = await isApproved721();
    setisapprove1155(ap1155);
    setisapprove721(ap721);
  };
  // --------------------------------------------------------//

  // ---------- to change profile and banner image from backend ----
  useEffect(() => {
    const img = temporaryData?.uploadedImage?.image;
    if (img) {
      if (imageType == "1") {
        setbannerImage(img);
        let body = {
          backGroundImage: img,
        };
        dispatch(updateProfile.request(body));
      } else if (imageType == "2") {
        setuserImage(img);
        let body = {
          image: img,
        };
        dispatch(updateProfile.request(body));
      }
    }
  }, [temporaryData]);

  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    dispatch(imageUpload.request(formData));
  };
  // -------------------------------------------------//

  //-------- get nfts data from backend ----------
  useEffect(() => {
    dispatch(getNfts.request());
    const data = getCookie("userData");
    setuserData(JSON.parse(data));
    setuserImage(JSON.parse(data)?.image);
    setbannerImage(JSON.parse(data)?.backGroundImage);
  }, []);
  //----------------------------------------------//

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(walletAddress);
    setToolTipMessage("Copied to clipboard.");
    setTimeout(() => {
      setToolTipMessage("Copy wallet address.");
    }, 2000);
  };

  const onClickNft = (item) => {
    let body = {
      nftId: item,
    };
    dispatch(tempData.updateTempData(body));
    router.push({
      pathname: `/nftdetail`,
      query: { nftId: item?._id },
    });
  };

  // ------check balance and withdraw balance from smart contract -----//
  const onWithdrawBalance = () => {
    let address = walletAddress ? walletAddress : "";
    withdrawAccumlatedAmount(accBalance);
    onBalanceCheck();
  };

  const onBalanceCheck = async () => {
    let address = walletAddress ? walletAddress : "";
    let balance = await getBalance(address);
    setaccBalance(balance);
  };
  // -------------------------------------------------//

  // ---- to get approval for 1155 marketplace and get marketaddress from smart contract ------//
  const onApprovalFunc = () => {
    approve1155();
    let body = {
      isApproval: true,
    };
  };

  async function getMarket1155() {
    try {
      let sResult = await contract1155.methods.market().call();
      console.log(sResult);
      return sResult;
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  }

  async function approve1155() {
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
          approval();
          // receiptStatus(receipt);
        })
        .catch(function (err) {
          toast.error(err.message);
        });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }
  // ----------------------------------------------------------- //

  // ---- to get approval for 721 marketplace and get marketaddress from smart contract ------//
  const onApproval721Func = () => {
    approve721();
  };

  async function getMarket721() {
    try {
      let sResult = await contract721.methods.market().call();
      console.log(sResult);
      return sResult;
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  async function approve721() {
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
          approval();
        })
        .catch(function (err) {
          toast.error(err.message);
          // alert(err.message);
        });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }
  // -------------------------------------------------------------- //

  return (
    <Box className="prnft_wrp ">
      <Header />
      {/* <Loader isLoad={loading} /> */}
      <Box className="upload_main">
        <Box className={bannerImage ? "upload_bg" : "upload_bg sm_hght"}>
          <label htmlFor="icon-button-file">
            <img src={bannerImage || "/static/images/ETH.svg"} alt="" />
            <TextField
              inputProps={{
                accept: "image/jpeg, image/jpg, image/png",
              }}
              id="icon-button-file"
              type="file"
              sx={{ display: "none" }}
              onChange={(val) => {
                setimageType(1);
                const files = val.target;
                const file = files.files[0];
                uploadImage(file);
              }}
            />
          </label>
        </Box>

        <Box className="pre_file">
          <Box className="pre_file_inr">
            <label className="upload_lbl" htmlFor="icon-button-file-user">
              <img src={userImage || "/static/images/dummy.png"} alt="" />
              <TextField
                inputProps={{
                  accept: "image/jpeg, image/jpg, image/png",
                }}
                id="icon-button-file-user"
                type="file"
                sx={{ display: "none" }}
                onChange={(val) => {
                  setimageType(2);
                  const files = val.target;
                  const file = files.files[0];
                  uploadImage(file);
                }}
              />
            </label>
          </Box>
        </Box>
      </Box>
      <Box className="conta_iner">
        <Box className="content">
          <h2>{userData?.firstName + " " + userData?.lastName}</h2>
          <Box className="cnt_fdx">
            <Box className="lft_d">
              <figure>
                <img src="/static/images/ETH.svg"></img>
              </figure>
              {userData?.walletAddress && (
                <>
                  <Tooltip title={toolTipMessage}>
                    <button
                      className="ethkey"
                      onClick={copyToClipBoard}
                      sx={{ color: "#fff", mr: 1, cursor: "pointer" }}
                      color={"#fff"}
                    >
                      {userData?.walletAddress}
                    </button>
                  </Tooltip>
                </>
              )}

              <span>
                {"Joined " + dayjs(userData?.createdAt)?.format("MMMM YYYY")}
              </span>
            </Box>
            <Box className="ryt_d">
              <Button>
                <ShareIcon />
              </Button>
              <Button>
                <MoreHorizIcon />
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className="btn_wpr">
          <Box className="btn ">
            <LoadingButton
              type="submit"
              variant="contained"
              className="btn_sc"
              onClick={() => {
                onBalanceCheck();
              }}
            >
              Check Balance
            </LoadingButton>
          </Box>

          {accBalance ? (
            <Box>
              <p>
                Current Balance <span>{accBalance}</span>
              </p>
            </Box>
          ) : (
            <></>
          )}

          <Box className="btn ">
            <LoadingButton
              type="submit"
              variant="contained"
              className="btn_sc"
              onClick={() => {
                onWithdrawBalance();
                // setaccBalance("100");
              }}
            >
              Withdrawl Balance
            </LoadingButton>
          </Box>

          {!isapprove1155 ? (
            <Box className="btn ">
              <LoadingButton
                type="submit"
                variant="contained"
                className="btn_sc"
                onClick={() => {
                  onApprovalFunc();
                  console.log("lplplplp");
                }}
              >
                Approval to marketPlace for more than 1 Quantity
              </LoadingButton>
            </Box>
          ) : (
            <></>
          )}

          {!isapprove721 ? (
            <Box className="btn ">
              <LoadingButton
                type="submit"
                variant="contained"
                className="btn_sc"
                onClick={() => {
                  onApproval721Func();
                  console.log("lplplplp");
                }}
              >
                Approval to marketPlace for 1 Quantity
              </LoadingButton>
            </Box>
          ) : (
            <></>
          )}
        </Box>
        <TabContext className="pre_file " value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              className="tab_s mt-20"
            >
              <Tab label="My Listed Nft's" value="1" className="tab_btn" />
              {/* <Tab label="My Sold Nft's" value="2" />
              <Tab label="My Purchased Nft's" value="3" /> */}
            </Tabs>
          </Box>
          <TabPanel className="fdx_uplod" value={"1"} index={0}>
            {nftData?.data?.length ? (
              nftData?.data?.map((item, index) => {
                return (
                  <Box
                    key={index}
                    onClick={() => onClickNft(item)}
                    className="upp_load "
                  >
                    <Box className="top_img">
                      {item?.thumbnail == "" && (
                        <figure>
                          <img src={item?.image}></img>
                        </figure>
                      )}
                      {item?.audio && (
                        <figure>
                          <audio poster={item?.thumbnail} controls>
                            <source src={item?.audio} />
                          </audio>
                        </figure>
                      )}
                      {item?.thumbnail && (
                        <figure>
                          <video
                            width="100%"
                            height="100%"
                            poster={item?.thumbnail}
                            controls
                          >
                            <source src={item?.image} />
                          </video>
                        </figure>
                      )}
                    </Box>

                    <Box className="con_tnt">
                      <h4>{item?.name} </h4>
                      <Box>
                        <h4>{item?.description}</h4>
                        {/* <h4>{"Price : " + item?.price?.toString()}</h4> */}
                        <h4>{"Total Quantity : " + item?.supply}</h4>
                      </Box>
                    </Box>

                    {/* <Box className="input-group">
                      <TextField
                        type="number"
                        className="form-control"
                        placeholder="Supply"
                        value={items == item ? selectQuantity : ""}
                        variant="standard"
                        id={index}
                        // error={Boolean(formik.touched.supply && formik.errors.supply)}
                        fullWidth
                        margin="none"
                        name="supply"
                        // helperText={formik.touched.supply && formik.errors.supply}

                        onChange={(val) => {
                          if (
                            isNumber(val.target.value) &&
                            val.target.value <= item?.supply
                          ) {
                            setItems(item);
                            setselectQuantity(val.target.value);
                          }
                        }}
                        // disabled
                      />
                    </Box>

                    <Box className="input-group">
                      <TextField
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        value={items == item ? selectPrice : ""}
                        variant="standard"
                        id={index}
                        // error={Boolean(formik.touched.supply && formik.errors.supply)}
                        fullWidth
                        margin="none"
                        name="Price"
                        // helperText={formik.touched.supply && formik.errors.supply}

                        onChange={(val) => {
                          if (isNumber(val.target.value)) {
                            setItems(item);
                            setselectPrice(val.target.value);
                          }
                        }}
                        // disabled
                      />
                    </Box>

                    <Box className="btn ">
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        className="btn_sc"
                        onClick={() => {
                          setisSold(true);
                          console.log(selectPrice, selectQuantity, "lplp");
                        }}
                        disabled={
                          isBid && item?.supply - selectQuantity == 0
                            ? true
                            : false
                        }
                      >
                        Sell
                      </LoadingButton>
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        className="btn_sc"
                        onClick={() => {
                          setisBid(true);

                          console.log(selectPrice, selectQuantity, "lplplplp");
                        }}
                        disabled={
                          isSold && item?.supply - selectQuantity == 0
                            ? true
                            : false
                        }
                      >
                        Bid
                      </LoadingButton>
                    </Box> */}
                  </Box>
                );
              })
            ) : loading ? (
              <ShimmerSimpleGallery card imageHeight={200} />
            ) : (
              <Box className="not_found">
                <h3>No Nft's found</h3>
              </Box>
            )}
          </TabPanel>
          {/* <TabPanel className="fdx_uplod" value={"2"} index={1}>
            {soldItems?.length ? (
              soldItems?.map((item, index) => {
                return (
                  <Box
                    key={index}
                    onClick={() => onClickNft(item)}
                    className="upp_load"
                  >
                    <Box className="top_img">
                      {item?.thumbnail == "" && (
                        <figure>
                          <img src={item?.image}></img>
                        </figure>
                      )}
                      {item?.audio && (
                        <figure>
                          <audio poster={item?.thumbnail} controls>
                            <source src={item?.audio} />
                          </audio>
                        </figure>
                      )}
                      {item?.thumbnail && (
                        <figure>
                          <video
                            width="100%"
                            height="100%"
                            poster={item?.thumbnail}
                            controls
                          >
                            <source src={item?.image} />
                          </video>
                        </figure>
                      )}
                    </Box>

                    <Box className="con_tnt">
                      <h4>{item?.name} </h4>
                      <Box>
                        <h4>{item?.description}</h4>
                        <h4>{"Price : " + item?.price?.toString()}</h4>
                      </Box>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box className="not_found">
                <h3>No sold Nft's found</h3>
              </Box>
            )}
          </TabPanel>
          <TabPanel className="fdx_uplod" value={"3"} index={2}>
            {purchases?.length ? (
              purchases?.map((item, index) => {
                return (
                  <Box
                    key={index}
                    onClick={() => onClickNft(item)}
                    className="upp_load"
                  >
                    <Box className="top_img">
                      {item?.thumbnail == "" && (
                        <figure>
                          <img src={item?.image}></img>
                        </figure>
                      )}
                      {item?.audio && (
                        <figure>
                          <audio poster={item?.thumbnail} controls>
                            <source src={item?.audio} />
                          </audio>
                        </figure>
                      )}
                      {item?.thumbnail && (
                        <figure>
                          <video
                            width="100%"
                            height="100%"
                            poster={item?.thumbnail}
                            controls
                          >
                            <source src={item?.image} />
                          </video>
                        </figure>
                      )}
                    </Box>

                    <Box className="con_tnt">
                      <h4>{item?.name} </h4>
                      <Box>
                        <h4>{item?.description}</h4>
                        <h4>{"Price : " + item?.price?.toString()}</h4>
                      </Box>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box className="not_found">
                <h3>No purchased Nft's found</h3>
              </Box>
            )}
          </TabPanel> */}
        </TabContext>

        <Box className="fdx_uplod"></Box>
      </Box>
    </Box>
  );
};

export default ProfileNft;
