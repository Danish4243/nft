import { Box, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

export const ExploreCollections = () => {
  const router = useRouter();

  return (
    <Box className="all_sec">
      <Box className="conta_iner">
        <Box className="sl_mn">
          <Box className="sl_rt">
            <h2>
              Checkout Salona
              <span className="blk"> collections on our platform</span>
            </h2>
          </Box>
          <Box className="sl_lft">
            <Button
              onClick={() => router.push("/exploreCollection")}
              variant="contained"
              className="btn_sc"
            >
              Explore
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
