import { cartModel } from "./carts.models.js";
import { productModel } from "./products.models.js";

class CartDAO {
    async findAll(limit) {
        return await cartModel.find().limit(limit);
    }
    async findById(id) {
        return await cartModel.findById(id);
    }
    async create() {
        return await cartModel.create({});
    }
    async cleanCart(id) {
        const cart = await this.findById(id);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }
        cart.products = [];
        return await cart.save();
    }
    
    async addOrUpdateProductInCart(cartId, productId, quantity) {
        const cart = await this.findById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }
        const product = await productModel.findById(productId);
        if (!product) {
            throw new Error("Producto no encontrado");
        }

        const index = cart.products.findIndex(prod => prod.id_prod._id.toString() === productId);
        if (index !== -1) {
            cart.products[index].quantity = quantity;
        } else {
            cart.products.push({ id_prod: productId, quantity: quantity });
        }
        return await cart.save();
    }
    async removeProductbyId(cartId, productId) {
        const cart = await this.findById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }
        const product = await productModel.findById(productId);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        const index = cart.products.findIndex(prod => prod.id_prod._id.toString() === productId);
        if (index !== -1) {
            cart.products.splice(index, 1);
            
        } else {
            throw new Error("Producto no encontrado");
        }
        return await cart.save();
    }
    async updateCartWithProducts(cartId, productsArray) {
        console.log("Actualizando carrito con productos", productsArray);
        const cart = await this.findById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }
        for (let prod of productsArray) {
            const index = cart.products.findIndex(cartProduct => cartProduct.id_prod.toString() === prod.id_prod);
            if (index !== -1) {
                cart.products[index].quantity = prod.quantity;
            } else {
                const exists = await productModel.findById(prod.id_prod);
                if (!exists) {
                    throw new Error(`No se encontró el producto con el ID ${prod.id_prod}`);
                }
                cart.products.push(prod);
            }}
        return await cart.save();
    }}

export const CartManager = new CartDAO();