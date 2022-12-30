import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { CategoryCard } from "../../components/home/CategoryCard";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryAction } from "../../redux/actions";

export const BrowseCategory = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const categoryData = useSelector((state) => state.nftReducer.categoryData);

  useEffect(() => {
    dispatch(getCategoryAction.request());
  }, []);

  return (
    <Box className="all_sec  ctgry_sec">
      <Box className="conta_iner">
        <Box className=" sb_hdng">
          <h2>Browse by category</h2>
        </Box>
        <Box className="brw_mn">
          <CategoryCard data={categoryData?.data} />
        </Box>
        <Box onClick={() => router.push("/exploreCollection")} className="">
          <Box className="explr art_explr">
            <h3>Explore More</h3>
            <figure>
              {" "}
              <img src={"/static/images/pin.svg"} alt=" " />
            </figure>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
