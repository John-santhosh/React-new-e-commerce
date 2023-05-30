import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About, Products, Home, Error, SingleProduct } from "./pages/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Login,
  MyAccount,
  Register,
  Navbar,
  Footer,
  Cart,
  WishList,
} from "./components/index";
function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <ToastContainer position="bottom-center"></ToastContainer>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/products/:id" element={<SingleProduct />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/myaccount" element={<MyAccount />}></Route>
        <Route path="/wishlist" element={<WishList />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
