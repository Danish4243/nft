import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import {
  Section1,
  ExploreCollections,
  Figures,
  NotableDrops,
  TopCollections,
  TrendingCategories,
  CreateAndSellNFT,
  GettingStarted,
  BrowseCategory,
  VideoSection,
} from "../../features/home";
import { Header } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getAppSettingAction, tempData } from "../../redux/actions";

const LandingPage = () => {
  const dispatch = useDispatch();

  const tempoData = useSelector((state) => state.authReducer.tempData);
  const appData = useSelector((state) => state.nftReducer.appSettingData);

  useEffect(() => {
    dispatch(getAppSettingAction.request("Sha25ab42a76a35ec42"));
    dispatch(tempData.updateTempData(null));
  }, []);

  return (
    <Box sx={{}} className=" trnd_crd">
      <Header />
      {/* section1 */}
      <Section1 />
      {/* section2 */}
      <Figures />
      {/* section3 */}
      <ExploreCollections />
      {/* section */}
      <Box className="all_sec">
        {/* section4 */}
        <NotableDrops />
        {/* section5 */}
        <TopCollections />
        {/* section6 */}
        <TrendingCategories />
        {/* section7 */}
        <CreateAndSellNFT />
        {/* section8 */}
        <GettingStarted />
        {/* section9 */}
        <BrowseCategory />
        {/*section10*/}
        <VideoSection />
      </Box>
    </Box>
  );
};

export default LandingPage;
