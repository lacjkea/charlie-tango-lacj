import Head from "next/head";
// import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import cstyles from "./../../styles/Common.module.css";

export default function Dashboard() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    fetch("../api/get-dashboard-contactlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => handlefetchedData(data));
    // console.log(sellers);
  }, []);

  function handlefetchedData(data) {
    // console.log("data", data.response);
    setSellers(data.response);
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
      <div className="wrapper">
        <h1 className={cstyles.headline}>Sælgere</h1>
      </div>
      <div className={cstyles.content}>
        {sellers.map((singleSeller) => {
          <article>
            
          </article>
          // console.log(singleSeller);
        })}
      </div>
    </>
  );
}
