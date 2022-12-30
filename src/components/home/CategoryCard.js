import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { tempData } from "../../redux/actions";

export const CategoryCard = (props) => {
  const catData = props?.data;
  const router = useRouter();
  const dispatch = useDispatch();

  const onCategoryClick = (item) => {
    const body = {
      catData: item,
    };
    dispatch(tempData.updateTempData(body));
    router.push("/exploreCategory");
  };

  return (
    <Box className="col-repet">
      {catData &&
        catData?.map((item, index) => {
          return (
            <Box
              onClick={() => onCategoryClick(item)}
              key={index}
              className="brw_lst"
            >
              <figure>
                <img src={item?.image || "/static/images/gp1.png"} alt=" " />
              </figure>
              <h2>{item?.name}</h2>
            </Box>
          );
        })}
    </Box>
  );
};
