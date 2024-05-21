import axios from 'axios';
import { useState, useEffect } from 'react';
import { Outlet, NavLink, useParams } from "react-router-dom";
import '../product.css';

function EditProductPage() {
  const [formData, setFormData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    products()
  }, []);

  const products = async () => {
    axios.get(`/api/products/${id}`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleChange = (event) => {
    const { id, value } = event.target;
    let data;

    if (id === 'features') {
      data = value.split(',').map((item) => item.trim());
    } else if (id === 'sizes') {
      data = value.split(',').map((item) => item.trim());
    } else {
      data = value;
    }
    
    if (id === 'type' && value === 'outerwear') {
      formData.materials = '';
    }

    setFormData((prevFormData) => ({ ...prevFormData, [id]: data }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/validate', formData)
      .then(() => {
        let product = {
          name: formData.name,
          type: formData.type,
          sizes: formData.sizes,
          features: formData.features,
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

        axios.put(`/api/products/${id}`, product)
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
        <h1 className="text-3xl font-bold border-b-[1px] w-2/4 text-left h-[42px] overflow-hidden">
          Edit Product
        </h1>
        <NavLink
          to="/"
          className="bg-white p-2 font-semibold hover:drop-shadow-sm border-[1px] rounded border-stone-300"
        >
          Back
        </NavLink>
      </div>
      <div className='bg-white w-2/4 mx-auto page-wrapper'>
        <form className="form text-right" onSubmit={handleSubmit}>
          <input 
            type="text"
            id="name"
            name="name"
            defaultValue={formData?.name ? formData.name : ''}
            placeholder="Product Name"
            className="rounded border-2 border-[#D7D7D7] w-full p-2 mb-6"
            onChange={handleChange}
          />
          <select
            name="type"
            id="type"
            className="rounded border-2 border-[#D7D7D7] w-full pt-2 pb-2 pl-2 pr-4 arrow mb-6"
            value={formData?.type ? formData?.type : 'productType'}
            onChange={handleChange}
          >
            <option value="productType">Product Type</option>
            <option value="footwear">Footwear</option>
            <option value="activewear">Activewear</option>
            <option value="outerwear">Outerware</option>
            <option value="dress">Dress</option>
            <option value="top">Top</option>
          </select>
          {
            formData.type && 
            <>
              <input 
                type="text"
                id="sizes"
                defaultValue={formData?.sizes ? formData.sizes : ''}
                placeholder="Size"
                className="rounded border-2 border-[#D7D7D7] w-full p-2 mb-6"
                onChange={handleChange}
              />
              <input 
                type="text"
                id="features"
                defaultValue={formData?.features ? formData.features : ''}
                placeholder="Features"
                className="rounded border-2 border-[#D7D7D7] w-full p-2 mb-6"
                onChange={handleChange}
              />
              <input 
                type="text"
                id="brand"
                defaultValue={formData?.brand ? formData.brand : ''}
                placeholder="Brand"
                className="rounded border-2 border-[#D7D7D7] w-full p-2 mb-6"
                onChange={handleChange}
              />
            </>
          }
          <button
            type="submit"
            className="bg-black p-2 text-white font-semibold hover:drop-shadow-sm border-[1px] rounded text-right"
          >
            SUBMIT
          </button>
        </form>
        <Outlet />
      </div>
    </div>
  );
}

export default EditProductPage;
