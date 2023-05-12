import Head from "next/head";
import Link from "next/link";
// import styles from "./Home.module.css";
import cstyles from "@/styles/Common.module.css";
// import { estateTypes } from "@/data/estateTypes";
import { useEffect } from "react";

export default function Thanks({ setCurrentStep }) {
  /*export default function Thanks({ setCurrentStep }) {
     useEffect(() => {
    setCurrentStep(4);
  }, [setCurrentStep]); */

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
          <h2>Tak skal du have.</h2>
          <p>
            Vi kontakter dig indenfor 1-2 hverdage med mere information om
            potentielle købere af din bolig.
          </p>
        </div>
      </div>
      <footer>
        For Demo purposes: <Link href="/dashboard">Dashboard</Link>
        <h3>To do - dette er undervejs</h3>
        <ol>
          <li>Validering... halvfuld kop?</li>
          <li>
            Accessibility: tjek BBC&apos;s kontrastværktøj - og stepperen...
            links med <code>pointer-events: none;</code> og validering...
          </li>
          <li>CSS og code splitting - købersiden ser ikke så flot ud</li>
          <li>Tjek session storage på tværs af .jsx (det er noget rod)</li>
          <li>Sprog - multiple</li>
          <li>
            Tjekke hoveddokumentet for guidelines (og genoprette det givne fra
            udgangspunktet) - det er ikke fulgt så nøje
          </li>
        </ol>
      </footer>
    </>
  );
}
