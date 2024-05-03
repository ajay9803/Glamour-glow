import React, { useEffect, useRef } from "react";
import FreeDeliveryComp from "./free_delivery_comp";
import ProductDetailsComp from "./product_details_comp";

const ProductDetails: React.FC = () => {
  const scrollRef = useRef(0);
  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  }, []);
  return (
    <div className="flex flex-col w-full my-10">
      <FreeDeliveryComp></FreeDeliveryComp>
      <ProductDetailsComp></ProductDetailsComp>
    </div>
  );
};

export default ProductDetails;
