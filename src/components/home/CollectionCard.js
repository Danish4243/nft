import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { tempData } from "../../redux/actions";

export const CollectionCard = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const cardData = props?.data;

  const onCollectionClick = (item) => {
    const body = {
      collectionId: item?._id,
    };
    dispatch(tempData.updateTempData(body));
    router.push({
      pathname: `/collection`,
      query: { collectionId: item?._id },
    });
    // router.push("/collection");
  };

  return (
    <Box className="col-repet">
      {cardData?.map((item, index) => {
        return (
          <Box
            onClick={() => onCollectionClick(item)}
            key={index}
            className="clctns_mn"
          >
            <Box className="clctns_ryt">
              <img
                src={item?.logoImage || "/static/images/collections.png"}
                alt=" "
              />
            </Box>
            <h3>{item?.name}</h3>

            <Box className="clctns_lft">
              <Box className="lft_inr">
                <img src={"/static/images/diamond.svg"} alt=" " />
                {/* <span className="spn_clcn">+9564.46%</span> */}
              </Box>
              <Box className="lft_inr">
                {/* <Box className="flr_prc">
                  <h3>Floor price:</h3>
                  <figure>
                    <img src={"/static/images/diamond.svg"} alt=" " />
                  </figure>
                  <span className="spn">0.4</span>
                </Box> */}
                <Box className="flr_prc_rt">
                  <figure></figure>
                  {/* <span className="spn">837.34</span> */}
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
