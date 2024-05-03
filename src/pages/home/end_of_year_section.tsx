import React from "react";
import "../../styles/end_of_year_section.css";
import ProductItem from "./product_item";

const EndOfYearSection: React.FC = () => {
  const products = [1, 2, 3, 4, 5, 6];
  return (
    <div className="flex flex-1 flex-col w-full py-10">
      <p className="font-bold tracking-wider text-3xl mb-8">
        {" "}
        End of the Year Sale{" "}
      </p>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-5">
        {products.map((product) => {
          return <ProductItem></ProductItem>;
        })}
      </div>
    </div>
  );
};

export default EndOfYearSection;
