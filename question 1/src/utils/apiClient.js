const axios = require('axios');

const getProductsFromAPI = async (url, categoryName, params) => {
    try {
        const response = await axios.get(`${url}/categories/${categoryName}/products`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching products from API:', error.message);
        throw error;
    }
};

module.exports = { getProductsFromAPI };
