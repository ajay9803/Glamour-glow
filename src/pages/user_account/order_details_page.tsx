import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { useAuthorizedFutureBuilder } from "../../hooks/future_builder_hook";
import LoadError from "../home/load-error";
import ThePulseLoader from "../../components/pulse-loader";
import { useEffect, useRef } from "react";
import { makePayment } from "../../action_creators/order_action";

const OrderDetailsPage: React.FC = () => {
  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;

  const { orderId } = useParams();

  const authState = useAppSelector((state) => {
    return state.auth;
  });
  const { isLoading, error, data } = useAuthorizedFutureBuilder(
    `http://localhost:8080/orders/${orderId}`,
    authState.token!
  );

  const getFormattedDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const scrollRef = useRef(0);

  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  }, []);
  return (
    <div className="w-full flex flex-col">
      {isLoading && (
        <div className="h-52 w-full flex flex-row items-center justify-center">
          <ThePulseLoader></ThePulseLoader>
        </div>
      )}
      {error && <LoadError message={error.message}></LoadError>}
      {data && !error && (
        <div
          className={`flex flex-col w-full shadow-sm rounded-xl px-5 py-4 ${
            darkMode ? "shadow-gray-700" : "shadow-black"
          }`}
        >
          <div
            className={`w-full py-10 px-5 rounded-xl flex flex-col border border-dashed  mb-5 ${
              darkMode ? " border-slate-500" : " border-black"
            }`}
            style={{
              backgroundImage: darkMode
                ? "linear-gradient(to right, #4e2a84, #c44fcb) "
                : "linear-gradient(to right, #f4f4f4, #dcdcdc)",
            }}
          >
            <p className="font-semibold tracking-wider text-xl mb-2 font-sans">
              {" "}
              Order #{data.order._id}
            </p>
            <p className="font-light tracking-wider">
              {" "}
              {getFormattedDate(data.order.createdAt)}{" "}
            </p>
          </div>
          <div className="flex flex-col w-full gap-y-4">
            {data.orderItems.map((orderItem: any) => {
              return <OrderItem order={orderItem}></OrderItem>;
            })}
          </div>
          <div className="flex flex-row w-full mt-5 justify-end gap-x-7">
            <p className="font-light text-lg tracking-wider"> Order Total: </p>
            <p className="font-semibold text-lg tracking-wider">
              {" "}
              Rs. {data.order.totalPrice}
            </p>
          </div>
          {(!data.order.paid && data.order.paymentMethod !== "E-sewa") && (
            <div onClick={() => {
              makePayment(data.order._id, data.order.totalPrice);
            }} className="flex flex-row justify-start mt-10">
              <button className=" px-5 py-2 rounded-md bg-purple-700 text-white transition-all hover:bg-purple-800 duration-500 hover:translate-x-3">
                {" "}
                Make Payment
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;

const OrderItem: React.FC<{ order: any }> = (props) => {
  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;

  return (
    <div
      className={`w-full flex flex-col md:flex-row gap-y-3 justify-start md:justify-between items-center border-2 border-solid px-5 py-3 ${
        darkMode ? "border-white bg-zinc-900" : "border-black bg-slate-50"
      }`}
    >
      <div className="flex flex-row items-center justify-between md:justify-start gap-x-10 w-full">
        <img
          className={` h-20 w-20 border border-solid object-cover ${
            darkMode ? "border-white bg-zinc-900" : "border-black bg-slate-50"
          }`}
          src={`http://localhost:8080/images/${props.order.product.images[0]}`}
          alt="order-product"
        ></img>
        <div className="flex flex-col">
          <p className="text-xl font-semibold tracking-wider">
            {" "}
            {props.order.product.name}{" "}
          </p>
          <p className="text-sm font-light tracking-wider">
            {" "}
            {props.order.product.brand}{" "}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-1 md:gap-y-3 items-start md:items-end w-full">
        <p className="text-sm font-light tracking-wider">
          {" "}
          Quantity: {props.order.quantity}{" "}
        </p>
        <p className="text-lg font-sans font-semibold tracking-wider">
          {" "}
          Rs. {props.order.price}{" "}
        </p>
      </div>
    </div>
  );
};
