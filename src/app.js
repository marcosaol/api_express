const express = require('express');
const app = express();
const port = 8080;
const connection = require('./models/index.js');
const Product = require('./models/products/products.js');
const mongoose = require('mongoose');
app.use(express.json());

app.get('/', (req , res) => { 
	res.send("Hello world");
	});

app.post('/products', async (req, res) => {
	try {
	const newProduct = new Product({
	id: req.body.id,
	name: req.body.name,
	price: req.body.price,
	description: req.body.description
	});
	const productSaved = await newProduct.save();
	res.status(201).json(productSaved);
	}
	catch(error){
	res.status(500).json({error: 'Erro ao salvar o produto'});}
	});

app.get('/products/all', async (req, res) => {
	try {
	const products = await Product.find({});
	res.json(products);
		  } catch (err) {
	res.status(500).json({ error: 'Erro ao buscar produtos.' });
			    }
});
app.listen(port, () => console.log(`listening on port:${port}`));
