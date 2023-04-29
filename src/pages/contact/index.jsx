import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import cstyles from "./../../styles/Common.module.css";
// import styles from "./Contact.module.css";
import { getEstateType } from "@/data/estateTypes";

export default function Contact() {
  const formEl = useRef(null);
  const { query } = useRouter();
  console.log("query", query);
  //   const contact_ids = query.contact_ids;
  //   const contact_ids = query.contact_ids;
  const [contactList, updateList] = useState([
    "9751a565",
    "8b9098de",
    "0678a67a",
  ]);
  //   console.log(contactList);
  //   console.log("contact_ids", query.contact_ids);

  //lacj - hardcoded for now:
  const buyers = [
    {
      id: "9751a565",
      maxPrice: 4300000,
      minSize: 84,
      adults: 2,
      children: 3,
      description:
        "Family is looking for a Andelsbolig with a minimum size of 84 m2 and a maximum price of 4.300.000 kr. Dolore molestiae voluptatibus tempore blanditiis maxime vero ipsam.",
      estateType: "8",
      takeoverDate: "2023-07-06",
    },
    {
      id: "38e485a2",
      maxPrice: 4300000,
      minSize: 84,
      adults: 1,
      children: 1,
      description:
        "Single parent is looking for a Andelsbolig with a minimum size of 84 m2 and a maximum price of 4.300.000 kr. Libero ullam totam quod quod.",
      estateType: "8",
      takeoverDate: "2023-06-03",
    },
  ];

  function removeContact(id) {
    console.log(id.singleContact);
    updateList((oldContactList) =>
      oldContactList.filter((onecontact) => {
        return onecontact !== id.singleContact; //lacj why return
      })
    );
  }

  function submitted(e) {
    e.preventDefault();
    console.log(formEl.current.elements);
    const formValues = formEl.current.elements;
    // console.log("contactids", formValues.contacts.values);

    let contact_ids = [];
    formValues.contacts.forEach((ct) => {
      console.log(ct.value);
      contact_ids.push(ct.value);
    });
    // console.log("cts", contact_ids);

    // return false;
    // alert("nononono");

    // construct an Object for supabase
    const payload = {
      fname: formValues.fname.value,
      email: formValues.email.value,
      phone: formValues.phone.value,
      contactids: contact_ids,
      consent: formValues.consent.value,
      message: formValues.message.value,
    };
    fetch("/api/add-contactlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => afterSubmit(data));
    function afterSubmit(data) {
      console.log("data", data.response);
      if (data.response.code) {
        alert(data.response.code + " " + data.response.message);
      } else {
        /*   alert("yas");
        console.log(e); */
        e.target.submit();
      }
    }
  }

  return (
    <>
      <Head>
        <title>3:4 Kontakt | EDC</title>
      </Head>
      <div className="wrapper">
        <div className={cstyles.content}>
          <h1 className={cstyles.headline}>3. Kontakt potentielle købere</h1>
          <form
            action="/thanks"
            onSubmit={submitted}
            method="GET"
            className={cstyles.form}
            ref={formEl}
          >
            {/* lacj */}
            <div className={cstyles["buyer-cards"]}>
              <ul className={cstyles.label}>
                {contactList.map((singleContact) => (
                  <li key={singleContact}>
                    <input
                      type="hidden"
                      name="contacts"
                      value={singleContact}
                    />
                    Ref: {singleContact}
                    <button
                      onClick={() => removeContact({ singleContact })}
                      type="button"
                    >
                      Fjern
                    </button>
                  </li>
                ))}
              </ul>
              <label>
                <span className={cstyles.label}>Name *</span>
                <input type="text" name="fname" id="fname" required />
              </label>
              <label>
                <span className={cstyles.label}>Email *</span>
                <input type="email" name="email" id="email" />
              </label>
              <label>
                <span className={cstyles.label}>Phone *</span>
                <input type="tel" name="phone" id="phone" />
                {/*  inputMode="numeric" */}
              </label>
              <label>
                <input type="checkbox" name="consent" id="consent" value="1" />
                Ja tak. EDC må gerne kontakte mig med (andre?) tilbud og
                information relateret til ejendomshandel.
              </label>
              <label htmlFor="message">
                <span className={cstyles.label}>Evt. besked</span>
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="10"
                ></textarea>
              </label>

              <button className={cstyles.button} type="submit">
                Kontakt købere
              </button>
            </div>
            {/* .buyer-cards */}
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
          <div className={cstyles.content}>
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