import axios from 'axios';
import { useState, useEffect } from 'react';
import { Outlet, NavLink } from "react-router-dom";
import './product.css';

function ProductsPage() {
  const [product, setProducts] = useState([]);

  useEffect(() => {
    products()
  }, []);

  const products = async () => {
    axios.get('/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  return (
    <div className="app">
      <div className="mx-auto justify-between flex w-2/4 my-10 title-wrapper">
        <h1 className="text-3xl font-bold underline">
          Products Page
        </h1>
        <NavLink
          to="product/new"
          className="bg-green-500 p-2 rounded text-white font-semibold hover:drop-shadow-sm"
        >
          New Product
        </NavLink>
      </div>
      <div className='bg-white h-full w-2/4 mx-auto page-wrapper'>
        { 
          product.map((data) => {
            return (
              <NavLink
                to={`product/${data.id}`}
                key={data.id}
              >
                <div className='border-[1px] border-stone-300 rounded mb-3 hover:drop-shadow bg-white'>
                  <div className='inline-block w-1/4 align-middle'>
                    <img src="https://place-hold.it/100x100" alt='placeholder imag'/>
                  </div>
                  <div className='inline-block w-3/4 align-middle text-left p-2'>
                    <h3 className='text-lg font-bold hover:underline'>{data.name}</h3>
                    <p className='text-sm capitalize'>{'Type:'} {data.type}</p>
                  </div>
                </div>
              </NavLink>
            )
          })
        }
        <Outlet />
      </div>
    </div>
  );
}

export default ProductsPage;