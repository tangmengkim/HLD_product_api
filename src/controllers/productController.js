const { json } = require('body-parser');
const db = require('../config/database')
require("dotenv").config
const Product = require('../models/Product');
const productService = require('../services/productService')

// const getProductList = async (req, res) => {
//     try {
//         const result = await db.query("SELECT * FROM product_on_stream");
//         return res.status(200).json({ data: result.recordset })
//     } catch {
//         return res.status(400).send("Server error")
//     }
// }
// const getTopProductUpdate = async (req, res) => {
//     try {
//         const result = await db.query("SELECT TOP 5 * FROM product_on_stream ORDER BY updated_at DESC")
//         return res.status(200).json({ data: result.recordset })

//     } catch {
//         return res.status(401).send("Server error.")
//     }
// }


const getTop = async (req, res) => {
    try {

        const products = await Product.findAll({
            limit: 5, // Limit to top 5
            order: [['updatedAt', 'DESC']], // Sort by updatedAt in descending order

        });

        return res.status(200).json({ data: products })
    } catch {
        return res.status(500).send("Server cannot find products!")
    }
}
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        return res.json(products);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching products', error });
    }
};
const addProduct = async (req, res) => {
    try {
        let { code, name, price } = req.body
        let images = ""
        if (!name || !price) {

            const productFromApi = await productService.fetchProductService(code);
            if (productFromApi) {
                code = productFromApi.list[0].code
                name = productFromApi.list[0].name
                price = productFromApi.list[0].price
                images = JSON.parse(productFromApi.list[0].images)

            }
        }
        if (images) {
            let urlFilter = []
            images.forEach(image => {
                if (image.startsWith(process.env.URL_IMAGE)) {
                    image = image.replace(process.env.URL_IMAGE, "")
                }
                urlFilter.push(image)
            });
            images = JSON.stringify(urlFilter)
        }
        if (!req) {
            return res.status(500).send("Can not add product!")
        }
        if (!name || !price) {
            return res.status(500).send("Can not add product. Name and price must be existed!")
        }
        // Upsert the product
        const [product, created] = await Product.upsert(
            { code, name, price, images },
            { where: { code } } // Specify the unique key to match existing rows
        );
        const message = created ? 'Product created' : 'Product updated';

        return res.status(created ? 201 : 200).json({ success: true, message, data: product })
    } catch (err) {
        console.log(err);

        return res.status(500).send("Server error.")
    }
}
module.exports = { getTop, addProduct, getProducts }