import React from "react";
import "../../styles/end_of_year_section.css";
import ProductItem from "./product_item";

export type ProductType = {
  id: string;
  type: string;
  name: string;
  image: string;
  price: number;
};

const EndOfYearSection: React.FC = () => {
  const products = [
    {
      id: "1",
      type: "type",
      name: "item 1",
      image:
        "https://i.pinimg.com/564x/9e/d9/40/9ed9403b1f6ede771a91c9bbfa7a8717.jpg",
      price: 100,
    },
    {
      id: "2",
      type: "type",
      name: "item 2",
      image:
        "https://6.soompi.io/wp-content/uploads/image/c5ecb3670e48406eaa5345536444a444/dummy.jpeg?s=900x600&e=t",
      price: 100,
    },
    {
      id: "3",
      type: "type",
      name: "item 3",
      image:
        "https://m.media-amazon.com/images/M/MV5BMWMyMmFhMzUtYWJmNC00MzdkLWFjYTYtZDI1ZDQ2MzBkOTZlXkEyXkFqcGdeQXVyMjIyNzU0OA@@._V1_.jpg",
      price: 100,
    },
    {
      id: "4",
      type: "type",
      name: "item 4",
      image:
        "https://0.soompi.io/wp-content/uploads/2023/06/01205649/kim-tae-ri2.jpg",
      price: 100,
    },
    {
      id: "5",
      type: "type",
      name: "item 5",
      image:
        "https://lh3.googleusercontent.com/proxy/FHjr2GRQqdn5fBddkk9Nk-77lkEAbOAA5DEwkNa2ng9O5EQQvDuSNUXnRlqqJGVW3rJ4gU59CE1Av5vBr7h-M0bNDkQeI9Xr6QBA18oK8Ce4moFmVLj1B-g8nVk",
      price: 100,
    },
  ];
  return (
    <div className="flex flex-1 flex-col w-full py-10">
      <p className="font-bold tracking-wider text-3xl mb-8">
        {" "}
        End of the Year Sale{" "}
      </p>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-5">
        {products.map((product) => {
          return <ProductItem product={product}></ProductItem>;
        })}
      </div>
    </div>
  );
};

export default EndOfYearSection;
