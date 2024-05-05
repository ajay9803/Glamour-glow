import { useLocation, useNavigate } from "react-router-dom";
import cat from "../../images/cat.png";
import { useEffect } from "react";
import { useAppSelector } from "../../hooks/hooks";

const PaymentSuccessPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const data = searchParams.get("data");
  const authState = useAppSelector((state) => {
    return state.auth;
  });
  const navigate = useNavigate();

  useEffect(() => {
    const makePayment = async (orderId: string) => {
      const url = `http://localhost:8080/orders/make-payment/${orderId}`;
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
        });
        const jsonData = await response.json();
        console.log(jsonData);
      } catch (e) {
        console.log(e);
      }
    };
    if (data) {
      const decodedData = atob(data);
      const dataObject = JSON.parse(decodedData);
      console.log(dataObject.status);
      if (dataObject.status === "COMPLETE") {
        makePayment(dataObject.transaction_uuid)
          .then(() => {
            navigate("/home");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  });
  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <img
        src={cat}
        alt="cat-shocked"
        className="object-cover h-60 lg:h-64"
      ></img>
      <div className="flex flex-col items-center gap-y-2">
        <p className="font-semibold"> Do not close your tab.</p>
        <p className="text-sm tracking-wide text-zinc-500">
          Your payment status is getting updated.
        </p>
      </div>
    </div>
  );
};
export default PaymentSuccessPage;
