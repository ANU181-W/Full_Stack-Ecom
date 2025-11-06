import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {ClerkProvider} from "@clerk/clerk-react"
import store from "./Components/Redux/Store.jsx";


axios.defaults.baseURL = "https://ecom-backend-service-c3fs.onrender.com";
//https://e-commerce-1818.azurewebsites.net

const publishableKey=import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ClerkProvider publishableKey={publishableKey}>
    <Provider store={store}>
      <App />
    </Provider>
    </ClerkProvider>
  </BrowserRouter>
);
