import { Box } from "@material-ui/core";
import React from "react";

export const GettingStarted = () => {
  return (
    <Box className=" all_sec">
      <Box className="conta_iner">
        <Box className=" sb_hdng">
          <h2>Resources for getting started</h2>
        </Box>
        <Box className="rsrc">
          <Box className="rsrc_lst">
            <figure>
              <img src={"/static/images/resource.png"} alt=" " />
            </figure>
            <h3>
              How to easily setup a <span className="blk">MetaMask wallet</span>
            </h3>
          </Box>
          <Box className="rsrc_lst">
            <figure>
              <img src={"/static/images/rsrc2.png"} alt=" " />
            </figure>
            <h3>
              How to Fund Metamask<span className="blk"> with ETH</span>
            </h3>
          </Box>
          <Box className="rsrc_lst">
            <figure>
              <img src={"/static/images/rsrc3.png"} alt=" " />
            </figure>
            <h3>
              How to find NFT <span className="blk">you love</span>
            </h3>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
