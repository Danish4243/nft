import { Box, InputAdornment, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Header, Loader } from "../../components";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  getCategoryAction,
  getCollection,
  tempData,
} from "../../redux/actions";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const ExploreCategory = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [keyword, setKeyWord] = useState("");

  const temporaryData = useSelector((state) => state.authReducer.tempData);
  const collectiondata = useSelector(
    (state) => state.nftReducer.collectionData
  );

  useEffect(() => {
    dispatch(getCollection.request(temporaryData?.catData?.name));
  }, []);

  const onCollectionClick = (item) => {
    const body = {
      collectionId: item?._id,
    };
    dispatch(tempData.updateTempData(body));
    router.push("/collection");
  };

  return (
    <Box>
      <Header />
      <Loader />
      <Box className="conta_iner">
        <h2>Explore {temporaryData?.catData?.name}</h2>
        <Box className="txt_input">
          <TextField
            placeholder="Search"
            type="text"
            variant="outlined"
            size="small"
            onChange={(e) => setKeyWord(e.target.value)}
            value={keyword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: keyword && (
                <IconButton
                  aria-label="toggle Search visibility"
                  onClick={() => setKeyWord("")}
                >
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
        <Box className="c-fdx">
          {collectiondata?.data
            ?.filter((item) => {
              return item.name.toLowerCase().includes(keyword.toLowerCase());
            })
            ?.map((item, index) => {
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
                    {item?.description ? (
                      <p>{"- " + item?.description} </p>
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
              );
            })}
          {!collectiondata?.data?.length && (
            <Box className="no_cntnt">
              <h2>No Collection found under this category</h2>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default ExploreCategory;
