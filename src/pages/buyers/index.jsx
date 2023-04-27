import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import cstyles from "./../../styles/Common.module.css"; //lacj - what?
import styles from "./Buyers.module.css";
import { getEstateType } from "@/data/estateTypes";

export default function Buyers() {
  const [buyers, setBuyers] = useState([]);
  const { query } = useRouter();
  console.log("query", query);
  console.log("zipCode", query.zipCode);
  // console.log("query estateType", query.estateType);
  //https://charlie-tango-lacj.vercel.app/api/find-buyers?zipCode=${query.zipCode}
  useEffect(() => {
    fetch(`../api/find-buyers?zipCode=${query.zipCode}`)
      .then((res) => res.json())
      .then((data) => {
        setBuyers(data); //lacj clean up data
      });
  }, [query.zipCode]);

  /* 
  adults: 1
children: 1
description: "Single parent is looking for a Helårsgrund with a minimum size of 84 m2 and a maximum price of 4.300.000 kr. Libero ullam totam quod quod."
estateType: "7"
id: "38e485a2"
maxPrice: 4300000
minSize: 84
takeoverDate: "2023-05-29" 
*/

  return (
    <>
      <Head>
        <title>2:4 Vælg købere | EDC</title>
      </Head>
      <div className="wrapper">
        <div className={styles.content}>
          <h1 className={cstyles.headline}>
            2. Vælg <span className={cstyles.accent}>dine</span> potentielle
            købere
          </h1>
          <form action="/contact" method="GET" className={cstyles.form}>
            <div className={styles["buyer-cards"]}>
              {buyers.map((singleBuyer) => (
                <label className={styles["buyer-card"]} key={singleBuyer.id}>
                  {console.log(singleBuyer)}
                  <article>
                    <p>{singleBuyer.id}</p>
                    <p>{getEstateType(singleBuyer.estateType)}</p>
                    <p>Take over date: {singleBuyer.takeoverDate}</p>
                    <p>
                      Household of{" "}
                      {singleBuyer.adults + singleBuyer.children - 1
                        ? singleBuyer.adults + singleBuyer.children + " people"
                        : "1 person"}
                    </p>
                    <p>{singleBuyer.description}</p>
                    <input
                      type="checkbox"
                      value={singleBuyer.id}
                      name="contact_ids" //lacj
                    />
                  </article>
                </label>
              ))}
            </div>
            <button className={cstyles.button}>
              Confirm buyers you&#39;d like to get in touch with
            </button>
          </form>
          <p>
            On this page you get the <code>`query`</code> params like{" "}
            <code>`zipCode`</code>, and can use them to fetch a list of buyers
            from the API.
          </p>
          <p>
            Make sure to read the docs on how to fetch data on a page - There
            are multiple ways of doing it, and you should choose the one that
            fits your solution best.
          </p>
          <ul>
            <li>
              <a
                href="https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props"
                target="_blank"
              >
                next.js - Data fetching
              </a>
            </li>
            <li>
              <a
                href="https://react.dev/learn/synchronizing-with-effects#fetching-data"
                target="_blank"
              >
                react.dev - Fetching data
              </a>
            </li>
          </ul>
          <div className={styles.content}>
            <h2>Query params:</h2>
            <pre>
              <code>{JSON.stringify(query, null, 2)}</code>
            </pre>
          </div>
        </div>
      </div>
      {/* wrapper */}
      <main></main>
    </>
  );
}
