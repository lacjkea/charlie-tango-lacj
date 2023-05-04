//https://nextjs.org/docs/api-routes/introduction

//endpoint: https://wqpfgnopllvzobndaooi.supabase.co/rest/v1/edc_dashboard_of_contacts'
//async??
export default async function handler(req, res) {
  // res.status(200).json({ id: req.query.id });
  let { id } = req.query;
  const response = await fetch(
    `https://wqpfgnopllvzobndaooi.supabase.co/rest/v1/edc_dashboard_of_contacts?id=eq.${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.LACJ_SUPABASE_KEY,
        Prefer: "return=representation",
      },
    }
  ).then((res) => res.json());
  // console.log("response API - delete", { response });
  //return res.redirect(307, "/thanks");
  return res.status(200).json({ response });
}
