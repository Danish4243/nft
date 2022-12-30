import { Box, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CollectionCard } from "../../components";
import { getCollection } from "../../redux/actions";

export const TopCollections = () => {
  const dispatch = useDispatch();

  const collectionData = useSelector(
    (state) => state.nftReducer.collectionData
  );

  useEffect(() => {
    dispatch(getCollection.request());
  }, []);

  return (
    <Box className="all_sec">
      <Box className="conta_iner lst_hrs">
        <Box className=" sb_hdng clctns">
          <h2>Top collections over last 24 hours</h2>
          <select className="icn_slct">
            <option></option>
          </select>
        </Box>
        <Box className="clctns_hd">
          <CollectionCard data={collectionData?.data} />
          {/* <CollectionCard />
          <CollectionCard />
          {/* <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard /> */}
        </Box>
        {/* <Box className="rnk_btn">
          <Button variant="contained" className="btn_sc">
            {" "}
            Go To Ranking
          </Button>
        </Box> */}
      </Box>
    </Box>
  );
};
