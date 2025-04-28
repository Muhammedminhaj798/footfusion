import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Context from "./context/Context.jsx";
import CartProvider from "./context/CartProvider.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import UsersProvider from "./context/UserContext";

createRoot(document.getElementById("root")).render(
  <Context>
    <UsersProvider>
      <CartProvider>
        <AuthProvider>
          <StrictMode>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </StrictMode>
        </AuthProvider>
      </CartProvider>
    </UsersProvider>
  </Context>
);
