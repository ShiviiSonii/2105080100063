const { v4: uuidv4 } = require("uuid");
const { getProductsFromAPI } = require("../utils/apiClient");

const E_COMMERCE_APIS = [
  process.env.E_COMMERCE_API_URL_1,
  process.env.E_COMMERCE_API_URL_2,
  process.env.E_COMMERCE_API_URL_3,
  process.env.E_COMMERCE_API_URL_4,
  process.env.E_COMMERCE_API_URL_5,
];

const fetchProductsFromAllAPIs = async (categoryName, params) => {
  const products = [];

  for (const apiUrl of E_COMMERCE_APIS) {
    const data = await getProductsFromAPI(apiUrl, categoryName, params);
    products.push(...data.products);
  }

  return products;
};

const processProducts = (products, sortBy, sortOrder) => {
  if (sortBy) {
    products.sort((a, b) => {
      if (sortOrder === "desc") {
        return b[sortBy] - a[sortBy];
      }
      return a[sortBy] - b[sortBy];
    });
  }

  return products;
};

const getTopProducts = async (categoryName, n, page = 1, sortBy, sortOrder) => {
  const products = await fetchProductsFromAllAPIs(categoryName, {
    limit: n,
    page,
  });
  const processedProducts = processProducts(products, sortBy, sortOrder);

  // Pagination
  const startIndex = (page - 1) * n;
  const endIndex = page * n;
  const paginatedProducts = processedProducts.slice(startIndex, endIndex);

  return paginatedProducts.map((product) => ({ ...product, id: uuidv4() }));
};

const getProductDetails = async (categoryName, productId) => {
  for (const apiUrl of E_COMMERCE_APIS) {
    try {
      const data = await getProductsFromAPI(apiUrl, categoryName, {});
      const product = data.products.find((p) => p.id === productId);
      if (product) {
        return { ...product, id: uuidv4() };
      }
    } catch (error) {
      console.log("Error on getting product details");
    }
  }
  throw new Error("Product not found");
};

module.exports = { getTopProducts, getProductDetails };
