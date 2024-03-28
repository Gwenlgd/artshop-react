import axios from "axios";

async function FetchAllProducts(setProducts, setFilteredProducts) {
  try {
    const { data } = await axios.get("https://pro-mana.adaptable.app/products");
    setProducts(data);
    setFilteredProducts(data);
  } catch (error) {
    console.log(error);
  }
}

export default FetchAllProducts;
