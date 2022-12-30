import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Header, TrendingCategoryCard } from "../components";
import LandingPage from "./home";
import { Box } from "@material-ui/core";
import { useEffect } from "react";

// import "animate.compat.css";

export default function Home() {
  return (
    <Box>
      <Head>
        <title>NFT Marketplace</title>
        <meta name="description" content="NFT marketplace" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </Head>

      {/* <TrendingCategoryCard /> */}
      <LandingPage />
    </Box>
  );
}
