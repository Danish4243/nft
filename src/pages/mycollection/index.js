import {
  Box,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  TextField,
  Modal,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Header, Loader } from "../../components";
import {
  getCollection,
  getUserCollection,
  tempData,
  updateCollection,
} from "../../redux/actions";
import EditIcon from "@mui/icons-material/Edit";

const MyCollection = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const collections = useSelector(
    (state) => state.nftReducer.userCollectionData
  );

  useEffect(() => {
    dispatch(getUserCollection.request());
  }, []);

  const onCollectionClick = (item) => {
    const body = {
      collectionId: item,
    };
    dispatch(tempData.updateTempData(body));
    router.push({
      pathname: `/myCollectionNft`,
      query: { collectionId: item?._id },
    });
  };

  const onEditCollection = (e, item) => {
    e.stopPropagation();
    const body = {
      collectionId: item,
    };
    dispatch(tempData.updateTempData(body));
    router.push("/editCollection");
  };

  return (
    <Box className="mycol_wrap">
      <Header />
      <Loader />
      <Box className="conta_iner  mt-40">
        <Box className="title_outr">
          <h2>My Collections</h2>
          <p>
            Create, curate, and manage collections of unique NFTs to share and
            sell.
            <span>
              <InfoIcon />
            </span>
          </p>
        </Box>
        <Box className="col_fdx">
          <button
            onClick={() => router.push("/createCollection")}
            className="col_btn"
          >
            Create a collection
          </button>
        </Box>
        <Box className="c-fdx">
          {collections?.data?.map((item, index) => {
            return (
              <Box
                onClick={() => onCollectionClick(item)}
                key={index}
                className="c-inr"
              >
                <Box className="c-upr">
                  <img
                    src={item?.featuredImage || "/static/images/dummy.png"}
                  ></img>
                </Box>
                <Box className="lwr_fd">
                  <Box className="c-lwr">
                    <img
                      src={item?.logoImage || "/static/images/dummy.png"}
                    ></img>
                  </Box>
                  <p>{item?.name}</p>
                  {item?.description ? <p>{"- " + item?.description} </p> : ""}
                  <Box
                    className="edit_btn"
                    onClick={(e) => onEditCollection(e, item)}
                  >
                    <EditIcon />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default MyCollection;
