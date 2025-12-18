import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import Header from "./components/Header";
import Footer from "./components/Footer";
import Authorization from "./components/Autorization";
import Wishlist from "./components/AccountMenu/Wishlist";
import MyAccount from "./components/AccountMenu/MyAccount";
import EditProfile from "./components/AccountMenu/EditProfile";
import ChangePassword from "./components/ChangePassword";
import MainPage from "./components/MainPage";
import ProductPage from "./components/ProductPage"; // Ensure ProductPage is imported
import NotificationSettings from "./components/AccountMenu/NotificationSettings";
import AddressBook from "./components/AccountMenu/AddressBook";
import OrderHistory from "./components/AccountMenu/OrderHistory";
import PreOrder from "./components/AccountMenu/PreOrder";
import Cart from "./components/cart/Cart";
import OrderPage from "./components/cart/OrderPage"

function App() {
    return (
        <Router>
            <div className="App min-h-screen flex flex-col">
                <Header />

                <main className="flex-grow bg-primary-white">
                    <Routes>
                        <Route path="/main-page" element={<MainPage />} />
                        <Route path="/wishlist" element={<Wishlist />}></Route>
                        <Route
                            path="/myaccount"
                            element={<MyAccount />}></Route>
                        <Route
                            path="/authorization"
                            element={<Authorization />}
                        />
                        <Route path="/edit-profile" element={<EditProfile />} />
                        <Route
                            path="/change-password"
                            element={<ChangePassword />}
                        />
                        <Route path="/product" element={<ProductPage />} />
                        <Route
                            path="/category/:category"
                            element={<ProductPage />}
                        />{" "}
                        {/* Dynamic category route */}
                        <Route
                            path="/notification-settings"
                            element={<NotificationSettings />}
                        />
                        <Route path="/address-book" element={<AddressBook />} />
                        <Route
                            path="/order-history"
                            element={<OrderHistory />}
                        />
                        <Route path="/preorder" element={<PreOrder />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/order" element={<OrderPage />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
