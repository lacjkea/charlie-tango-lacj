import Head from "next/head";
// import styles from "./Home.module.css";
import cstyles from "./../styles/Common.module.css";
import { estateTypes } from "@/data/estateTypes";
import { useRef, useState } from "react";

export default function Home() {
  const [price, setPrice] = useState(0);
  // const inputRangePriceEl = useref(null);
  const inputTextPriceEl = useRef(null);

  function updatePrice(e) {
    setPrice(e.target.value);
    // console.log("hey", inputTextPriceEl);
    inputTextPriceEl.current.focus();
  }

  return (
    <>
      <Head>
        {/*      <title>1 - Find buyer | EDC</title> */}
        <title>1:4 Sælg din bolig | EDC</title>
      </Head>
      <div className="wrapper">
        <div className={cstyles.content}>
          <h1 className={cstyles.headline}>
            1. Sælg <span className={cstyles.accent}>din</span> gamle bolig -
            v.23:14
          </h1>
          {/* Read this: https://nextjs.org/docs/guides/building-forms (they said) */}
          <form
            action="/buyers"
            method="GET"
            className={cstyles.form + " sell"}
            autoComplete="on"
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
                defaultValue="2500"
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
            <label>
              <span className={cstyles.label}>
                Størrelse i kvadrameter (m<sup>2</sup>) *
              </span>
              <input
                name="size_m2"
                type="text"
                defaultValue={40}
                minLength="2"
                maxLength="4"
                inputMode="numeric"
                title="The size in square meters should be digits (0 to 9)."
                pattern="[0-9]{2,4}"
                required
              />
            </label>
            <label htmlFor="price">
              <span className={cstyles.label}>Forventet pris</span>
              <input
                // name="noname"
                onChange={updatePrice}
                type="range"
                value={price || 1000000}
                min="0"
                max="20000000"
                step="50000"
              ></input>
              <div className={cstyles.centerbox}>
                <input
                  name="price"
                  type="text"
                  onChange={updatePrice}
                  value={price || 1000000}
                  ref={inputTextPriceEl}
                  inputMode="numeric"
                  pattern="[0-9]+"
                  title="The price should be digits (0 to 9)."
                />
                <span>DKK</span>
              </div>
            </label>
            <button className={cstyles.button} type="submit">
              Find købere
            </button>
          </form>
        </div>
        <h3>To do</h3>
        <ul>
          <li>Full address?</li>
          <li>...or only zip?</li>
        </ul>
        <p>
          This is simple example of how you could submit a form to another page
          in Next.js, without using a custom <code>submit</code> function (e.g.
          without JavaScript). It is unstyled and unfinished. You can use this
          as base, or implement your own solution.
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
    </>
  );
}
