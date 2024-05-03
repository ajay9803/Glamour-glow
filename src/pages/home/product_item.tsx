import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import ProductDetailsSidebar from "./product_details_bar";
import { ProductType } from "./end_of_year_section";

const ProductItem: React.FC<{product: ProductType}> = (props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="flex flex-col justify-start w-full">
      {showMenu && (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
          }}
          className="fixed top-0 right-0 h-full w-screen bg-black bg-opacity-80 z-40"
          onClick={toggleMenu}
        ></div>
      )}
      <ProductDetailsSidebar
        isOpen={showMenu}
        toggleSidebar={toggleMenu}
        product={props.product}
      ></ProductDetailsSidebar>
      <div
        onClick={toggleMenu}
        className="h-52 lg:h-72 w-full relative overflow-hidden rounded-xl shadow-sm shadow-black scale-95 hover:scale-100 transition-all"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          className={`object-cover h-52 lg:h-72 w-full rounded-xl hover:cursor-pointer transition-transform duration-700 ${
            isHovered ? "scale-125" : "scale-100"
          }`}
          src="https://i.pinimg.com/736x/a8/5d/24/a85d246e5ae96c617cf95a20161852e8.jpg"
          alt="product"
        />
        <div
          onClick={toggleMenu}
          className={`absolute h-8 w-8 rounded-full bg-gray-500 cursor-pointer ${
            isHovered ? "opacity-50 scale-100" : "opacity-0 scale-0"
          } bottom-5 right-5 flex flex-row justify-center items-center transition-all duration-300`}
        >
          <FontAwesomeIcon
            className="text-black"
            icon={faSearch}
          ></FontAwesomeIcon>
        </div>
      </div>
      <p className="tracking-wider text-gray-400 mt-3 mb-2">
        L.A Colors Gel Eye
      </p>
      <Rating name="simple-controlled" value={5} readOnly size="small" />
      <p className="tracking-wide font-semibold mt-1"> Rs. 99.00</p>
    </div>
  );
};

export default ProductItem;
