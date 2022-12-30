import {
  Box,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Header, Loader } from "../../components";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import TocIcon from "@mui/icons-material/Toc";
import TimelineIcon from "@mui/icons-material/Timeline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  getCollection_ById,
  getNfts_ById,
  modalVisible,
  updateNft,
} from "../../redux/actions";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { isNumber } from "../../utils/validations";
import { asset1155Details, asset721Details, getId, getOwner } from "../ramdom";
import Web3 from "web3";
import { ABIMarket, ADDRESSMarket } from "../../utils/contractData";
import { Modules } from "../../constants/Modules";

const NftDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectQuantity, setselectQuantity] = useState(null);
  const [selectPrice, setselectPrice] = useState(null);
  const [isBid, setisBid] = useState(false);
  const [isSold, setisSold] = useState(false);
  const [ownerAddress, setownerAddress] = useState("");
  const [nftDetailContract, setnftDetailContract] = useState(null);
  const [tokenId, settokenId] = useState("");

  var web3 = new Web3(Web3.givenProvider);

  let contractMarket = new web3.eth.Contract(ABIMarket, ADDRESSMarket);

  const nftData = useSelector((state) => state.nftReducer.nftDataById);
  const temporaryData = useSelector((state) => state.authReducer.tempData);
  const collectionDataById = useSelector(
    (state) => state.nftReducer.collectionDataById
  );

  // -----To get nft detail from backend -------//
  useEffect(() => {
    if (router.query?.nftId) {
      dispatch(getNfts_ById.request(router?.query?.nftId));
    } else {
      router.back();
    }
  }, [router?.query]);
  // ---------------------------------------------------------- //

  // -------- to get token id from uri (get from backend) from smart contract --- //
  useEffect(() => {
    if (nftData?.data?.data) {
      let tokenUri = nftData?.data?.data ? nftData?.data?.data[0]?.image : "";
      if (tokenUri) {
        getidByContract(tokenUri);
      } else {
        console.log("hlo");
      }
    }
  }, [nftData]);

  const getidByContract = async (uri) => {
    let id = await getId(uri);
    settokenId(id);
    if (nftData?.data?.data && nftData?.data?.data[0]?.tokenType == "721") {
      let address = await getOwner(id); // in case of 721 we get owner address but in case of 1155 we get creator address which we get from backend
      setownerAddress(address);
    }
  };
  // ---------------------------------------------------------- //

  // --------get nft detail from smart contract with the help of token id ------ //
  useEffect(() => {
    if (tokenId) {
      getDetail();
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

  // ---------------------------------------------------------- //

  // --- set on sale from smart contract also update status in backend ------//
  const onSetSale = () => {
    let tokenUri = nftData?.data?.data[0]?.image;
    let price = selectPrice;
    let quantity = selectQuantity;

    setOnSale(tokenUri, price, quantity);
  };

  async function setOnSale(sTokenUri, nPrice, nQuantity) {
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

      // dispatch(modalVisible.modalOpen(Modules.CONFIRM_SALE));

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
          // dispatch(modalVisible.modalClose());
          // receiptStatus(receipt);
          if (receipt.status == true) {
            let body = {
              isSale: true,
            };
            let input = {
              body,
              id: router?.query?.nftId,
            };
            dispatch(updateNft.request(input));
            setisSold(true);
            getDetail();
            // alert(`You have approved ${sSpender} the amount of ${nAmount} token`);
            console.log(receipt);
          } else {
            toast.error("Transaction reverted due to some technical issues.");
          }
        })
        .catch(function (err) {
          toast.error(err.message);
          // dispatch(modalVisible.modalClose());
        });
    } catch (err) {
      toast.error(err.message);
      // dispatch(modalVisible.modalClose());
      console.log(err.message);
    }
  }

  // ---------------------------------------------------------- //

  // --- remove from sale from smart contract also update status in backend ------//
  async function removeFromSale(uri) {
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
          let body = {
            isSale: false,
          };
          let input = {
            body,
            id: router?.query?.nftId,
          };
          dispatch(updateNft.request(input));
          setisSold(false);
          getDetail();
        })
        .catch(function (err) {
          toast.error(err.message);
        });
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  }

  const onRemoveSale = () => {
    let tokenUri = nftData?.data?.data[0]?.image;

    removeFromSale(tokenUri);
  };

  // ---------------------------------------------------------- //

  const onBidSale = () => {
    // let body = {
    //   tokenUri: nftData?.data?.data[0]?.image,
    //   price: selectPrice,
    //   quantity: selectQuantity,
    // };
    let body = {
      isBid: true,
    };
    let input = {
      body,
      id: router?.query?.nftId,
    };
    dispatch(updateNft.request(input));
  };

  return (
    <Box className="conta_iner nftdtl_wrp">
      <Header />
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
                {temporaryData?.nftId?.property?.length ? (
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
                        {temporaryData?.nftId?.property?.map((item, index) => {
                          return (
                            <Box className="rev" key={index}>
                              <span>{item?.name}</span>
                              <span>{item?.types}</span>
                              <p>
                                <span>{item?.percent?.toFixed(2) + " %"}</span>
                              </p>
                            </Box>
                          );
                        })}
                      </Typography> */}
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  <></>
                )}
              </li>

              <li>
                {temporaryData?.nftId?.stats?.length ? (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography component={"span"}>
                        <span className="collps_icn">
                          <VerticalSplitIcon />
                        </span>
                        Stats
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={"span"} className="gyt">
                        {nftData?.data?.data &&
                          nftData?.data?.data[0]?.stats?.map((item, index) => {
                            return (
                              <Box key={index}>
                                <span>{item?.name + " "}</span>
                                <p>
                                  <span>{item?.valueOf + " of "}</span>
                                  <span>{item?.valueFrom}</span>
                                </p>
                              </Box>
                            );
                          })}
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
                          nftData?.data?.data[0]?.levels?.map((item, index) => {
                            return (
                              <Box className="acc_dta" key={index}>
                                <p>{item?.name}</p>
                                <Box className="ryt">
                                  <span>{item?.valueOf + " of "}</span>
                                  <span>{item?.valueFrom}</span>
                                </Box>
                              </Box>
                            );
                          })}
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
                      {nftData?.data?.data[0]?.collectionId?.description ||
                        "This collection has no description yet. Contact the owner of this collection. "}
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
                        <Box> </Box>
                      </Box>
                      <Box className="bx_card">
                        <Box className="hdng">Token ID</Box>
                        <Box> {tokenId ? tokenId : ""}</Box>
                      </Box>
                      <Box className="bx_card">
                        <Box className="hdng">Token Standard</Box>
                        <Box> ERC-1155</Box>
                      </Box>
                      <Box className="bx_card">
                        <Box className="hdng">Token Type</Box>
                        <Box>
                          {nftDetailContract
                            ? nftDetailContract?.tokenType
                            : ""}
                        </Box>
                      </Box>
                      <Box className="bx_card">
                        <Box className="hdng">Blockchain</Box>
                        <Box> {"Ethereum"}</Box>
                      </Box>
                      <Box className="bx_card">
                        <Box className="hdng">MetaData</Box>
                        <Box>
                          {" "}
                          {nftData?.data?.data
                            ? nftData?.data?.data[0]?.image
                            : ""}
                        </Box>
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
                            {temporaryData?.nftId?.tokenId?.toString()}
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
                          <TableCell align="right">Centralized</TableCell>
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
            <p className="text-cap">
              {nftData?.data?.data && nftData?.data?.data[0]?.collectionId?.name
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
          <h2>
            {nftData?.data?.data && nftData?.data?.data[0]?.name
              ? nftData?.data?.data[0]?.name
              : ""}
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
          </Box>

          <Box className="detail_view">
            <p>
              Remaining Quantity {": "}
              {nftDetailContract ? nftDetailContract?.remainingQuantity : ""}
            </p>
          </Box>

          <Box className="collps">
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
            <Box>
              {nftData?.data?.data && !nftData?.data?.data[0]?.isSale ? (
                <Box>
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
                        if (isNumber(val.target.value)) {
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
                        if (e.target.value?.length < 8) {
                          e.target.value <= 0
                            ? setselectPrice("")
                            : setselectPrice(e.target.value);
                        }
                        // if (isNumber(val.target.value)) {
                        //   // setItems(item);
                        //   setselectPrice(val.target.value);
                        // }
                      }}
                      // disabled
                    />
                  </Box>
                </Box>
              ) : (
                <></>
              )}

              <Box className="btn ">
                {nftData?.data?.data && !nftData?.data?.data[0]?.isSale ? (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    className="btn_sc"
                    onClick={() => {
                      onSetSale();
                    }}
                    disabled={
                      !selectPrice || !selectQuantity
                      // nftData?.data?.data && nftData?.data?.data[0]?.isApproval
                      //   ? false
                      //   : true
                    }
                  >
                    Set on Sale
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    className="btn_sc"
                    onClick={() => {
                      onRemoveSale();
                    }}
                  >
                    Remove from Sale
                  </LoadingButton>
                )}
                {/* {nftData?.data?.data && !nftData?.data?.data[0]?.isBid ? (
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
                ) : (
                  <></>
                )} */}
              </Box>
            </Box>
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
                                src={item?.image || "/static/images/dummy.png"}
                              ></img>
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
  );
};

export default NftDetail;
