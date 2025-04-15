const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');
const cm = new CartManager();

router.post('/', (req, res) => {
    const cart = cm.createCart();
    res.status(201).json(cart);
});

router.get('/:cid', (req, res) => {
    const cart = cm.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
});

router.post('/:cid/product/:pid', (req, res) => {
    const updatedCart = cm.addProductToCart(req.params.cid, req.params.pid);
    if (!updatedCart) return res.status(404).json({ error: 'No se pudo agregar el producto' });
    res.json(updatedCart);
});

module.exports = router;