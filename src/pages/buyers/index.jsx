import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import cstyles from "./../../styles/Common.module.css";
import styles from "./Buyers.module.css";
import iconBoligtype from "./../../assets/icon-boligtype.svg";
import iconMinArea from "./../../assets/icon-min-area.svg";
import iconBudget from "./../../assets/icon-budget.svg";
import iconFamily from "./../../assets/icon-family.svg";
import iconCalendar from "./../../assets/icon-calendar.svg";
import { getEstateType } from "@/data/estateTypes";

// console.log(iconBoligtype);
export default function Buyers() {
  const router = useRouter();
  // console.log("query", query);
  const [buyers, setBuyers] = useState([]);

  // console.log("zipCode", query.zipCode);
  // console.log("query estateType", query.estateType);
  //https://charlie-tango-lacj.vercel.app/api/find-buyers?zipCode=${query.zipCode}
  useEffect(() => {
    if (router.query && router.query.zipCode) {
      fetch(`../api/find-buyers?zipCode=${router.query.zipCode}`)
        .then((res) => res.json())
        .then((data) => {
          setBuyers(data); //lacj clean up data
        });
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>2:4 Vælg købere | EDC</title>
      </Head>

      <div className="wrapper">
        <main>
          <div className={styles.content}>
            <h1 className={cstyles.headline}>
              2. Vælg købere i {router.query.zipCode}, du gerne vil i kontakt
              med
            </h1>
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
                      <p>{singleBuyer.description}</p>
                      <div>
                        <Image src={iconBoligtype} alt="" aria-hidden="true" />
                        {getEstateType(singleBuyer.estateType)}
                      </div>
                      <div>
                        <Image src={iconMinArea} alt="" aria-hidden="true" />
                        min. {singleBuyer.minSize} m<sup>2</sup>
                      </div>
                      <div>
                        <Image src={iconBudget} alt="" aria-hidden="true" />
                        max. {singleBuyer.maxPrice}
                      </div>
                      <div>
                        <Image src={iconCalendar} alt="" aria-hidden="true" />
                        Fra {singleBuyer.takeoverDate}
                      </div>
                      <div>
                        <Image src={iconFamily} alt="" aria-hidden="true" />

                        {singleBuyer.adults + singleBuyer.children - 1
                          ? `Familie på ${
                              singleBuyer.adults + singleBuyer.children
                            }`
                          : //personer`
                            "1 person"}
                      </div>
                      <p>Ref. {singleBuyer.id}</p>
                    </article>
                  </label>
                ))}
              </div>
              <button className={cstyles.button}>
                Confirm buyers you&#39;d like to get in touch with
              </button>
            </form>

            {/*   <div className={styles.content}>
            <h2>Query params:</h2>
            <pre>
              <code>{JSON.stringify(query, null, 2)}</code>
            </pre>
          </div> */}
          </div>
        </main>
      </div>
      {/* wrapper */}
    </>
  );
}
