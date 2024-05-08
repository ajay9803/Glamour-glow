import {
  faSearch,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import ProductDetailsSidebar from "../home/product_details_bar";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

export type TheProductType = {
  id: string;
  brand: string;
  category: string;
  name: string;
  images: string[];
  price: number;
  description: string;
  availableQuantity: number;
  rating: number;
  totalReviews: number;
};

const AdminProductItem: React.FC<{ product: TheProductType }> = (props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const navigate = useNavigate();

  const themeState = useAppSelector((state) => {
    return state.theme;
  });
  const darkMode = themeState.darkMode;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("header-data-active");
          } else {
          }
        });
      },
      { threshold: 0.5, root: null }
    );
    const hiddenElements = document.querySelectorAll(".header-data");
    hiddenElements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div>
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

      <div className="header-data flex flex-col justify-start w-full">
        <div
          onClick={() => {
            navigate(`/product-details/${props.product.id}`);
          }}
          className="h-52 lg:h-72 w-full relative overflow-hidden rounded-xl shadow-sm shadow-black scale-95 hover:scale-100 transition-all"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            className={`object-cover h-52 lg:h-72 w-full rounded-xl hover:cursor-pointer transition-transform duration-700 ${
              isHovered ? "scale-125" : "scale-100"
            }`}
            src={`http://localhost:8080/images/${props.product.images[0]}`}
            alt="product"
          />
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu();
            }}
            className={`absolute h-8 w-8 rounded-full bg-gray-500 cursor-pointer ${
              isHovered ? "opacity-50 scale-100" : "opacity-0 scale-0"
            } bottom-5 right-5 flex flex-row justify-center items-center transition-all duration-300`}
          >
            <FontAwesomeIcon
              className="text-black"
              icon={faSearch}
            ></FontAwesomeIcon>
          </div>
          {/* Edit and delete icons */}
          {isHovered && (
            <div className="absolute top-3 right-3 flex space-x-2">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(
                    `/accounts/admin/products/${props.product.id}/update-product`,
                    {
                      state: {
                        product: props.product,
                      },
                    }
                  );
                }}
                className="px-2 py-2 rounded-lg bg-black bg-opacity-50 flex justify-center items-center hover:scale-110 transition-all duration-200"
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  className="text-white cursor-pointer"
                />
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="px-2 py-2 rounded-lg bg-black bg-opacity-50 flex justify-center items-center hover:scale-110 transition-all duration-200"
              >
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="text-red-600 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
        <p className="tracking-wider text-gray-400 mt-3 mb-2">
          {props.product.name}
        </p>
        <Rating
          name="simple-controlled"
          value={props.product.rating}
          readOnly
          size="small"
        />
        <p className="tracking-wide font-semibold mt-1">
          {" "}
          Rs. {props.product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default AdminProductItem;
