import React, { useEffect, useRef } from "react";
import ProductItem from "../home/product_item";
import useFutureBuilder from "../../hooks/future_builder_hook";
import ThePulseLoader from "../../components/pulse-loader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const filterBy = queryParams.get("filterBy") || "dsc";
  const minPrice = parseInt(queryParams.get("minPrice") || "0") || 0;
  const maxPrice = parseInt(queryParams.get("maxPrice") || "25000") || 25000;
  const page = parseInt(queryParams.get("page") || "1") || 1;
  console.log("page", page);
  console.log("filterby", filterBy);
  const instockFilter = queryParams.get("instockFilter") || "all";

  const { category } = useParams();

  const { isLoading, error, data } = useFutureBuilder(
    `http://localhost:8080/products/all-products/${category}?filterBy=${filterBy}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&instockFilter=${instockFilter}`
  );

  const scrollRef = useRef(0);

  useEffect(() => {
    document.title = category || "Glamour Glow Cosmetic";
    window.scrollTo(0, scrollRef.current);
  }, [category]);

  return (
    <div className="flex flex-row gap-x-4 ">
      <div className="flex-col w-2/5 lg:w-2/6 hidden md:flex md:flex-col md:justify-start">
        <div className="sticky top-44 w-full">
          <FilterBar
            currentPage={page}
            category={category!}
            filterBy={filterBy}
            minPrice={minPrice}
            maxPrice={maxPrice}
            instockFilter={instockFilter}
          ></FilterBar>
        </div>
      </div>

      <div className="div-red flex flex-col w-full">
        <p className="tracking-wider font-semibold mb-3 text-purple-700">
          {category}
        </p>
        {data && (
          <p className="font-semibold tracking-wider text-xl mb-5">
            {data.totalItems} Products
          </p>
        )}
        <div className="w-full">
          {isLoading && (
            <div className="h-44 flex flex-row justify-center items-center">
              <ThePulseLoader color="purple"></ThePulseLoader>
            </div>
          )}
          {error && <LoadError message={error.message}></LoadError>}
          <div className="div-red"></div>
          {data && !error && (
            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-4">
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
                    totalReviews: product.totalReviews,
                  }}
                />
              ))}
            </div>
          )}
          {data && data.totalItems > 6 && (
            <PaginatorComponent
              urlKey="category"
              page={page}
              totalItems={data.totalItems}
              category={category!}
              filterBy={filterBy}
              minPrice={minPrice}
              maxPrice={maxPrice}
              instockFilter={instockFilter}
            ></PaginatorComponent>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsByCategory;

export const PaginatorComponent: React.FC<{
  urlKey: string;
  page: number;
  totalItems: number;
  category: string;
  filterBy: string;
  minPrice: number;
  maxPrice: number;
  instockFilter: string;
}> = (props) => {
  const scrollRef = useRef(0);

  const navigate = useNavigate();

  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;

  return (
    <ReactPaginate
      forcePage={props.page - 1}
      pageCount={Math.ceil(props.totalItems / 12)}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      onPageChange={(selectedItem) => {
        console.log("on page change in pagine", selectedItem.selected);
        if (props.urlKey === "category") {
          navigate(
            `/products/${props.category}?filterBy=${props.filterBy}&minPrice=${
              props.minPrice
            }&maxPrice=${props.maxPrice}&page=${
              selectedItem.selected + 1
            }&instockFilter=${props.instockFilter}`
          );
        } else if (props.urlKey === "search") {
          navigate(
            `/search/${props.category}?filterBy=${props.filterBy}&minPrice=${
              props.minPrice
            }&maxPrice=${props.maxPrice}&page=${
              selectedItem.selected + 1
            }&instockFilter=${props.instockFilter}`
          );
        } else {
        }

        window.scrollTo(0, scrollRef.current);
      }}
      containerClassName={darkMode ? "pagination-darkmode" : "pagination"}
      activeClassName={"active"}
      previousLabel={<FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>}
      nextLabel={<FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>}
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
  );
};
