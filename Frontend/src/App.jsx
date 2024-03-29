import React from "react";
import Navbar from "./Components/Navbar";
import HomePage from "./Components/HomePage";
import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import CatogorieInfo from "./Components/Catagories_info/CatogorieInfo";
import Form from "./Components/Form/Form";
import ItemDetails from "./Components/itemdetails/ItemDetails";
import Cart from "./Components/Cart/Cart";
import ReviewForm from "./Components/Form/ReviewForm";
function App() {
  return (
    <div className="main">
      <Navbar />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Categories">
            <Route
              path="/Categories/:cat_name"
              element={<CatogorieInfo />}
            ></Route>
          </Route>
          <Route path="/form" element={<Form />} />

          <Route path="/itemdetails/:id" element={<ItemDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </section>
      <Footer />
    </div>
  );
}

export default App;
