import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import cstyles from "./../../styles/Common.module.css";
// import styles from "./Contact.module.css";
// import { getEstateType } from "@/data/estateTypes";

export default function Contact({ currentStep, setCurrentStep }) {
  const [contactList, updateList] = useState([]);
  const formEl = useRef(null);

  const submitBtn = useRef(null);
  const router = useRouter();
  // const contact_ids = router.query.contact_ids;
  // console.log("query", router);
  useEffect(() => {
    setCurrentStep(3);
    if (router.isReady) {
      router.query.contact_ids &&
      updateList(router.query.contact_ids);
      console.log("loglist", router.query.contact_ids);
    }
  }, [router.isReady, router.query.contact_ids, setCurrentStep]);
  //   const contact_ids = query.contact_ids;
  /* const [contactList, updateList] = useState([
    "9751a565",
    "8b9098de",
    "0678a67a",
  ]); */
  //   console.log(contactList);
  //   console.log("contact_ids", query.contact_ids);

  //lacj - hardcoded for now:
  /* const buyers = [
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
  ]; */

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
    submitBtn.current.disabled = true;
    console.log(formEl.current.elements);
    const formValues = formEl.current.elements;
    console.log("contactids", formValues.contacts);

    let final_contact_hiddenform_ids = [];
    formValues.contacts &&
      formValues.contacts.forEach((ct) => {
        console.log(ct.value);
        final_contact_hiddenform_ids.push(ct.value);
      });

    // console.log("final_contact_ids", final_contact_ids);
    // return false;

    // construct an Object for supabase
    const payload = {
      fname: formValues.fname.value,
      email: formValues.email.value,
      phone: formValues.phone.value,
      contactids: final_contact_hiddenform_ids,
      consent: formValues.consent.value,
      message: formValues.message.value,
      seller_estate_info: sessionStorage.getItem("sellerinfo"),
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
        //submit the form if everything is OK
        e.target.submit();
      }
    }
  }

  return (
    <>
      <Head>
        <title>3:4 Din Kontaktinfo | EDC</title>
      </Head>
      <div className="wrapper">
        <h1 className={cstyles.headline}>
          3. Din <span className={cstyles.accent}>kontaktinfo</span>rmation
        </h1>
        <div className={cstyles.content}>
          <h3>
            Giv os dine kontaktoplysninger for at få adgang til vores
            køberkartotek
          </h3>
          <form
            action="/thanks"
            onSubmit={submitted}
            method="GET"
            className={cstyles.form}
            ref={formEl}
            autoComplete="on"
          >
            {/* lacj */}
            <div className={cstyles["buyer-cards"]}>
              <ul className={cstyles.label}>
                {!contactList.length ? (
                  <>
                    <p>
                      <em>Ingen købere? </em>
                    </p>
                    <p>
                      Det tror vi ikke på. Skal vi hjælpe dig med at finde en
                      køber?
                    </p>
                  </>
                ) : (
                  contactList.map((singleContact) => (
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
                  ))
                )}
              </ul>
              <label>
                <span className={cstyles.label}>Dit navn *</span>
                <input type="text" name="fname" id="fname" required />
              </label>
              <label>
                <span className={cstyles.label}>Email *</span>
                <input type="email" name="email" id="email" />
              </label>
              <label>
                <span className={cstyles.label}>Telefon *</span>
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
                  className={cstyles.textarea}
                  name="message"
                  id="message"
                  cols="30"
                  rows="2"
                ></textarea>
              </label>

              <button className={cstyles.button} type="submit" ref={submitBtn}>
                Send din kontaktinformation til EDC
              </button>
            </div>
            {/* .buyer-cards */}
          </form>
          {/*        <h2>Query params:</h2>
            <pre>
              <code>{JSON.stringify(query, null, 2)}</code>
            </pre> */}
        </div>
      </div>
      {/* wrapper */}
    </>
  );
}
