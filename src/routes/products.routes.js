const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');
const pm = new ProductManager();

router.get('/', (req, res) => {
    const products = pm.getProducts();
    res.json(products);
});

router.get('/:pid', (req, res) => {
    const product = pm.getProductById(req.params.pid);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
});

router.post('/', (req, res) => {
    const newProduct = req.body;
    const created = pm.addProduct(newProduct);
    res.status(201).json(created);
});

router.put('/:pid', (req, res) => {
    const updated = pm.updateProduct(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(updated);
});

router.delete('/:pid', (req, res) => {
    const deleted = pm.deleteProduct(req.params.pid);
    if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
});

module.exports = router;