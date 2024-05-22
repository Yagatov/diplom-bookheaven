import { client } from "../../Database.js";

class ShopService {
    static async get(user_id) {
        const carts = await client.carts.findMany({
            where: { user_id },
            include: {
                product: true
            }
        });

        let totalPrice = 0;
        let totalBonus = 0;

        const result = {
            user_id,
            products: carts.map((cart) => {
                const result = cart.product;
                result.quantity = cart.quantity;

                totalPrice += cart.product.price * cart.quantity;
                if(cart.product.bonus != 0) {
                    totalBonus += cart.quantity * Math.floor(cart.product.price / 100 * cart.product.bonus);
                }
                return result;
            }),
            totalPrice,
            totalBonus
        }

        return result;
    }

    static async add(user_id, product_id) {
        const existingCart = await client.carts.findFirst({
            where: { user_id, product_id }
        });

        let cart = null;
          
        if (existingCart) {
            cart = await client.carts.update({
                where: {
                    id: existingCart.id
                },
                data: {
                    quantity: { increment: 1 }
                },
                select: {
                    quantity: true
                }
            });
        } else {
            cart = await client.carts.create({
                data: { user_id, product_id, quantity: 1 },
                select: {
                    quantity: true
                }
            });
        }

        return cart;
    }

    static async remove(cart_id) {
        const existingCart = await client.carts.findUnique({
            where: {
                id: cart_id
            }
        });

        let cart = {
            quantity: 0
        };
          
        if (existingCart) {
            if(existingCart.quantity === 1) {
                await client.carts.delete({
                    where: {
                        id: cart_id
                    }
                });
            } else {
                cart = await client.carts.update({
                    where: {
                        id: cart_id
                    },
                    data: {
                        quantity: { decrement: 1 }
                    },
                    select: {
                        quantity: true
                    }
                });
            }
        }
        return cart;
    }

    static async delete(user_id) {
        await client.carts.deleteMany({
            where: { user_id }
        });
    }
}

export default ShopService;