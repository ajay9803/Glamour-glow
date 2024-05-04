import React, { useEffect, useRef, useState } from "react";
import ProductItem from "../home/product_item";
import { useAppSelector } from "../../hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import useFutureBuilder from "../../hooks/future_builder_hook";
import ThePulseLoader from "../../components/pulse-loader";
import { useParams } from "react-router-dom";
import LoadError from "../home/load-error";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const ProductsByCategory: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>("dsc");
  const [range, setRange] = useState<number[]>([0, 25000]);
  const [isFixed, setIsFixed] = useState(true);

  const { category } = useParams();

  const { isLoading, error, data } = useFutureBuilder(
    `http://localhost:8080/products/all-products/${category}?filterBy=${sortBy}&minPrice=${range[0]}&maxPrice=${range[1]}`
  );

  const handleRangeChange = (newRange: number[]) => {
    setRange(newRange);
  };

  const toggleSortBy = (sortByOption: string) => {
    setSortBy(sortByOption);
  };

  const scrollRef = useRef(0);

  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  }, []);

  return (
    <div className="flex flex-row gap-x-4 ">
      <div className="flex-col w-2/5 lg:w-2/6 hidden md:flex md:flex-col md:justify-start">
        <div className="sticky top-44 w-full">
          <FilterBar
            setSort={toggleSortBy}
            onRangeChange={handleRangeChange}
          ></FilterBar>
        </div>
      </div>

      <div className="div-red flex flex-col w-full">
        <p className="tracking-wider font-semibold mb-3"> {category} </p>
        {data && (
          <p className="font-semibold tracking-wider text-xl mb-5">
            {data.products.length} Products
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
        </div>
      </div>
    </div>
  );
};

export default ProductsByCategory;

const FilterBar: React.FC<{
  setSort: (sortBy: string) => void;
  onRangeChange: (range: number[]) => void;
}> = (props) => {
  const themeState = useAppSelector((state) => state.theme);
  const darkMode = themeState.darkMode;

  const [sortBy, setSortBy] = useState("dsc");

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
    props.setSort(event.target.value);
  };

  // State to manage the range values
  const [range, setRange] = useState([0, 25000]);

  // Handler function to update the range values
  const handleRangeChange = (newRange: any) => {
    setRange(newRange);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-zinc-800 shadow-zinc-600" : "bg-slate-50 shadow-gray-700"
      } px-3 py-4 shadow-sm gap-y-3 flex flex-col rounded-md`}
    >
      <p className="font-semibold tracking-wider">Sort By</p>
      <select
        value={sortBy}
        onChange={handleSortChange}
        className={`${
          darkMode ? "bg-zinc-800 " : "bg-slate-50"
        } p-2 rounded border w-full text-sm`}
      >
        <option className="py-2" value="dsc">
          Date ( New - Old )
        </option>
        <option className="py-2" value="asc">
          Date ( Old - New )
        </option>

        <option className="py-2" value="price-asc">
          Price ( Low - High )
        </option>
        <option className="py-2" value="price-dsc">
          Price ( High - Low )
        </option>
      </select>
      <div className="flex felx-row items-center gap-x-3 mt-5 mb-3">
        <FontAwesomeIcon
          className="text-gray-500"
          icon={faFilter}
        ></FontAwesomeIcon>
        <p className="font-semibold tracking-wider">Filter By</p>
      </div>
      <div
        style={{
          height: "0.5px",
        }}
        className={`bg-gray-600`}
      ></div>
      <div className="my-4">
        <p> Price </p>
        <Slider
          className="my-3"
          range={true}
          defaultValue={range}
          count={1}
          min={0}
          max={25000}
          value={range}
          onChange={handleRangeChange}
          onChangeComplete={(newRange: any) => {
            props.onRangeChange(newRange);
          }}
          allowCross={false} // Prevent handles from crossing each other
        />
        {/* Display the range values */}
        <div className="flex flex-row justify-between w-full px-5">
          <div className="flex flex-col items-start">
            <p className="text-sm tracking-wider font-semibold"> From </p>
            <p className="tracking-wider">Rs. {range[0]} </p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-sm tracking-wider font-semibold"> To </p>
            <p className="tracking-wider">Rs. {range[1]} </p>
          </div>
        </div>
      </div>
    </div>
  );
};
