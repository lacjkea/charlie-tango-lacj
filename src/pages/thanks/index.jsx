import Head from "next/head";
// import styles from "./Home.module.css";
import cstyles from "./../../styles/Common.module.css";
import { estateTypes } from "@/data/estateTypes";
import { useEffect } from "react";

export default function Thanks({ setCurrentStep }) {
  useEffect(() => {
    setCurrentStep(4);
  }, [setCurrentStep]);

  return (
    <>
      <Head>
        <title>4:4 Tak skal du have | EDC</title>
      </Head>
      <div className="wrapper">
        <div className={cstyles.content}>
          <h1 className={cstyles.headline}>
            4. Tak skal <span className={cstyles.accent}>du</span> have
          </h1>
          <h2>Du hører fra os indenfor 1-2 hverdage.</h2>
        </div>
      </div>
    </>
  );
}
