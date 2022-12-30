import React from "react";
import { Box } from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { SliderWrapper } from "../../components";

export const NotableDrops = () => {
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    speed: 500,
    arrows: false,
    adaptiveHeight: true,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  };
  return (
    <Box className="conta_iner">
      <Box className="ntbl_hd">
        <h2>Notable Drops</h2>
      </Box>
      <Box>
        <SliderWrapper>
          <Slider {...settings}>
            <Box className="ntbl_drp">
              <figure className="ntbl_mg">
                <Image
                  height="60%"
                  width="40%"
                  layout="responsive"
                  src={"/static/images/ntbl1.png"}
                  alt=" "
                />
              </figure>
            </Box>
            <Box className="ntbl_drp">
              <figure className="ntbl_mg">
                <Image
                  height="60%"
                  width="40%"
                  layout="responsive"
                  src={"/static/images/ntbl2.png"}
                  alt=" "
                />
              </figure>
            </Box>
            <Box className="ntbl_drp">
              <figure className="ntbl_mg">
                <Image
                  height="60%"
                  width="40%"
                  layout="responsive"
                  src={"/static/images/ntbl3.png"}
                  alt=" "
                />
              </figure>
            </Box>
            <Box className="ntbl_drp">
              <figure className="ntbl_mg">
                <Image
                  height="60%"
                  width="40%"
                  layout="responsive"
                  src={"/static/images/ntbl1.png"}
                  alt=" "
                />
              </figure>
            </Box>
            <Box className="ntbl_drp">
              <figure className="ntbl_mg">
                <Image
                  height="60%"
                  width="40%"
                  layout="responsive"
                  src={"/static/images/ntbl2.png"}
                  alt=" "
                />
              </figure>
            </Box>
            <Box className="ntbl_drp">
              <figure className="ntbl_mg">
                <Image
                  height="60%"
                  width="40%"
                  layout="responsive"
                  src={"/static/images/ntbl3.png"}
                  alt=" "
                />
              </figure>
            </Box>
            <Box className="ntbl_drp">
              <figure className="ntbl_mg">
                <Image
                  height="60%"
                  width="40%"
                  layout="responsive"
                  src={"/static/images/ntbl1.png"}
                  alt=" "
                />
              </figure>
            </Box>
            <Box className="ntbl_drp">
              <figure className="ntbl_mg">
                <Image
                  height="60%"
                  width="40%"
                  layout="responsive"
                  src={"/static/images/ntbl2.png"}
                  alt=" "
                />
              </figure>
            </Box>
            <Box className="ntbl_drp">
              <figure className="ntbl_mg">
                <Image
                  height="60%"
                  width="40%"
                  layout="responsive"
                  src={"/static/images/ntbl3.png"}
                  alt=" "
                />
              </figure>
            </Box>
          </Slider>
        </SliderWrapper>
      </Box>
    </Box>
  );
};
