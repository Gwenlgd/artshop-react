import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import myAPI from "../../services/api";

function AddProduct() {
  const navigate = useNavigate();

  // State for new product
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("-1");
  const [description, setDescription] = useState("");
  // !! check this
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("-1");
  const [quantity, setQuantity] = useState("");
  // const [available, setAvailable] = useState(false);

  const handleTitle = (e) => setTitle(e.currentTarget.value);
  const handleCategory = (e) => setCategory(e.currentTarget.value);
  const handleDescription = (e) => setDescription(e.currentTarget.value);
  const handleImage = (e) => setImage(e.currentTarget.value);
  const handlePrice = (e) => setPrice(e.currentTarget.value);
  const handleType = (e) => setType(e.currentTarget.value);
  const handleQuantity = (e) => setQuantity(e.currentTarget.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = {
      // !! id?
      title,
      category,
      description,
      image,
      price,
      type,
      quantity,
    };
    myAPI.post("/products", newProduct).then((response) => {
      console.log(response);
      navigate(`/product/${response.data.id}`);
    });
    resetInputs();
  };

  const resetInputs = () => {
    setTitle("");
    setCategory("");
    setDescription("-1");
    setImage("");
    setPrice("-1");
    setType("");
    setQuantity("");
  };

  return (
    <div className="container-add-product-page">
      <form onSubmit={handleSubmit}>
        <span>New product</span>
        <div className="container-add-product">
          {/* TITLE */}
          <input
            name="title"
            type="text"
            placeholder="Title"
            id="title"
            value={title}
            onChange={handleTitle}
          />
          {/* CATEGORY */}
          <select
            name="category"
            id="category"
            value={category}
            onChange={handleCategory}
          >
            <option disabled value="-1">
              -- Add a category --
            </option>
            <option value="Abstract">Abstract</option>
            <option value="Landscape">Landscape</option>
            <option value="Portrait">Portrait</option>
            <option value="Still Life">Still Life</option>
            <option value="Surrealism">Surrealism</option>
          </select>
          {/* DESCRIPTION*/}
          <input
            name="description"
            type="text"
            placeholder="Description"
            id="description"
            value={description}
            onChange={handleDescription}
          />
          {/* IMAGE  NEED TO CHECK*/}
          <input
            name="image"
            type="text"
            placeholder="Image"
            id="image"
            value={image}
            onChange={handleImage}
          />
          {/* PRICE */}
          <input
            name="price"
            type="number"
            placeholder="Price"
            id="price"
            value={price}
            onChange={handlePrice}
          />
          <select name="type" id="type" value={type} onChange={handleType}>
            <option disabled value="-1">
              -- Add a type --
            </option>
            <option value="Print">Print</option>
            <option value="Original">Original</option>
          </select>
          {/* QUANTITY */}
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            id="quantity"
            value={quantity}
            onChange={handleQuantity}
          />
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
