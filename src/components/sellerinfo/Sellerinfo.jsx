import { getEstateName } from "@/data/estateTypes";
import { priceFormatter } from "@/data/buyerProfiles";
export default function Sellerinfo({ seller_estate_info }) {
  // console.log("props", seller_estate_info);
  // console.log("selleringo", seller_estate_info);
  return (
    <section>
      <p>
        {getEstateName(seller_estate_info.estateType)} på{" "}
        {seller_estate_info.size_m2} m<sup>2</sup> i{" "}
        {seller_estate_info.zipCode}
      </p>
      <p>Forventet pris: {priceFormatter.format(seller_estate_info.price)}</p>
      <p></p>
      {/* <p>{getEstateName(seller_estate_info.estateType)}</p> */}
      {/* estateType : "8" price : "1000000" size_m2 : "50" zipCode : "2500" */}
    </section>
  );
}
