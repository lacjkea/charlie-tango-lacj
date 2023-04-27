//https://nextjs.org/docs/api-routes/introduction

//endpoint: https://wqpfgnopllvzobndaooi.supabase.co/rest/v1/edc_dashboard_of_contacts'
//async??
export default async function handler(req, res) {
  //   res.status(200).json({ name: req.body });
  const response = await fetch(
    "https://wqpfgnopllvzobndaooi.supabase.co/rest/v1/edc_dashboard_of_contacts",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.LACJ_SUPABASE_KEY,
        Prefer: "return=representation",
      },
      body: JSON.stringify(req.body),
    }
  ).then((res) => res.json());
  console.log("response API", { response });
  //return res.redirect(307, "/thanks");
  return res.status(200).json({ response });
}
