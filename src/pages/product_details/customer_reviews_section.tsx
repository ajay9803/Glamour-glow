import { Rating } from "@mui/material";
import ReviewItem from "./review_item";
import WriteReview from "../../components/write-review";
import { useState } from "react";
import { TheProductType } from "../admin_account/admin_product_item";

const CustomerReviews: React.FC<{ product: TheProductType }> = (props) => {
  const reviews = [1, 2, 3, 4, 5, 6, 7, 8];

  const [showWriteReview, setShowWriteReview] = useState(false);

  const toggleShowWriteReview = () => {
    setShowWriteReview(!showWriteReview);
  };
  return (
    <div className="mt-10 flex flex-col w-full">
      {showWriteReview && (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
          }}
          className="fixed top-0 right-0 left-0 h-full w-screen z-20"
          onClick={() => {
            setShowWriteReview(false);
          }}
        ></div>
      )}
      {showWriteReview && (
        <WriteReview
          id=""
          showWriteReview={showWriteReview}
          close={toggleShowWriteReview}
        />
      )}
      <p className="text-lg font-semibold tracking-wide"> Customer Reviews </p>
      <p className="mt-3 font-bold text-xl"> 4.3</p>
      <Rating
        className=""
        name="simple-controlled"
        value={props.product.rating}
        readOnly
        size="medium"
      />
      <p className="text-sm"> Based on 16 reviews </p>
      <button
        onClick={toggleShowWriteReview}
        className="bg-purple-600 text-white px-4 py-2 mt-3 rounded-lg hover:bg-purple-800 transition-all duration-300 ease-in-out"
      >
        Add a Review
      </button>

      <p className="mt-5 mb-3 text-xl font-semibold"> Reviews</p>
      <div className="flex flex-col w-full gap-y-4">
        {reviews.map((review) => {
          return <ReviewItem></ReviewItem>;
        })}
      </div>
    </div>
  );
};

export default CustomerReviews;
