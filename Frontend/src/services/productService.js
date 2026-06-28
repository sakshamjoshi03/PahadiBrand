import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// GET /api/products
export const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  // The backend returns: { success: true, count: 6, data: [...] }
  // Home.jsx expects:
  //   const response = await getAllProducts();
  //   setProducts(response.data);
  // So returning { data: response.data.data } ensures response.data is the array.
  return {
    data: response.data.data
  };
};

// GET /api/products/:id
export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// POST /api/products
export const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

// PUT /api/products/:id
export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/${id}`, productData);
  return response.data;
};

// DELETE /api/products/:id
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// GET /api/products/search?q=keyword
export const searchProducts = async (query) => {
  const response = await axios.get(`${API_URL}/search`, {
    params: { q: query }
  });
  return response.data;
};
