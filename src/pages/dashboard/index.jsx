import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { displayDate } from "@/data/helpers";
import { useState, useEffect } from "react";
import SellerInfo from "@/components/sellerinfo/Sellerinfo";
import cstyles from "./../../styles/Common.module.css";
import dstyles from "./Dashboard.module.css";
import icon_delete from "@/assets/icon-input-close.svg";
import CheatAddEntryToDB from "./CheatAddEntryToDB";

export default function Dashboard() {
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      fetch("/api/get-dashboard-contactlist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => handleData(data.response));
      // console.log(sellers);
    }
  }, [router.isReady]);

  function handleData(data) {
    // console.group();

    // data.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
    console.log("datasorting", data);
    // console.groupEnd();
    setSellers(data);
    setIsLoading(false);
  }

  async function deleteEntry(e, id) {
    e.preventDefault();
    console.log("id", id);
    // console.log(e);
    fetch(`/api/delete-db-entry?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => removeFromUI(id));
  }

  /* GPT: using the functional update syntax of setSellers, we can pass in the previous state (oldList) and return the new state based on that previous state. This way we ensure that we are always working with the most up-to-date state of our array, even if multiple state updates occur in rapid succession. */

  function removeFromUI(theId) {
    setSellers((oldList) => oldList.filter((item) => item.id !== theId));
  }

  /*
  consent: true;
  contactids: (2)[("38e485a2", "a5c90dd4")];
  created_at: "2023-05-02T13:07:42.021212+00:00";
  email: "lassemand@hotmail.com";
  fname: "Lasse Claes Jacobsen";
  id: 50;
  message: "daf";
  phone: 123;
*/
  return (
    <>
      <Head>
        <title>Sælgere, oversigt | EDC</title>
      </Head>
      <CheatAddEntryToDB sellers={sellers} setSellers={setSellers} />
      <div className="wrapper">
        <h1 className={cstyles.headline}>Sælgere</h1>
        {isLoading ? (
          <p>Loading....</p>
        ) : (
          <div className={`${cstyles.content} ${dstyles.grid}`}>
            {console.log("sellers", sellers)}
            {sellers.length ? (
              sellers.map((s1) => {
                return (
                  <article
                    key={s1.id}
                    className={
                      s1.consent ? dstyles.consent_true : dstyles.consent_false
                    }
                  >
                    {console.log("s1.id", s1.id)}
                    <button
                      type="button"
                      onClick={(e) => deleteEntry(e, s1.id)}
                    >
                      <Image alt="delete" src={icon_delete}></Image>
                    </button>
                    <h6>
                      {s1.id} / {displayDate(s1.created_at, true)} / Consent:{" "}
                      {s1.consent ? "✓" : "NO!"}
                    </h6>
                    <h2>{s1.fname} sælger</h2>
                    {console.log("hey2", typeof s1.seller_estate_info)}
                    {console.log("hey3", s1.seller_estate_info)}
                    {/*    {typeof s1.seller_estate_info === "object" && ( */}
                    {/*     <SellerInfo
                    seller_estate_info={JSON.parse(s1.seller_estate_info)}
                  /> */}
                    {/* )} */}
                    <SellerInfo
                      seller_estate_info={JSON.parse(s1.seller_estate_info)}
                    />

                    <h3>Ønsker kontakt med følgende købere</h3>
                    {!s1.contactids.length ? (
                      <p>Ingen fundne købere</p>
                    ) : (
                      <ul>
                        {s1.contactids.map((contact) => {
                          // console.log("contact", contact);
                          return <li key={contact}>{contact}</li>;
                        })}
                      </ul>
                    )}
                    <p>
                      <Link
                        href={`mailto:${s1.email}?subject=EDC-hjælp til boligsalg&body=Ang... blabla`}
                        target="_blank"
                      >
                        {s1.email}
                      </Link>
                      <span> / </span>
                      <Link href={`tel:${s1.phone}`}>{s1.phone}</Link>
                    </p>
                    <p>Besked: {s1.message}</p>
                  </article>
                );
                // console.log(singleSeller);
              })
            ) : (
              <p>Databasen er tom - THE KEY?</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
