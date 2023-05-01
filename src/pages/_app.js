import Head from "next/head";
import { Header } from "@/components/Header/Header";
import { useState } from "react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [currentStep, setCurrentStep] = useState(5);

  // function nextStep(e) {
  //   e.preventDefault();
  //   setCurrentStep(currentStep + 1);
  // }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <main>
        <Component
          {...pageProps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </main>
    </>
  );
}
