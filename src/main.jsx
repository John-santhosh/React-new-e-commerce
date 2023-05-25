import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import AppContext from "./context/Context.jsx";
import "animate.css";
import ProductsContext from "./context/ProductsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductsContext>
    <AppContext>
      <App />
    </AppContext>
  </ProductsContext>
);
