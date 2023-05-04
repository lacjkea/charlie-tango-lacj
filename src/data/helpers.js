export function displayDate(goodFormat, wtimestamp = false) {
  //e.g. 2023-07-10
  //GPT
  // Opret et Date-objekt fra datostrengen
  const dato = new Date(goodFormat);

  // Opret en lokaliseret dato-string i det ønskede format
  let options = { day: "numeric", month: "long", year: "numeric" };
  if (wtimestamp) {
    //merge two objects by spreading the first
    options = {
      ...options,
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    // console.log(options);
  }
  const lokaliseretDatoString = dato.toLocaleDateString("da-DK", options);

  // Udskriv den lokaliserede dato-string i det ønskede format
  //   console.log(lokaliseretDatoString); // "10. juli 2023"
  return lokaliseretDatoString;
}
