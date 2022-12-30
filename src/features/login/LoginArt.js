import { Box } from "@material-ui/core";
import React, { memo } from "react";

function LoginArt() {
  return (
    <Box className="wrp_right">
      <Box className="fdx">
        <Box className="inner_bx">
          <figure className="d_img">
            <img src="/static/images/monkey.png" alt="monkey" />
          </figure>
        </Box>
        <Box className="inner_bx">
          <figure className="d_img">
            <img src="/static/images/owl.png" alt="owl" />
          </figure>
        </Box>
        <Box className="inner_bx">
          <figure className="d_img">
            <img src="/static/images/wolf.png" alt="wolf" />
          </figure>
        </Box>
        <Box className="inner_bx">
          <figure className="d_img">
            <img src="/static/images/panda.png" alt="panda" />
          </figure>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(LoginArt);
