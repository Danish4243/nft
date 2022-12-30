import {
  Box,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Header, Loader } from "../../components";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import TocIcon from "@mui/icons-material/Toc";
import TimelineIcon from "@mui/icons-material/Timeline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  buyNftAction,
  getCollection_ById,
  getNfts_ById,
  updateNft,
} from "../../redux/actions";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { isNumber } from "../../utils/validations";
import {
  asset1155Details,
  asset721Details,
  buyNft,
  getAmount1155,
  getId,
  getOwner,
} from "../ramdom";
import { getCookie } from "cookies-next";
import Web3 from "web3";
import {
  ABI721,
  ABIMarket,
  ADDRESS721,
  ADDRESSMarket,
} from "../../utils/contractData";

const NftDetailPage = ({ nft, marketplace, account }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedFilter, setselectedFilter] = useState([]);
  const [tokenId, settokenId] = useState("");
  const [nftDetailContract, setnftDetailContract] = useState(null);
  const [ownerAddress, setownerAddress] = useState("");
  const [nftBalance, setnftBalance] = useState("");

  const nftData = useSelector((state) => state.nftReducer.nftDataById);
  const walletAddress = useSelector((state) => state.authReducer.walletAddress);

  const temporaryData = useSelector((state) => state.authReducer.tempData);
  const collectionDataById = useSelector(
    (state) => state.nftReducer.collectionDataById
  );
  const isAuthorised = useSelector((state) => state.authReducer.isAuthorised);

  const data = getCookie("userData");

  useEffect(() => {
    if (router?.query?.nftId) {
      console.log(router?.query?.nftId, "temporaryData?.nftId");
    } else {
      router.back();
    }
  }, [router?.query]);

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      setTimeout(() => {
        toast.error("Please signIn");
        router.replace("/login");
      }, 2000);
    } else {
      dispatch(getNfts_ById.request(router?.query?.nftId));
    }
  }, [getCookie, router]);

  useEffect(() => {
    if (nftData?.data?.data) {
      getTokenId();
    } else {
      console.log("hlo");
    }
  }, [nftData]);

  const getTokenId = async () => {
    let tokenuri = nftData?.data?.data && nftData?.data?.data[0]?.image;
    let tokenType = nftData?.data?.data && nftData?.data?.data[0]?.tokenType;
    let id = await getId(tokenuri);
    settokenId(id);
    // let address = await getOwner(id);
    // setownerAddress(address);
    if (nftData?.data?.data && nftData?.data?.data[0]?.tokenType == "721") {
      let address = await getOwner(id);
      setownerAddress(address);
    }
  };

  useEffect(() => {
    if (tokenId) {
      getDetail();
    } else {
      console.log("lp");
    }
  }, [tokenId]);

  const getDetail = async () => {
    let tokenType = nftData?.data?.data && nftData?.data?.data[0]?.tokenType;
    if (tokenType == "721") {
      let type = await asset721Details(tokenId);

      setnftDetailContract(type);
    } else if (tokenType == "1155") {
      let type = await asset1155Details(tokenId);

      setnftDetailContract(type);
    }
  };

  const checkNftBalance = async () => {
    let address = walletAddress ? walletAddress : "";
    let tokenType = nftData?.data?.data && nftData?.data?.data[0]?.tokenType;

    if (tokenType == "1155") {
      const nftBal = await getAmount1155(address, tokenId);
      setnftBalance(nftBal);
    } else {
    }
  };

  var web3 = new Web3(Web3.givenProvider);

  let contract721;

  contract721 = new web3.eth.Contract(ABI721, ADDRESS721);

  let contractMarket;

  contractMarket = new web3.eth.Contract(ABIMarket, ADDRESSMarket);

  async function getMarket721() {
    try {
      let sResult = await contract721.methods.market().call();
      console.log(sResult);
      return sResult;
    } catch (err) {
      console.log(err);
    }
  }

  async function buyNft(sOwner, uri, nAmount) {
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
          getDetail();
          let body = {
            isBuy: true,
            buyerAddress: walletAddress ? walletAddress : "",
          };
          let input = {
            body,
            id: router?.query?.nftId,
          };
          dispatch(buyNftAction.request(input));
        })
        .catch(function (err) {
          alert(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  }

  const onBuyNft = async () => {
    let address = nftData?.data?.data
      ? nftData?.data?.data[0]?.creatorAddress
      : "";
    // let address = "0xADc4971cd642B8638AFfD41CB215532901f5c9f8";
    let tokenUri = nftData?.data?.data && nftData?.data?.data[0]?.image;
    let salePrice = Number(nftDetailContract?.salePrice);

    buyNft(address, tokenUri, salePrice);
  };

  return (
    <>
      <Header />

      <Box className="conta_iner nftdtl_wrp">
        <Loader />

        <Box className="fdx py-60">
          <Box className="dtl-lft">
            <Box className="box-one">
              <Box className="box-one-img">
                {nftData?.data?.data[0]?.name && (
                  <img src={nftData?.data?.data[0]?.image} alt=""></img>
                )}
                {nftData?.data?.data[0]?.audio && (
                  <figure>
                    <audio poster={nftData?.data?.data[0]?.thumbnail} controls>
                      <source src={nftData?.data?.data[0]?.audio} />
                    </audio>
                  </figure>
                )}
                {nftData?.data?.data[0]?.video && (
                  <figure>
                    <video
                      width="100%"
                      height="50%"
                      poster={nftData?.data?.data[0]?.thumbnail}
                      controls
                    >
                      <source src={nftData?.data?.data[0]?.video} />
                    </video>
                  </figure>
                )}
              </Box>
            </Box>
            <Box className="des_dtl">
              <ul>
                <li className="des_li">
                  <p>
                    <SortIcon /> <span>Description</span>
                  </p>
                </li>
                <li className="des_li">
                  <p>{nftData?.data?.data[0]?.description}</p>
                </li>

                <li>
                  {nftData?.data?.data &&
                  nftData?.data?.data[0]?.property?.length ? (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography component={"zvm"}>
                          <span className="collps_icn">
                            <VerticalSplitIcon />
                          </span>
                          Properties
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* <Typography component={"rgyh"} className="gyt">
                          {temporaryData?.nftId?.property?.map(
                            (item, index) => {
                              return (
                                <Box className="rev" key={index}>
                                  <span>{item?.name}</span>
                                  <span>{item?.types}</span>
                                  <p>
                                    <span>
                                      {item?.percent?.toFixed(2) + " %"}
                                    </span>
                                  </p>
                                </Box>
                              );
                            }
                          )}
                        </Typography> */}
                      </AccordionDetails>
                    </Accordion>
                  ) : (
                    <></>
                  )}
                </li>

                <li>
                  {nftData?.data?.data &&
                  nftData?.data?.data[0]?.stats?.length ? (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <span className="collps_icn">
                          <VerticalSplitIcon />
                        </span>
                        <Typography component={"span"}>Stats</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography component={"span"} className="gyt">
                          {nftData?.data?.data &&
                            nftData?.data?.data[0]?.stats?.map(
                              (item, index) => {
                                return (
                                  <Box key={index}>
                                    <span>{item?.name}</span>
                                    <p>
                                      <span>{item?.valueOf + " of "}</span>
                                      <span>{item?.valueFrom}</span>
                                    </p>
                                  </Box>
                                );
                              }
                            )}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ) : (
                    <></>
                  )}
                </li>
                <li>
                  {nftData?.data?.data &&
                  nftData?.data?.data[0]?.levels?.length ? (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography component={"zvm"}>
                          <span className="collps_icn">
                            <VerticalSplitIcon />
                          </span>
                          Levels
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography component={"span"} className="gyt">
                          {nftData?.data?.data &&
                            nftData?.data?.data[0]?.levels?.map(
                              (item, index) => {
                                return (
                                  <Box className="acc_dta" key={index}>
                                    <p>{item?.name}</p>
                                    <Box className="ryt">
                                      <span>{item?.valueOf + " of "}</span>
                                      <span>{item?.valueFrom}</span>
                                    </Box>
                                  </Box>
                                );
                              }
                            )}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ) : (
                    <></>
                  )}
                </li>
                <li>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography component={"zvm"}>
                        <span className="collps_icn">
                          <VerticalSplitIcon />
                        </span>
                        {"About " +
                          nftData?.data?.data[0]?.collectionId?.name +
                          " Collection"}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={"span"} className="gyt">
                        {nftData?.data?.data &&
                        nftData?.data?.data[0]?.collectionId?.description
                          ? nftData?.data?.data[0]?.collectionId?.description
                          : "This collection has no description yet. Contact the owner of this collection. "}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </li>
                <li>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography component={"zvm"}>
                        <span className="collps_icn">
                          <ViewTimelineIcon />
                        </span>{" "}
                        Details
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box className="bx_wpr">
                        <Box className="bx_card">
                          <Box className="hdng">Contract Address</Box>
                          <Box>
                            {nftData?.data?.data &&
                              nftData?.data?.data[0]?.nftContract}
                          </Box>
                        </Box>
                        <Box className="bx_card">
                          <Box className="hdng">Token ID</Box>
                          <Box> {tokenId}</Box>
                        </Box>
                        <Box className="bx_card">
                          <Box className="hdng">Token Standard</Box>
                          <Box> ERC-1155</Box>
                        </Box>
                        <Box className="bx_card">
                          <Box className="hdng">Blockchain</Box>
                          <Box>{"Ethereum"}</Box>
                        </Box>
                        <Box className="bx_card">
                          <Box className="hdng">MetaData</Box>
                          <Box> {nftDetailContract?.url}</Box>
                        </Box>
                        <Box className="bx_card">
                          <Box className="hdng">Creator Earning</Box>
                          <Box>0%</Box>
                        </Box>
                      </Box>
                      {/* <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Contract Address</TableCell>
                          <TableCell align="right">
                           
                            {temporaryData?.nftId?.nftContract}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="left">Token ID</TableCell>
                          <TableCell align="right">
                            
                            {tokenId}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left">Token Standard</TableCell>
                          <TableCell align="right">ERC-1155</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left">Blockchain</TableCell>
                          <TableCell align="right">
                            {temporaryData?.nftId?.blockchain?.name}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left">MetaData</TableCell>
                          <TableCell align="right">
                            {nftDetailContract?.url}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left">Creator Earning</TableCell>
                          <TableCell align="right">0%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table> */}
                    </AccordionDetails>
                  </Accordion>
                </li>
              </ul>
            </Box>
          </Box>
          <Box className="dtl-rgt">
            <Box className="fdx">
              {/* <p>{nftData?.data?.data[0]?.collectionId?.name + " Collection"}</p> */}
              <p>
                {nftData?.data?.data &&
                nftData?.data?.data[0]?.collectionId?.name
                  ? nftData?.data?.data[0]?.collectionId?.name + " Collection"
                  : ""}
              </p>
              {/* <Box className="dtl-rgt-inr">
              <ul>
                <li>
                  <RefreshIcon />
                </li>
                <li>
                  <SendIcon />
                </li>
                <li>
                  <ShareIcon />
                </li>
                <li>
                  <MoreVertIcon />
                </li>
              </ul>
            </Box> */}
            </Box>
            <h2 className="text-cap">
              {nftData?.data?.data ? nftData?.data?.data[0]?.nftId?.name : ""}
            </h2>
            <Box className="fdx c-fd">
              {nftData?.data?.data &&
              nftData?.data?.data[0].tokenType == "721" ? (
                <p>
                  Owned by <span>{ownerAddress ? ownerAddress : ""}</span>
                </p>
              ) : (
                <p>
                  Created by{" "}
                  <span>
                    {nftData?.data?.data
                      ? nftData?.data?.data[0]?.creatorAddress
                      : ""}
                  </span>
                </p>
              )}
              <p>
                <span>{/* <RemoveRedEyeIcon /> */}</span>
              </p>
            </Box>
            <Box className="detail_view">
              <p>
                Sale Amount <br />
                {nftDetailContract?.salePrice}
              </p>
              <p>
                Remaining Quantity
                <br />
                {nftDetailContract?.remainingQuantity}
              </p>
              <p>
                Total Quantity <br />
                {nftData?.data?.data ? nftData?.data?.data[0]?.supply : ""}
              </p>
              <p>
                {" "}
                Quantity on Sale <br />
                {nftDetailContract?.quantityOnSale}
              </p>
              <p>
                {" "}
                platform fees <br />
                500 wei
              </p>

              {/* <p>{" Nft Balance " + (nftBalance ? nftBalance : "")}</p> */}
            </Box>
            <Box className="collps acc_wpr">
              <Box className="collps_inr">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography component={"zvm"}>
                      <span className="collps_icn">
                        <TimelineIcon />
                      </span>
                      Price History
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="detailAccc">
                    <Box className="acc_ndf">
                      <img src={"/static/images/no-chart-data.svg"}></img>

                      <Typography component={"h6"} className="gyt">
                        No item activity yet
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Box className="collps_inr">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography component={"zvm"}>
                      <span className="collps_icn">
                        <LocalOfferIcon />
                      </span>
                      Listings
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="detailAccc">
                    <Box className="acc_ndf">
                      <img src={"/static/images/empty-asks.svg"}></img>
                      <Typography component={"h6"} className="gyt">
                        No listing yet
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>

              <Box className="collps_inr">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography component={"zvm"}>
                      <span className="collps_icn">
                        <TocIcon />
                      </span>
                      Offers
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="detailAccc">
                    <Box className="acc_nft">
                      <img src={"/static/images/empty-bids.svg"}></img>

                      <Typography component={"h6"} className="gyt">
                        No Offers yet
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Box className="btn_wpr">
                {/* {nftData?.data?.data && nftData?.data?.data[0]?.isSale ? (
                nftDetailContract?.salePrice != "0" ? (
                  <Box className="btn ">
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      className="btn_sc"
                      onClick={() => {
                        onBuyNft();
                      }}
                    >
                      Buy Nft
                    </LoadingButton>
                  </Box>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )} */}

                {nftData?.data?.data && nftData?.data?.data[0]?.isSale ? (
                  <Box className="btn ">
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      className="btn_sc"
                      onClick={() => {
                        onBuyNft();
                      }}
                    >
                      Buy Nft
                    </LoadingButton>
                  </Box>
                ) : (
                  <></>
                )}

                {nftData?.data?.data &&
                nftData?.data?.data[0]?.tokenType == "1155" ? (
                  <Box className="btn ">
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      className="btn_sc"
                      onClick={() => {
                        checkNftBalance();
                      }}
                    >
                      Check Your Nft Balance {nftBalance ? nftBalance : ""}
                    </LoadingButton>
                  </Box>
                ) : (
                  <></>
                )}
              </Box>
              {/* <Box>
              <Box className="input-group">
                <TextField
                  type="number"
                  className="form-control"
                  placeholder="Quantity"
                  value={selectQuantity}
                  variant="standard"
                  id="form-control-quantity"
                  // error={Boolean(formik.touched.supply && formik.errors.supply)}
                  fullWidth
                  margin="none"
                  name="supply"
                  // helperText={formik.touched.supply && formik.errors.supply}

                  onChange={(val) => {
                    if (
                      isNumber(val.target.value)
                      // &&
                      // val.target.value <= nftData?.data?.data[0]?.supply
                    ) {
                      // setItems(item);
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
                  value={selectPrice}
                  variant="standard"
                  id="form-control-price"
                  // error={Boolean(formik.touched.supply && formik.errors.supply)}
                  fullWidth
                  margin="none"
                  name="Price"
                  // helperText={formik.touched.supply && formik.errors.supply}

                  onChange={(e) => {
                    if (e.target.value?.length < 5) {
                      e.target.value < 0 ? "" : setselectPrice(e.target.value);
                    }
                    // if (isNumber(val.target.value)) {
                    //   // setItems(item);
                    //   setselectPrice(val.target.value);
                    // }
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
                    setonApproval(true);
                  }}
                  disabled={
                    isBid &&
                    nftData?.data?.data[0]?.supply - selectQuantity == 0
                      ? true
                      : false
                  }
                >
                  Approval to marketPlace
                </LoadingButton>
              </Box>

              <Box className="btn ">
                <LoadingButton
                  type="submit"
                  variant="contained"
                  className="btn_sc"
                  onClick={() => {
                    setisSold(true);
                    console.log(selectPrice, selectQuantity, "lplp");
                    onSetSale();
                  }}
                  disabled={onApproval ? false : true}
                >
                  Set on Sale
                </LoadingButton>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  className="btn_sc"
                  onClick={() => {
                    setisBid(true);
                    onBidSale();
                    console.log(selectPrice, selectQuantity, "lplplplp");
                  }}
                  disabled={onApproval ? false : true}
                >
                  Set on Bid
                </LoadingButton>
              </Box>
            </Box> */}
            </Box>
          </Box>
        </Box>

        <Box className="collps_inr actvy">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography component={"zvm"}>
                <span className="collps_icn">
                  <ImportExportIcon />
                </span>
                Item Activity
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Event</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="right">From</TableCell>
                    <TableCell align="right">To</TableCell>
                    <TableCell align="right">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>auto_awesome Minted</TableCell>
                    <TableCell>$10</TableCell>
                    <TableCell align="right">NullAddress</TableCell>
                    <TableCell align="right">You</TableCell>
                    <TableCell align="right">6 hours ago</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box className="collps_inr">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              onClick={() =>
                dispatch(
                  getCollection_ById.request(
                    nftData?.data?.data[0]?.collectionId?._id
                  )
                )
              }
            >
              <Typography component={"zvm"}>
                <span className="collps_icn">
                  <ViewModuleIcon />
                </span>
                More From This Collection
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box className="c-fdx">
                {collectionDataById?.data &&
                collectionDataById?.data[0]?.nfts?.length != "1" ? (
                  collectionDataById?.data[0]?.nfts
                    ?.filter((item) => {
                      return !item._id
                        .toLowerCase()
                        .includes(router?.query?.nftId);
                    })
                    ?.map((item, index) => {
                      return (
                        <Box key={index} className="c-inr">
                          <Box className="c-upr">
                            {item?.image && (
                              <figure>
                                <img
                                  src={
                                    item?.image || "/static/images/dummy.png"
                                  }
                                ></img>
                              </figure>
                            )}
                            {item?.audio && (
                              <figure>
                                <audio poster={item?.thumbnail} controls>
                                  <source src={item?.audio} />
                                </audio>
                              </figure>
                            )}
                            {item?.video && (
                              <figure>
                                <video
                                  width="100%"
                                  height="100%"
                                  poster={item?.thumbnail}
                                  controls
                                >
                                  <source src={item?.video} />
                                </video>
                              </figure>
                            )}
                          </Box>

                          <Box className="lwr_fd">
                            <p>{item?.name}</p>
                          </Box>
                        </Box>
                      );
                    })
                ) : (
                  // <></>
                  <Typography component={"span"} className="gyt">
                    This collection has no description yet. Contact the owner of
                    this collection about setting it up!
                  </Typography>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </>
  );
};

export default NftDetailPage;
