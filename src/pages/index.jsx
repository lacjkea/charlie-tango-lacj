import Head from "next/head";
// import styles from "./Home.module.css";
import cstyles from "./../styles/Common.module.css";
import { estateTypes } from "@/data/estateTypes";
import { useRef, useState, useEffect } from "react";
import { priceFormatter } from "@/data/buyerProfiles";

export default function Home({ currentStep, setCurrentStep }) {
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState(50);
  // const inputRangePriceEl = useref(null);
  const inputTextPriceEl = useRef(null);
  const inputTextSizeEl = useRef(null);

  const formEl = useRef(null);

  useEffect(() => {
    setCurrentStep(1);
    sessionStorage.clear();
  }, [setCurrentStep]);

  function updatePrice(e) {
    setPrice(e.target.value);
    // setPrice(priceFormatter.format(e.target.value));
    // console.log("hey", inputTextPriceEl);
    // inputTextPriceEl.current.focus();
  }

  function updateSize(e) {
    setSize(e.target.value);
    // console.log("hey", inputTextPriceEl);
    // inputTextSizeEl.current.focus();
  }

  function focusHere(e) {
    console.log(e.currentTarget.focus());
  }

  //quick fix... ugly?
  function setSellerEstateInfo(e) {
    // e.preventDefault();
    console.log(formEl.current.elements);
    const formValues = formEl.current.elements;
    sessionStorage.setItem("zipCode", formValues.zipCode.value);
    sessionStorage.setItem("estateType", formValues.estateType.value);
    sessionStorage.setItem("size_m2", formValues.size_m2.value);
    sessionStorage.setItem("price", formValues.price.value);
  }

  estateTypes.sort((a, b) => (a.name > b.name ? 1 : -1));
  // console.log(estateTypesSorted);

  return (
    <>
      <Head>
        <title>1:4 Sælg din bolig | EDC</title>
      </Head>
      <div className="wrapper">
        <h1 className={cstyles.headline}>
          1. Sælg din <span className={cstyles.accent}>bolig</span>
        </h1>
        <div className={cstyles.content}>
          <h2>Information om din bolig</h2>
          {/* Read this: https://nextjs.org/docs/guides/building-forms (they said) */}
          <form
            action="/buyers"
            method="GET"
            className={cstyles.form + " sell"}
            autoComplete="on"
            ref={formEl}
          >
            <label>
              <span className={cstyles.label}>Postnummer *</span>
              <input
                name="zipCode"
                type="text"
                minLength="3"
                maxLength="4"
                inputMode="numeric"
                pattern="[0-9]{3,4}"
                title="The Zip Code should be digits (0 to 9)."
                // defaultValue="2500"
                required
              />
              {/* Danmarks postnumre har fire sifre, med unntak av noen spesielle
              koder med tre sifre og https://www.dst.dk/da/TilSalg/Forskningsservice/Dokumentation/hoejkvalitetsvariable/folketal/postnr*/}
            </label>
            <label>
              <span className={cstyles.label}>Boligtype *</span>
              <select
                name="estateType"
                id="estatetype-select"
                // size="4"
                title="Please select a type from this list"
                defaultValue={"8"}
                required
              >
                {estateTypes.map((estate) => {
                  /*   {
                    console.log(estate);
                  } */
                  return (
                    <option key={estate.id} value={estate.id}>
                      {estate.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <label htmlFor="size_m2">
              <span className={cstyles.label}>Størrelse *</span>
              <div className={cstyles.centerbox}>
                <input
                  onChange={updateSize}
                  id="size_m2"
                  name="size_m2"
                  type="text"
                  ref={inputTextSizeEl}
                  // defaultValue={50}
                  value={size}
                  minLength="2"
                  maxLength="4"
                  inputMode="numeric"
                  title="The size in square meters should be digits (0 to 9)."
                  pattern="[0-9]{2,4}"
                  required
                />
                <span>
                  m<sup>2</sup>
                </span>
                <input
                  // name="noname"
                  onChange={updateSize}
                  type="range"
                  aria-hidden="true"
                  tabIndex="-1"
                  value={size}
                  min="0"
                  max="500"
                  step="1"
                ></input>
              </div>
            </label>
            <label htmlFor="price">
              <span className={cstyles.label}>Forventet pris</span>
              <div className={cstyles.centerbox}>
                <input
                  id="price"
                  name="price"
                  type="text"
                  onChange={updatePrice}
                  value={price || 1000000}
                  ref={inputTextPriceEl}
                  inputMode="numeric"
                  pattern="[0-9]+"
                  title="The price should be digits (0 to 9)."
                />
                <span>kr.</span>

                <input
                  // name="noname"
                  onChange={updatePrice}
                  inputMode="none"
                  type="range"
                  aria-hidden="true"
                  tabIndex="-1"
                  value={price || 1000000}
                  min="0"
                  max="20000000"
                  step="50000"
                ></input>
              </div>
            </label>
            <button
              className={cstyles.button}
              onClick={setSellerEstateInfo}
              type="submit"
            >
              Find købere
            </button>
          </form>
        </div>
        <div className="hidden">
          <h3>To do</h3>
          <ul>
            <li>Full address?</li>
            <li>...or only zip?</li>
          </ul>
          <p>
            This is simple example of how you could submit a form to another
            page in Next.js, without using a custom <code>submit</code> function
            (e.g. without JavaScript). It is unstyled and unfinished. You can
            use this as base, or implement your own solution.
          </p>
          <p>
            Make sure to read the guide on{" "}
            <a
              href="https://nextjs.org/docs/guides/building-forms"
              target="_blank"
            >
              building forms in Next.js
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
