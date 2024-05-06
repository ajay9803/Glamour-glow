import { useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Slider from "rc-slider";
import "../../styles/check_box.css";

const FilterBar: React.FC<{
  setSort: (sortBy: string) => void;
  onRangeChange: (range: number[]) => void;
  instockFilter: string;
  changeInstockFilter: (filter: string) => void;
}> = (props) => {
  const themeState = useAppSelector((state) => state.theme);
  const darkMode = themeState.darkMode;

  const [sortBy, setSortBy] = useState("dsc");
  const [instock, setInstock] = useState(
    props.instockFilter === "all" || props.instockFilter === "instock"
      ? true
      : false
  );
  const [outofstock, setOutofstock] = useState(
    props.instockFilter === "all" || props.instockFilter === "outofstock"
      ? true
      : false
  );

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
      <div className="mb-4">
        <p className="mb-2">Availability</p>
        <div className="mb-4 flex flex-col items-start gap-y-2">
          <div className="w-full relative flex flex-row items-center ">
            <input
              checked={instock}
              onChange={(event) => {
                const isChecked = event.target.checked;
                setInstock(isChecked);
                if (isChecked && outofstock) {
                  props.changeInstockFilter("all");
                } else if (isChecked && !outofstock) {
                  props.changeInstockFilter("instock");
                } else if (!isChecked && outofstock) {
                  props.changeInstockFilter("outofstock");
                } else {
                  props.changeInstockFilter("all");
                }
                console.log(instock);
              }}
              type="checkbox"
              id="myCheckbox1"
              name="myCheckbox1"
              className="mr-3 h-7 w-7  checked:bg-purple-500 checked:border-white border border-solid"
            />
            <span className="text tracking-wider">In stock</span>
            {/* {instock && (
              <span className="absolute left-1.5 top-0.5 ">
                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
              </span>
            )} */}
          </div>
          <div className="w-full relative flex flex-row items-center">
            <input
              checked={outofstock}
              onChange={(event) => {
                const isChecked = event.target.checked;
                setOutofstock(isChecked);
                if (isChecked && instock) {
                  props.changeInstockFilter("all");
                } else if (isChecked && !instock) {
                  props.changeInstockFilter("outofstock");
                } else if (!isChecked && instock) {
                  props.changeInstockFilter("instock");
                } else {
                  props.changeInstockFilter("all");
                }

                console.log(instock);
                console.log(outofstock);
              }}
              type="checkbox"
              id="myCheckbox"
              name="myCheckbox"
              className="mr-3 h-7 w-7  checked:bg-purple-500 checked:border-white border border-solid"
            />
            <span className="text tracking-wider">Out of stock</span>
            {/* {outofstock && (
              <span className="absolute left-1.5 top-0.5 ">
                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
              </span>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
