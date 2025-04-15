const fs = require('fs');
const path = './data/products.json';

class ProductManager {
    getProducts() {
        return JSON.parse(fs.readFileSync(path, 'utf-8'));
    }

    getProductById(id) {
        return this.getProducts().find(p => p.id == id);
    }

    addProduct(product) {
        const products = this.getProducts();
        const id = Date.now().toString();
        const newProduct = { id, ...product };
        products.push(newProduct);
        fs.writeFileSync(path, JSON.stringify(products, null, 2));
        return newProduct;
    }

    updateProduct(id, changes) {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id == id);
        if (index === -1) return null;
        products[index] = { ...products[index], ...changes, id: products[index].id };
        fs.writeFileSync(path, JSON.stringify(products, null, 2));
        return products[index];
    }

    deleteProduct(id) {
        const products = this.getProducts();
        const filtered = products.filter(p => p.id != id);
        if (products.length === filtered.length) return null;
        fs.writeFileSync(path, JSON.stringify(filtered, null, 2));
        return true;
    }
}

module.exports = ProductManager;