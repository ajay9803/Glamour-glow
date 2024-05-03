import React, { useState, useEffect, useRef } from "react";
import ProductItemShimmer from "../../utilities/shimmers/product-item-shimmer";

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("Pet");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [searchResults, setSearchResults] = useState<
  //   (Pet | PetFood | PetAccessory)[]
  // >([]);

  const scrollRef = useRef(0);

  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  });

  return (
    <div className="flex flex-col items-start px-10 md:px-36 w-full py-4 md:py-12">
      <p className="tracking-wider text-2xl font-semibold mb-3">Search</p>
      <div className="flex mb-3 w-full">
        <input
          onChange={(e) => {
            setSearchValue(e.target.value);
            setTimeout(() => {
              setIsLoading(false);
              setError("Wifi went down");
            }, 2000);
          }}
          placeholder="Start searching ..."
          className="px-3 py-2 rounded-sm border border-solid bg-zinc-900 border-zinc-600 w-full md:w-2/3 lg:w-1/3 mr-2"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 rounded-sm border border-solid bg-zinc-900 border-zinc-600"
        >
          <option value="Pet">Pet</option>
          <option value="Pet Food">Pet Food</option>
          <option value="Pet Accessory">Pet Accessory</option>
        </select>
      </div>
      {}
      {isLoading && error === null && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 w-full">
          {[...Array(8)].map((_, index) => (
            <ProductItemShimmer key={index} />
          ))}
        </div>
      )}
      {/* {!isLoading && error === null && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 w-full">
          {[...Array(6)].map((_, index) => (
            <PetItem key={index} />
          ))}
        </div>
      )}
      {!isLoading && error !== null && <LoadError />} */}
    </div>
  );
};

export default Search;
