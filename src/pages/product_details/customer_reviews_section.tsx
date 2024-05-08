import { Rating } from "@mui/material";
import ReviewItem from "./review_item";
import WriteReview from "../../components/write-review";
import { useState } from "react";
import { TheProductType } from "../admin_account/admin_product_item";
import { useAppSelector } from "../../hooks/hooks";
import toast from "react-hot-toast";
import useFutureBuilder from "../../hooks/future_builder_hook";
import ThePulseLoader from "../../components/pulse-loader";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const CustomerReviews: React.FC<{ product: TheProductType }> = (props) => {
  const [showWriteReview, setShowWriteReview] = useState(false);

  const authState = useAppSelector((state) => {
    return state.auth;
  });

  const user = authState.user;

  const toggleShowWriteReview = () => {
    setShowWriteReview(!showWriteReview);
  };
  const [page, setPage] = useState(1);

  const { isLoading, error, data } = useFutureBuilder(
    `http://localhost:8080/reviews/${props.product.id}?page=${page}`
  );

  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;

  const navigate = useNavigate();

  const totalReviews = data ? data.totalReviews : 0;

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
          id={props.product.id}
          showWriteReview={showWriteReview}
          close={toggleShowWriteReview}
        />
      )}
      <p className="text-lg font-semibold tracking-wide"> Customer Reviews </p>
      <p className="mt-3 font-bold text-xl"> {props.product.rating} </p>
      <Rating
        className=""
        name="simple-controlled"
        value={props.product.rating}
        readOnly
        size="medium"
      />
      <p className="text-sm"> Based on {props.product.totalReviews} reviews </p>
      <button
        onClick={() => {
          if (!user) {
            toast.success("Login to continue.");
            navigate("/login");
            return;
          }
          const productIdExists = user.orderedItems.some(
            (item: any) => item.productId === props.product.id
          );
          if (!productIdExists) {
            toast.error("Hmm, You don't seem to have purchased the product.");
            return;
          }
          toggleShowWriteReview();
        }}
        className="bg-purple-600 text-white px-4 py-2 mt-3 rounded-lg hover:bg-purple-800 transition-all duration-300 hover:translate-x-2 ease-in-out"
      >
        Add a Review
      </button>

      <p className="mt-5 mb-3 text-xl font-semibold"> Reviews</p>
      {isLoading && (
        <div className="h-52 w-full flex flex-row items-center justify-center">
          <ThePulseLoader></ThePulseLoader>
        </div>
      )}
      {error && <p> {error.message} </p>}
      {data && (
        <div className="flex flex-col w-full gap-y-4">
          {data.reviews.map((reviewData: any) => {
            return <ReviewItem reviewData={reviewData}></ReviewItem>;
          })}
        </div>
      )}
      <ReactPaginate
        // key={selectedDate?.toISOString()}
        pageCount={Math.ceil(totalReviews / 5)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={(selectedItem) => {
          setPage(selectedItem.selected + 1);
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
    </div>
  );
};

export default CustomerReviews;
