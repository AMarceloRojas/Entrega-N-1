const fs = require('fs');
const pathCarts = './data/carts.json';
const ProductManager = require('./ProductManager');
const pm = new ProductManager();

class CartManager {
    getCarts() {
        return JSON.parse(fs.readFileSync(pathCarts, 'utf-8'));
    }

    getCartById(id) {
        return this.getCarts().find(c => c.id == id);
    }

    createCart() {
        const carts = this.getCarts();
        const id = Date.now().toString();
        const newCart = { id, products: [] };
        carts.push(newCart);
        fs.writeFileSync(pathCarts, JSON.stringify(carts, null, 2));
        return newCart;
    }

    addProductToCart(cid, pid) {
        const carts = this.getCarts();
        const cartIndex = carts.findIndex(c => c.id == cid);
        if (cartIndex === -1) return null;

        const product = pm.getProductById(pid);
        if (!product) return null;

        const existingProduct = carts[cartIndex].products.find(p => p.product === pid);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            carts[cartIndex].products.push({ product: pid, quantity: 1 });
        }

        fs.writeFileSync(pathCarts, JSON.stringify(carts, null, 2));
        return carts[cartIndex];
    }
}

module.exports = CartManager;