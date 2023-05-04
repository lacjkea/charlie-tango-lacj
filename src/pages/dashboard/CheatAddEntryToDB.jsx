export default function CheatAddEntryToDB({ sellers, setSellers }) {
  function addAnEntry(e) {
    const payload = {
      fname: "Jonas",
      email: "spam@spam.dk",
      phone: "+4512345678",
      contactids: ["9751a565", "38e485a2"],
      consent: true,
      message: "hejdav!",
      seller_estate_info:
        '{"zipCode":"2500","estateType":"5","size_m2":"112","price":"1111111"}',
    };

    fetch("/api/add-contactlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => updateUI(data));
  }

  //F****** data.response
  function updateUI(data) {
    // console.log("updateUI", data);
    // console.log(typeof data);
    setSellers((oldList) => data.response.concat(oldList));
    // console.log("sellers", sellers[0].seller_estate_info);
    // debugger;
  }
  return <button onClick={addAnEntry}>Add an entry to DB</button>;
}
