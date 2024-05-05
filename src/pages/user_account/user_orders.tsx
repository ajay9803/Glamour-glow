import { useEffect, useRef } from "react";
import ThePulseLoader from "../../components/pulse-loader";
import { useAuthorizedFutureBuilder } from "../../hooks/future_builder_hook";
import { useAppSelector } from "../../hooks/hooks";
import Order from "../../models/order";
import LoadError from "../home/load-error";
import { useNavigate } from "react-router-dom";

export type OrderType = {};

const UserOrders: React.FC = () => {
  const authState = useAppSelector((state) => {
    return state.auth;
  });
  const { isLoading, error, data } = useAuthorizedFutureBuilder(
    `http://localhost:8080/orders/my-orders`,
    authState.token!
  );

  const scrollRef = useRef(0);

  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  }, []);

  return (
    <div className="w-full flex flex-col">
      <p className="tracking-wider font-semibold mb-5"> My Orders </p>
      {isLoading && (
        <div className="h-52 w-full flex flex-row items-center justify-center">
          <ThePulseLoader></ThePulseLoader>
        </div>
      )}
      {error && <LoadError message={error.message}></LoadError>}
      {data && !error && (
        <div className="w-full flex flex-col gap-y-4">
          {" "}
          {data.orders.map((order: any) => {
            return <OrderItem order={new Order(order)}></OrderItem>;
          })}{" "}
        </div>
      )}
    </div>
  );
};

export default UserOrders;

const OrderItem: React.FC<{ order: Order }> = (props) => {
  const navigate = useNavigate();
  const themeState = useAppSelector((state) => {
    return state.theme;
  });
  const darkMode = themeState.darkMode;

  useEffect(() => {
    const fetchOrderPaidStatus = async () => {
      const url = `https://uat.esewa.com.np/api/epay/transaction/status/?product_code=EPAYTEST&total_amount=${props.order.totalPrice}&transaction_uuid=${props.order._id}`;
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        console.log(jsonData);
      } catch (e) {
        console.log(e);
      }
    };
    if (props.order.paymentMethod === "E-sewa" && props.order.paid === false) {
      fetchOrderPaidStatus();
    }
  }, [
    props.order._id,
    props.order.totalPrice,
    props.order.paid,
    props.order.paymentMethod,
  ]);

  return (
    <div
      onClick={() => {
        navigate(`/orders/${props.order._id}`);
      }}
      className={`relative overflow-hidden w-full flex flex-row justify-between border border-solid rounded-md px-4 py-3 hover:cursor-pointer hover:scale-105 transition-all ease-out duration-500 ${
        darkMode
          ? "border-white bg-zinc-900 shadow-sm shadow-slate-600"
          : "border-black bg-slate-50 shadow-sm shadow-black"
      }`}
    >
      <div
        className={`absolute h-36 w-36 rounded-full -top-6 -left-12 -z-50 ${
          darkMode ? "bg-purple-600" : "bg-purple-300"
        }`}
      ></div>
      <div
        className={`absolute h-36 w-36 rounded-full top-6 right-1/2 -z-50 ${
          darkMode ? "bg-purple-600" : "bg-purple-300"
        }`}
      ></div>
      <div className="flex flex-col gap-y-2 items-start">
        <p className="text-lg tracking-wider font-semibold"> Order number</p>
        <p className="tracking-wider text-sm"> #{props.order._id} </p>
      </div>
      <div className="flex flex-col gap-y-2 items-end">
        <p className="font-semibold"> Rs. {props.order.totalPrice} </p>
        <p className="tracking-wider font-serif">
          {props.order.paymentMethod} (
          <span
            className={`${
              props.order.paid ? "text-purple-600" : "text-red-500"
            }`}
          >
            {props.order.paid ? "Paid" : "Not-paid"}
          </span>
          )
        </p>
      </div>
    </div>
  );
};
