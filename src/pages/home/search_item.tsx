const SearchItem: React.FC = () => {
  return (
    <div className="flex flex-row gap-x-5 border border-solid border-gray-700 p-2 rounded-xl hover:cursor-pointer">
      <img
        className="h-14 w-1/4 rounded-xl object-cover"
        src="https://img.freepik.com/free-photo/different-cosmetics-types-scattered-pink-table_23-2148046961.jpg"
        alt="product"
      />
      <div className="flex flex-col justify-center w-full">
        <p className="text-sm"> J. Cat You Glow Girl Baked Highlighter</p>
        <p className="text-sm font-semibold"> Rs. 12,000</p>
      </div>
    </div>
  );
};

export default SearchItem;
