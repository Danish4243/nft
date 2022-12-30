import { Box, Button } from "@material-ui/core";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const Section1 = () => {
  const router = useRouter();

  const isAuthorised = useSelector((state) => state.authReducer.isAuthorised);

  const onCreateCLick = () => {
    if (isAuthorised) {
      router.push("/create");
    } else {
      toast.error("Please signIn");
      router.push("/login");
    }
  };

  return (
    <Box className="all_sec ">
      <Box className="conta_iner">
        <Box className="mn_hd">
          <h1>
            Discover, collect, and sell
            <span className="blk">
              {" "}
              extraordinary <span className="spn_clcn"> NFTs </span>
            </span>
          </h1>
        </Box>
        <Box className="bnr_mn">
          <Box className="bnr_lft">
            <h2>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been
            </h2>
            <Box className="crt_mn">
              <Box className="crt">
                <Button
                  onClick={() => onCreateCLick()}
                  variant="contained"
                  className="btn_sc"
                >
                  Create
                </Button>
              </Box>
              <Box
                onClick={() => router.push("/exploreCollection")}
                className="explr"
              >
                <h3>Explore</h3>
                <figure>
                  <img src={"/static/images/pin.svg"} alt=" " />
                </figure>
              </Box>
            </Box>
          </Box>
          <Box className="bnr_ryt">
            <figure className="ntbl_mg">
              <Image
                layout="responsive"
                height={"25%"}
                width={"35%"}
                src={"/static/images/banner.png"}
                alt=" "
              />
            </figure>
          </Box>
        </Box>
      </Box>
      <Box className="stp_mg">
        <figure>
          <Image
            height={"10%"}
            width={"100%"}
            layout="responsive"
            src={"/static/images/stp.png"}
            alt=" "
          />
        </figure>
      </Box>
    </Box>
  );
};
