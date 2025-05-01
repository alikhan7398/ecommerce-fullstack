import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./component/Products";
import Product from "./component/Product";
import Cart from "./component/Cart";
import Register from "./component/Register";
import Login from "./component/Login";
import About from "./component/About";
import Contact from "./component/Contact";
import Footer from "./component/Footer";
import ScrollToTop from "./component/ScrollToTop";
import Checkout from "./component/Checkout";
import Payment from "./component/Payment";
import OrderConfirmation from "./component/OrderConfirmation";
import Settings from "./component/Settings";
import { ThemeProvider } from "./component/ThemeContext";
import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    console.error("ErrorBoundary caught error:", error, error.stack);
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center mt-5">
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.message || "An unknown error occurred"}</p>
          <p>Please check the console for more details.</p>
        </div>
      );
    }
    return this.props.children;
  }
}



function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Router >
          <ScrollToTop />
          <Navbar />
          <ToastContainer />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;