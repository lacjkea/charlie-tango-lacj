import Head from "next/head";
// import styles from "./Home.module.css";
import cstyles from "@/styles/Common.module.css";
// import { estateTypes } from "@/data/estateTypes";
import { useEffect } from "react";

export default function Thanks({ setCurrentStep }) {
  useEffect(() => {
    setCurrentStep(4);
  }, [setCurrentStep]);

  return (
    <>
      <Head>
        <title>4:4 Vi kontakter dig | EDC</title>
      </Head>
      <div className="wrapper">
        <h1 className={cstyles.headline}>
          4. Vi <span className={cstyles.accent}>kontakter</span> dig
        </h1>
        <div className={cstyles.content}>
          <h3>Tak skal du have.</h3>
          <p>
            Vi kontakter dig indenfor 1-2 hverdage med mere information om
            potentielle købere af din bolig.
          </p>
        </div>
      </div>
    </>
  );
}
