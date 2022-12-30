import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ConfirmSale = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const nftData = useSelector((state) => state.nftReducer.nftDataById);

  useEffect(() => {
    if (nftData?.data?.data) {
    } else {
      router.back();
    }
  }, [nftData]);

  return (
    <Box component="main" className="login_wpr">
      <Box className="wrapper">
        <Typography>Complete Listing</Typography>
      </Box>
      <Box className="complete_modal">
        <Box>
          <img
            src={
              nftData?.data?.data
                ? nftData?.data?.data[0]?.image
                : "/static/images/dummy.png"
            }
            alt=""
          ></img>
          <Box>
            <Typography>
              {nftData?.data?.data ? nftData?.data?.data[0]?.name : ""}
            </Typography>
            <Typography>
              {nftData?.data?.data
                ? nftData?.data?.data[0]?.collectionId?.name
                : ""}
            </Typography>
            <Typography>Chain: Ethereum</Typography>
          </Box>
        </Box>

        <Box>
          <Box>
            <Typography>
              {" "}
              You have to confirm the Transaction on the metamask to show your
              nft for listing{" "}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmSale;
