import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About, Products, Home, Error, SingleProduct } from "./pages/index";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        <Route path="*" element={<Error />}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
