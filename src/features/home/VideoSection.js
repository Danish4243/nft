import React from "react";
import { Box } from "@material-ui/core";

export const VideoSection = () => {
  return (
    <Box className="all_sec">
      <Box className="conta_iner mrkt_plc">
        <Box className="sb_hd mt_opn">
          <h2>Meet OpenSea</h2>
          <p>The NFT marketplace with everything for everyone</p>
        </Box>
        <Box className="mrkt_mg">
          <figure>
            <img src={"/static/images/bg.png"} alt=" " />
          </figure>
        </Box>
      </Box>
    </Box>
  );
};
