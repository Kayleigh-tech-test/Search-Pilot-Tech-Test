import { Outlet, NavLink } from "react-router-dom";
import { useState } from 'react';
import axios from "axios";
import '../product.css';

function NewProductPage() {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const sizes = formData.sizes.split(',').map((item) => item.trim());
    const features = formData.feature.split(',').map((item) => item.trim());
    axios.post('/api/validate', formData)
      .then(() => {
        const product = {
          name: formData.name,
          type: formData.type,
          sizes: sizes,
          features: features,
          brand: formData.brand,
        }

        switch (formData.type) {
          case 'footwear':
            product.style = '';
            break;
          case 'outerwear':
            product.materials = '';
            break;
          case 'dress': 
            product.colour = '';
            break;
          case 'top':
            product.neckline = '';
            break;
          default:
            break;
        }

        axios.post('/api/products', product)
          .then()
          .catch(error => {
            console.error('Error:', error);
          });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
    
  return (
    <div className="app">
      <div className="mx-auto justify-between flex w-2/4 my-10 title-wrapper">
        <h1 className="text-3xl font-bold border-b-[1px] w-3/4 text-left h-[42px] overflow-hidden">
          New Product Form
        </h1>
        <NavLink
          to="/"
          className="bg-white p-2 rounded font-semibold hover:drop-shadow-sm border-[1px] rounded border-stone-300"
        >
          Back
        </NavLink>
      </div>
      <div className='bg-white w-2/4 mx-auto page-wrapper'>
        <form
          className="form text-right"
          onSubmit={handleSubmit}
        >
          <input 
            type="text"
            id="name"
            name="name"
            defaultValue={formData.name}
            placeholder="Product Name"
            className="rounded border-2 border-[#D7D7D7] w-full p-2 mb-6"
            onChange={handleChange}
          />
          <select
            name="type"
            id="type"
            className="rounded border-2 border-[#D7D7D7] w-full pt-2 pb-2 pl-2 pr-4 arrow mb-6"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="productType">Product Type</option>
            <option value="footwear">Footwear</option>
            <option value="activewear">Activewear</option>
            <option value="outerwear">Outerwear</option>
            <option value="dress">Dress</option>
            <option value="top">Top</option>
          </select>
          {
            formData.type && 
            <>
              <input 
                type="text"
                id="sizes"
                name="sizes"
                defaultValue={formData.sizes}
                placeholder="Size"
                className="rounded border-2 border-[#D7D7D7] w-full p-2 mb-6"
                onChange={handleChange}
              />
              <input 
                type="text"
                id="feature"
                name="feature"
                defaultValue={formData.feature}
                placeholder="Features"
                className="rounded border-2 border-[#D7D7D7] w-full p-2 mb-6"
                onChange={handleChange}
              />
              <input 
                type="text"
                id="brand"
                name="brand"
                defaultValue={formData.brand}
                placeholder="Brand"
                className="rounded border-2 border-[#D7D7D7] w-full p-2 mb-6"
                onChange={handleChange}
              />
            </>
            }
            <button
              type="submit"
              className="bg-black p-2 rounded text-white font-semibold hover:drop-shadow-sm border-[1px] rounded text-right"
            >
              SUBMIT
            </button>
        </form>
        <Outlet />
      </div>
    </div>
  );
}

export default NewProductPage;
