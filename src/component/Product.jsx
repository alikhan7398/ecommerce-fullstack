import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/handleCart";
import { toast } from "react-toastify";

export default function Product() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || {});
  const [loading, setLoading] = useState(!location.state?.product); // Skip loading if state is available
  const [error, setError] = useState(null);

  const addProduct = (product) => {
    dispatch(addCart(product));
    toast.success("Added to cart!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
    });
  };

  useEffect(() => {
    // Fetch only if no product data was passed via state
    if (!location.state?.product) {
      const getProduct = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `https://fakestoreapi.com/products/${id}`
          );
          console.log(
            "Response status:",
            response.status,
            "URL:",
            response.url
          );
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Response is not JSON");
          }
          const data = await response.json();
          console.log("Product data:", data);
          setProduct(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching product:", error);
          setError(
            `Failed to load product: ${error.message}. Check if the ID (${id}) is valid.`
          );
          setLoading(false);
        }
      };
      getProduct();
    }
  }, [id, location.state]);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6 mb-5">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title || "Product"}
              height="400px"
              width="400px"
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">
            {product.category || "N/A"}
          </h4>
          <h1 className="display-5">{product.title || "No title"}</h1>
          <p className="lead fw-bolder">
            Rating{" "}
            {product.rating && product.rating.rate ? (
              <>
                {product.rating.rate} <i className="fa fa-star"></i>
              </>
            ) : (
              "N/A"
            )}
          </p>

          <h3 className="display-6 fw-bold my-4">${product.price || "0.00"}</h3>
          <p className="lead">{product.description || "No description"}</p>
          <button
            className="btn btn-outline-dark px-4 py-2"
            onClick={() => addProduct(product)}
            disabled={!product.id}
          >
            Add to Cart
          </button>
          <NavLink
            to="/cart"
            className="btn btn-dark ms-2 px-3 py-2"
            disabled={!product.id}
          >
            Go to Cart
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container my-5">
        <div className="row">
          {loading ? (
            <Loading />
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : (
            <ShowProduct />
          )}
        </div>
      </div>
    </div>
  );
}
