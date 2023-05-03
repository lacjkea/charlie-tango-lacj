"use client";
import Image from "next/image";
import { getEstateName } from "@/data/estateTypes";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import DOMPurify from "dompurify";
import cstyles from "./../../styles/Common.module.css";
import styles from "./Buyers.module.css";
import { priceFormatter } from "@/data/buyerProfiles";
import iconBoligtype from "./../../assets/icon-boligtype.svg";
import iconMinArea from "./../../assets/icon-min-area.svg";
import iconBudget from "./../../assets/icon-budget.svg";
import iconFamily from "./../../assets/icon-family.svg";
import iconCalendar from "./../../assets/icon-calendar.svg";
import { displayDate } from "@/data/helpers";

// console.log(iconBoligtype);
export default function Buyers({ currentStep, setCurrentStep }) {
  const router = useRouter();
  // console.log("router", router);

  // console.log("query", query);
  const [buyers, setBuyers] = useState([]);
  const headlineRef = useRef(null);
  const zipcodeRef = useRef(null);

  // console.log("pricematter", priceFormatter.format(2000));

  //console.log("currentStep!", currentStep);

  // console.log("zipCode", query.zipCode);
  // console.log("query estateType", query.estateType);
  //https://charlie-tango-lacj.vercel.app/api/find-buyers?zipCode=${query.zipCode}
  const q = router.query;
  // /* const displayZipCode = useRef(null);
  // displayZipCode = q.zipCode; */
  // const displayEstateName = useRef(getEstateName(q.estateType) + "-");
  // const headlinetemp = `${getEstateName(sessionStorage.getItem("estateType")
  // ) || "2200"}
  //

  // {sessionStorage.getItem("zipCode")}`;
  // {/* {console.log("q.estateType", q.estateType)} */} i{" "}
  useEffect(() => {
    const headline = getEstateName(
      sessionStorage.getItem("estateType")
    ).toLowerCase();
    headlineRef.current.textContent = headline;

    zipcodeRef.current.textContent = sessionStorage.getItem("zipCode");

    // cons    zipCodeRef;

    // setZipCode(tempZipCode);

    // )
    setCurrentStep(2);
    if (sessionStorage.getItem("buyers")) {
      // setBuyers(JSON.parse())
      // console.log("BBBB", s+ essionStorage.getItem("buyerinfo"));
      setBuyers(JSON.parse(sessionStorage.getItem("buyers")));
    }
    // if (router.isReady) {
    if (q && q.zipCode) {
      console.log("q", q);
      fetch(
        `../api/find-buyers?zipCode=${q.zipCode}&estateType=${q.estateType}&size=${q.size_m2}&price=${q.price}`
      )
        .then((res) => res.json())
        .then((data) => {
          handleFetched(data); //lacj todo: clean up data
        });
    }
    // sessionStorage.setItem("sellerinfo", )
    // }, [q, router, setCurrentStep]);
  }, [q]);

  function handleFetched(data) {
    // console.log(data);
    sessionStorage.setItem("sellerinfo", JSON.stringify(router.query));
    sessionStorage.setItem("queryString", router.asPath);
    setBuyers(data);
    sessionStorage.setItem("buyers", JSON.stringify(data));
    setBuyers(data);
  }

  return (
    <>
      <Head>
        <title>2:4 Vælg købere | EDC</title>
      </Head>

      <div className="wrapper">
        <h1 className={cstyles.headline}>
          2. Vælg
          <Image
            src={iconBoligtype}
            alt=""
            aria-hidden="true"
            width={48}
            height={48}
          />
          <span ref={headlineRef}></span>-
          <span className={cstyles.accent}>købere</span> i{" "}
          <span ref={zipcodeRef}></span>
        </h1>
        <div className={cstyles.content}>
          <h3>Vælg købere, du gerne vil i kontakt med</h3>
          <form action="/contact" method="GET" className={cstyles.form}>
            <div className={styles["buyer-cards"]}>
              {buyers.map((singleBuyer) => (
                <label className={styles["buyer-card"]} key={singleBuyer.id}>
                  {console.log(singleBuyer)}
                  <article>
                    <input
                      className="visual-hidden"
                      type="checkbox"
                      value={singleBuyer.id}
                      name="contact_ids" //lacj
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        // fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M12 18.573l6.894-7.015a3.898 3.898 0 0 0 0-5.44 3.698 3.698 0 0 0-5.298 0L12 7.742l-1.596-1.624a3.698 3.698 0 0 0-5.298 0 3.898 3.898 0 0 0 0 5.44L12 18.573z"
                      />
                    </svg>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          singleBuyer.description.replace("m2", "m<sup>2</sup>")
                        ),
                      }}
                    />
                    {/*             <p>
                        {singleBuyer.description.replace("m2", "m<sup>2</sup>")}
                      </p> */}
                    {/* <div>
                      <Image src={iconBoligtype} alt="" aria-hidden="true" />
                      <p>{getEstateName(singleBuyer.estateType)}</p>
                    </div> */}
                    {/* prettier-ignore */}
                    <div>
                      <Image src={iconMinArea} alt="" aria-hidden="true" />
                      <p>min. {singleBuyer.minSize} <span>m<sup>2</sup></span>
                      </p>
                    </div>
                    <div>
                      <Image src={iconBudget} alt="" aria-hidden="true" />
                      <p>max. {priceFormatter.format(singleBuyer.maxPrice)}</p>
                    </div>
                    <div>
                      <Image src={iconCalendar} alt="" aria-hidden="true" />
                      <p>
                        Overtagelse fra {displayDate(singleBuyer.takeoverDate)}
                      </p>
                    </div>
                    <div>
                      <Image src={iconFamily} alt="" aria-hidden="true" />
                      <p>
                        {singleBuyer.adults + singleBuyer.children - 1
                          ? `Familie på ${
                              singleBuyer.adults + singleBuyer.children
                            }`
                          : //personer`
                            "1 person"}
                      </p>
                    </div>
                    <p>Ref. {singleBuyer.id}</p>
                  </article>
                </label>
              ))}
            </div>
            <button className={cstyles.button}>Gem potentielle købere</button>
          </form>

          {/*   <div className={styles.content}>
            <h2>Query params:</h2>
            <pre>
              <code>{JSON.stringify(query, null, 2)}</code>
            </pre>
          </div> */}
        </div>
      </div>
      {/* wrapper */}
    </>
  );
}
