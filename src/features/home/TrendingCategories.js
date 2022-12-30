import React from "react";
import { Box } from "@material-ui/core";

export const TrendingCategories = () => {
  return (
    <Box className="all_sec">
      <Box className="conta_iner tnd_ctgry">
        <Box className="sb_hdng clctns">
          <h2>Trending in all Categories</h2>
          <select className="icn_slct">
            <option></option>
          </select>
        </Box>
        <Box className="ctgry_mn">
          <Box className="ctgry_lst">
            <figure className="ctgry_mg">
              <img src={"/static/images/resource.png"} alt=" " />
            </figure>
            <figure className="stsc_mg">
              <img src={"/static/images/ctgry1.png"} alt=" " />
            </figure>
            <Box className="cr_id">
              <h3>MainHero Universe:</h3>
              <span>Core Ident</span>
              <figure className="vctr_mg">
                <img src={"/static/images/vector.svg"} alt=" " />
              </figure>
            </Box>
          </Box>
          <Box className="ctgry_lst">
            <figure className="ctgry_mg">
              <img src={"/static/images/rsrc2.png"} alt=" " />
            </figure>
            <figure className="stsc_mg">
              <img src={"/static/images/ctgry2.png"} alt=" " />
            </figure>
            <Box className="cr_id">
              <h3>MainHero Universe:</h3>
              <span>Core Ident</span>
              <figure className="vctr_mg">
                <img src={"/static/images/vector.svg"} alt=" " />
              </figure>
            </Box>
          </Box>
          <Box className="ctgry_lst">
            <figure className="ctgry_mg">
              <img src={"/static/images/rsrc3.png"} alt=" " />
            </figure>
            <figure className="stsc_mg">
              <img src={"/static/images/ctgry3.png"} alt=" " />
            </figure>
            <Box className="cr_id">
              <h3>MainHero Universe:</h3>
              <span>Core Ident</span>
              <figure className="vctr_mg">
                <img src={"/static/images/vector.svg"} alt=" " />
              </figure>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
