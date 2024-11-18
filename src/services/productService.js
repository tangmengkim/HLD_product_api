require('dotenv').config
const axios = require('axios');

const PRODUCT_SERVICE = process.env.API_SHOP

exports.fetchProductService = async (code) => {
    try {

        let data = JSON.stringify({
            "accessToken": null,
            "product_group": null,
            "text": code,
            "offset": 0,
            "extraInfo": null
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${PRODUCT_SERVICE}/api/shop/products/list`,
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
            },
            maxRedirects: 0,
            data: data
        };
        const response = await axios.request(config);
        if (response.data.data) {
            return response.data.data
        }
        return 0
    } catch {
        return 0
    }
}


