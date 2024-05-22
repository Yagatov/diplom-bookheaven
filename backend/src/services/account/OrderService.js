import { client } from "../../Database.js";

class OrderService {
    static async getAll() {
        const result = await client.orders.findMany({
            include: {
                orderItems: true
            }
        });
        return result;
    }

    static async get(user_id) {
        const result = await client.orders.findMany({
            where: { user_id },
            orderBy: {
                id: 'desc'
            }
        });
        return result;
    }

    static async getOne(user_id, id) {
        const result = await client.orders.findUnique({
            where: { user_id, id },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                }
            }
        });
        return result;
    }

    static async create(user_id, products, price, bonus) {
        // TEMP!!!
        const status = "process";

        const result = await client.orders.create({
            data: { 
                user_id, 
                price, 
                status,
                bonus_give: bonus.give,
                bonus_take: bonus.take,
                orderItems: {
                    create: products.map(item => {
                        return {
                            product_id: item.id,
                            quantity: item.quantity
                        }
                    })
                }
            }
        });
        return result;
    }
}

export default OrderService;