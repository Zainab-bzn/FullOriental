import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home.js";
import Menu from "./pages/Menu.js";
import Cakes from "./pages/Cakes.js";
import CustomCake from "./pages/CustomCake.js";
import Account from "./pages/Account.js";
import CupcakeHome from "./pages/CupcakeHome";
import IndividualCupcakes from "./pages/IndividualCupcakes.js";
import BestsellerCupCakes from "./pages/BestSellerCupCakes";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ThankYouPage from "./pages/ThankYou";
import AddCake from "./pages/AddCake.js";
import AdminCakes from "./pages/AdminCakes.js";
import UpdateCake from "./pages/UpdateCake.js";
import AdminFeedback from "./pages/AdminFeedback.js";
import AdminCustomCakes from "./pages/AdminCustomCakes";


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cakes" element={<Cakes />} />
        <Route path="/custom-cake" element={<CustomCake />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cupCakeHome" element={<CupcakeHome />} />
        <Route path="/individual-cupcakes" element={<IndividualCupcakes />} />
        <Route path="/individual" element={<IndividualCupcakes />} />
        <Route path="/best-seller-cupcakes" element={<BestsellerCupCakes />} />
        <Route path="/best-sellers" element={<BestsellerCupCakes />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/thankYou" element={<ThankYouPage />} />
        <Route path="/admin/cakes" element={<AdminCakes />} />
        <Route path="/admin/addCake" element={<AddCake />} />
        <Route path="/admin/updateCake/:id" element={<UpdateCake />} />
        <Route path="/admin/feedbacks" element={<AdminFeedback />} />
        <Route path="/admin/customCakes" element={<AdminCustomCakes />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
