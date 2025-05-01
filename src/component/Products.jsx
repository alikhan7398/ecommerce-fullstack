// src/component/Products.js
import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import { NavLink } from 'react-router-dom';

export default function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        console.log('Fetching products from:', 'https://fakestoreapi.com/products');
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (componentMounted) {
          const result = await response.json();
          console.log('Fetched products:', result);
          setData(result);
          setFilter(result);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching products:', error.message);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3"><Skeleton height={350} /></div>
        <div className="col-md-3"><Skeleton height={350} /></div>
        <div className="col-md-3"><Skeleton height={350} /></div>
        <div className="col-md-3"><Skeleton height={350} /></div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button className="btn btn-outline-dark" onClick={() => setFilter(data)}>All</button>
          <button className="btn btn-outline-dark ms-2" onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
          <button className="btn btn-outline-dark ms-2" onClick={() => filterProduct("women's clothing")}>Women's Clothing</button>
          <button className="btn btn-outline-dark ms-2" onClick={() => filterProduct("jewelery")}>Jewelery</button>
          <button className="btn btn-outline-dark ms-2" onClick={() => filterProduct("electronics")}>Electronics</button>
        </div>
        {filter.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card h-100 text-center p-4">
              <img src={product.image} className="card-img-top" alt={product.title} height="250px" />
              <div className="card-body">
                <h5 className="card-title mb-0">{product.title.substring(0, 12)}...</h5>
                <p className="card-text lead fw-bolder">${product.price}</p>
                <NavLink
                  to={`/products/${product.id}`}
                  state={{ product }}
                  className="btn btn-outline-dark"
                >
                  Buy Now
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : error ? <p className="text-center text-danger">{error}</p> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
}