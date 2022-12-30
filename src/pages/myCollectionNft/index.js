import { Box } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { toast } from "react-toastify";
import { Header, Loader } from "../../components";
import { getCollection_ById, tempData } from "../../redux/actions";

const MyCollectionNft = ({ marketplace, nft, account }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const temporaryData = useSelector((state) => state.authReducer.tempData);
  const collectionData = useSelector(
    (state) => state.nftReducer.collectionDataById
  );

  useEffect(() => {
    if (router?.query?.collectionId) {
      dispatch(getCollection_ById.request(router?.query?.collectionId));
    } else {
      router.back();
    }
  }, [router?.query]);

  const onClickNft = (item) => {
    let body = {
      nftId: item,
    };
    dispatch(tempData.updateTempData(body));
    router.push({
      pathname: `/nftdetail`,
      query: { nftId: item?._id },
    });
  };

  return (
    <Box className="collection_wrap ">
      <Header />
      <Loader isLoad={loading} />
      <Box
        style={{
          backgroundImage: `url(${
            collectionData?.data && collectionData?.data[0]?.bannerImage
              ? collectionData?.data[0]?.bannerImage
              : "/static/images/dummy.png"
          })`,
        }}
        className="col_img"
      >
        <Box className="conta_iner">
          <Box className="update_profile">
            <figure>
              <img
                src={
                  collectionData?.data && collectionData?.data[0]?.logoImage
                    ? collectionData?.data[0]?.logoImage
                    : "/static/images/dummy.png"
                }
              ></img>
            </figure>
          </Box>
        </Box>
      </Box>

      <Box className="conta_iner">
        <Box className="collection_name">
          <h2>{collectionData?.data && collectionData?.data[0]?.name}</h2>
          <p>
            {collectionData?.data && collectionData?.data[0]?.description
              ? collectionData?.data[0]?.description
              : ""}
          </p>
        </Box>
        <Box className="c-fdx">
          {collectionData?.data && collectionData?.data[0]?.nfts?.length ? (
            collectionData?.data[0]?.nfts?.map((item, index) => {
              {
                /* {items?.length ? (
            items?.map((item, index) => { */
              }
              return (
                <Box
                  key={index}
                  onClick={() => onClickNft(item)}
                  className="c-inr"
                >
                  <Box className="c-upr">
                    {item?.image && (
                      <figure>
                        <img
                          src={item?.image || "/static/images/dummy.png"}
                        ></img>
                      </figure>
                    )}
                    {item?.audio && (
                      <figure>
                        <audio poster={item?.thumbnail} controls>
                          <source src={item?.audio} />
                        </audio>
                      </figure>
                    )}
                    {item?.video && (
                      <figure>
                        <video
                          width="100%"
                          height="100%"
                          poster={item?.thumbnail}
                          controls
                        >
                          <source src={item?.video} />
                        </video>
                      </figure>
                    )}
                  </Box>

                  <Box className="lwr_fd">
                    <p>{item?.name}</p>
                  </Box>

                  {/* <Box>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      // className="btn_sc"
                      onClick={() => buyMarketItem(item)}
                    >
                      Buy
                    </LoadingButton>
                  </Box> */}
                </Box>
              );
            })
          ) : (
            <Box className="no_cntnt">
              <h2>No NFT's found under this collection</h2>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MyCollectionNft;
