import axios from "axios";

const myAPI = axios.create({ baseURL: "https://pro-mana.adaptable.app" })

myAPI.getAllProducts = function () {
  return myAPI.get(
    "/products"
  ).then(response => response.data
  )
}

export default myAPI


// can put allproduct, etc
