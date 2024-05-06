import React, { useEffect, useRef, useState } from "react";
import ProductItem from "../home/product_item";
import useFutureBuilder from "../../hooks/future_builder_hook";
import ThePulseLoader from "../../components/pulse-loader";
import { useParams } from "react-router-dom";
import LoadError from "../home/load-error";
import "rc-slider/assets/index.css";
import ReactPaginate from "react-paginate";
import FilterBar from "./filter_bar";
import "../../styles/pagination_tab.css";
import { useAppSelector } from "../../hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const ProductsByCategory: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>("dsc");
  const [range, setRange] = useState<number[]>([0, 25000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [instockFilter, setInstockFilter] = useState<string>("all");
  const { category } = useParams();

  const { isLoading, error, data } = useFutureBuilder(
    `http://localhost:8080/products/all-products/${category}?filterBy=${sortBy}&minPrice=${range[0]}&maxPrice=${range[1]}&page=${currentPage}&instockFilter=${instockFilter}`
  );

  const totalItems = data ? data.totalItems : 0;

  const handleRangeChange = (newRange: number[]) => {
    setRange(newRange);
  };

  const handleFilterChange = (filter: string) => {
    setInstockFilter(filter);
  };

  const toggleSortBy = (sortByOption: string) => {
    setSortBy(sortByOption);
  };

  const scrollRef = useRef(0);

  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo(0, scrollRef.current);
  }, [category, range, instockFilter]);

  return (
    <div className="flex flex-row gap-x-4 ">
      <div className="flex-col w-2/5 lg:w-2/6 hidden md:flex md:flex-col md:justify-start">
        <div className="sticky top-44 w-full">
          <FilterBar
            setSort={toggleSortBy}
            onRangeChange={handleRangeChange}
            instockFilter={instockFilter}
            changeInstockFilter={handleFilterChange}
          ></FilterBar>
        </div>
      </div>

      <div className="div-red flex flex-col w-full">
        <p className="tracking-wider font-semibold mb-3 text-purple-700">
          {" "}
          {category}{" "}
        </p>
        {data && (
          <p className="font-semibold tracking-wider text-xl mb-5">
            {data.totalItems} Products
          </p>
        )}
        <div className="w-full">
          {isLoading && (
            <div className="h-44 flex flex-row justify-center items-center">
              <ThePulseLoader></ThePulseLoader>
            </div>
          )}
          {error && <LoadError message={error.message}></LoadError>}
          <div className="div-red"></div>
          {data && !error && (
            <div className=" grid grid-cols-2 md:grid-cols-3  gap-x-3 gap-y-4">
              {data.products.map((product: any) => (
                <ProductItem
                  key={product.id}
                  product={{
                    id: product._id,
                    brand: product.brand,
                    category: product.category,
                    name: product.name,
                    images: product.images,
                    price: product.price,
                    description: product.description,
                    availableQuantity: product.quantityAvailable,
                    rating: product.rating,
                  }}
                />
              ))}
            </div>
          )}
          <ReactPaginate
            key={`${category}${range}${instockFilter}`}
            pageCount={Math.ceil(totalItems / 6)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={(selectedItem) => {
              setCurrentPage(selectedItem.selected + 1);
              window.scrollTo(0, scrollRef.current);
            }}
            containerClassName={darkMode ? "pagination-darkmode" : "pagination"}
            activeClassName={"active"}
            previousLabel={
              <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
            }
            nextLabel={
              <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
            }
            breakLabel={"..."}
            disabledClassName={"disabled"}
            pageClassName={""}
            pageLinkClassName={""}
            previousClassName={"previous"}
            nextClassName={"next"}
            previousLinkClassName={""}
            nextLinkClassName={""}
            breakClassName={"ellipsis"}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsByCategory;
