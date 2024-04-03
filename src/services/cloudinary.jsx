import axios from "axios";
// const CLD_PRESET = import.meta.env.VITE_CLD_PRESET;
// const CLD_NAME = import.meta.env.VITE_CLD_NAME;
const CLD_URL = import.meta.env.VITE_CLD_URL;

const cloudinary = axios.create({
  baseURL: CLD_URL,
});

cloudinary.upload = async function (file) {
  const formData = new FormData();
  formData.append("file", file);
  //formData.append('upload_preset',CLD_PRESET)

  const response = await cloudinary.post("/upload", formData);
  // console.log("API Response", response.data.secure_url);
  return response.data.secure_url;
};
export default cloudinary;
