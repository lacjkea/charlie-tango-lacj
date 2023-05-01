import { generateBuyerProfiles } from "@/data/buyerProfiles";

/**
 * Next.js API route support: https://nextjs.org/docs/api-routes/introduction
 * @param req {import('next').NextApiRequest}
 * @param res {import('next').NextApiResponse}
 */
export default function handler(req, res) {
  // Basic example of how you can create an API route.
  // You can open the browser, and go to http://localhost:3000/api/find-buyers to see the response.

  // Find the zip code from the query parameters, and use it to generate a list of (fake) buyer profiles.
  const zipCode = parseInt(req.query.zipCode || "2100");
  const price = parseInt(req.query.price || "1000000");
  const size = parseInt(req.query.size || "100");
  const estateTypeID = req.query.estateType || "7";
  // const estateType = parseInt(req.query.estateType) || "7";

  // const size = "35";
  const profilesForZipCode = generateBuyerProfiles({
    zipCode,
    price,
    size,
    estateTypeID,
  });

  // Set the cache headers, so that the response can be cached
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  /*   res.setHeader(
    "Cache-Control",
    "private, no-cache, no-store, must-revalidate"
  ); */

  // Make sure to filter out profiles based on the other query parameters. e.g. minSize, maxPrice, etc.
  return res.status(200).json(profilesForZipCode);
}
