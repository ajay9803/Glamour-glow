import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import TheHeader from "./components/header";
import Search from "./pages/search/search";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";
import { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Footer from "./components/footer";
import CheckOut from "./pages/check-out/check-out";
import CartPage from "./pages/cart/cart";
import { useEffect } from "react";
import { cartSliceActions, loadCartState } from "./slices/cart-slice";
import ProductDetails from "./pages/product_details/product_details";

const App: React.FC = () => {
  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadMyCart = () => {
      try {
        const myCartState = loadCartState();

        if (!myCartState) {
          return;
        } else {
          dispatch(
            cartSliceActions.setCart({
              items: myCartState.items,
              totalItemCount: myCartState.totalItemCount,
              totalPrice: myCartState.totalPrice,
            })
          );
        }
      } catch (e) {
        return;
      }
    };
    loadMyCart();
  }, [dispatch]);
  return (
    <div
      className={`${
        darkMode ? "text-white bg-zinc-900" : "text-black bg-white"
      } transition-all duration-500 ease-in-out`}
    >
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
        }}
      />

      <TheHeader></TheHeader>
      <div className="py-4 md:py-12 w-full px-16">
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/search" element={<Search></Search>}></Route>
          <Route path="/check-out" element={<CheckOut />}></Route>
          <Route path="/my-cart" element={<CartPage />}></Route>
          <Route path="/product-details" element={<ProductDetails />}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default App;
