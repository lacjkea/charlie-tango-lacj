import Head from "next/head";
import { Header } from "@/components/Header/Header.jsx";
import { useRouter } from "next/router";
import { useState } from "react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const shouldRenderComponent =
    router.pathname !== "/dashboard" && router.pathname !== "/thanks";
  // function nextStep(e) {
  //   e.preventDefault();
  //   setCurrentStep(currentStep + 1);
  // }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        shouldRender={shouldRenderComponent}
      />
      <main>
        {(shouldRenderComponent && (
          <Component
            {...pageProps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )) || <Component {...pageProps} />}
      </main>
    </>
  );
}
