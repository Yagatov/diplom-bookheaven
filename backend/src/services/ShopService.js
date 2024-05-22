import { client } from "../Database.js";
import AccountService from "./AccountService.js";

class ShopService {
    static async getDataDashboard() {
        const [orders, users, products, categories, messages] = await client.$transaction([
            client.orders.count(),
            client.users.count(),
            client.products.count(),
            client.categories.count(),
            client.messages.count()
        ]);

        return [
            { name: "Заказы", count: orders },
            { name: "Пользователи", count: users },
            { name: "Товары", count: products },
            { name: "Категории", count: categories },
            { name: "Сообщения", count: messages },
        ];
    }

    static async getNavigationCategories(limit, select = { id: true, name: true }) {
        const result = await client.categories.findMany({
            where: {
                navigation: true,
                status: "ACTIVE"
            },
            take: limit
        });
        return result;
    }

    static async getHomeSets(limit) {
        const result = await client.categories.findMany({
            where: {
                sets: true,
                status: "ACTIVE"
            },
            select: {
                id: true,
                name: true,
                products: {
                    where: {
                        status: "ACTIVE"
                    },
                    take: limit,
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        author: true,
                        price: true,
                        bonus: true
                    }
                }
            }
        });
        return result;
    }

    static async search(message) {
        const result = await client.products.findMany({
            where: {
                name: {
                    contains: message
                }
            }
        });
        return result;
    }
    
    // Categories
    static async getCategories() {
        const result = await client.categories.findMany();
        return result;
    }

    static async createCategory(name, navigation, sets, status) {
        const result = await client.categories.create({
            data: {
                name,
                navigation: navigation ? true : false,
                sets: sets ? true : false,
                status: status ? "ACTIVE" : "DISABLED"
            }
        });
        return result;
    }

    static async deleteCategory(id) {
        await client.categories.delete({
            where: {
                id
            }
        });
    }

    static async updateCategory(id, name, navigation, sets, status) {
        const result = await client.categories.update({
            where: {
                id
            },
            data: {
                name,
                navigation,
                sets,
                status
            }
        })
    }

    static async updateStatusCategory(id, status) {
        const result = await client.categories.update({
            where: {
                id
            },
            data: {
                status
            }
        })
        return result;
    }

    // Products
    static async getProducts() {
        const result = await client.products.findMany({
            include: {
                categories: true
            }
        });
        return result;
    }

    static async getProductsWhereCategory(categoryId) {
        const result = await client.categories.findUnique({
            where: {
                status: "ACTIVE",
                id: categoryId
            },
            select: {
                id: true,
                name: true,
                products: {
                    where: {
                        status: "ACTIVE"
                    },
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        author: true,
                        price: true,
                        bonus: true
                    }
                }
            }
        });
        return result;
    }

    static async createProduct(name, author, image, price, bonus, status) {
        const result = await client.products.create({
            data: {
                name,
                author,
                image,
                price,
                bonus,
                description: '-',
                status: status ? "ACTIVE" : "DISABLED"
            }
        });
        return result;
    }

    static async deleteProduct(id) {
        await client.products.delete({
            where: {
                id
            }
        });
    }

    static async updateProduct(id, name, author, image, price, bonus, status, categories) {
        const connects = categories.map(item => {
            return { id: item }
        })

        const result = await client.products.update({
            where: {
                id
            },
            data: {
                name,
                author,
                image,
                price,
                bonus,
                status,
                categories: {
                    set: connects
                }
            }
        });
        return result;
    }

    static async getCart(user_id) {
        const result = await client.carts.findMany({
            where: {
                user_id
            },
            include: {
                product: true
            }
        })

        return result;
    }

    static async addProductToCart(user_id, product_id) {
        const existingCart = await client.carts.findFirst({
            where: {
                user_id,
                product_id
            }
        });

        let cart = null;
          
        if (existingCart) {
            cart = await client.carts.update({
                where: {
                    id: existingCart.id
                },
                data: {
                    quantity: {
                        increment: 1 
                    }
                },
                select: {
                    quantity: true
                }
            });
        } else {
            cart = await client.carts.create({
                data: {
                    user_id,
                    product_id,
                    quantity: 1
                },
                select: {
                    quantity: true
                }
            });
        }

        return cart;
    }

    static async removeProductFromCart(user_id, product_id) {
        const existingCart = await client.carts.findFirst({
            where: {
                user_id,
                product_id
            }
        });

        let cart = {
            quantity: 0
        };
          
        if (existingCart) {
            if(existingCart.quantity === 1) {
                await client.carts.delete({
                    where: {
                        id: existingCart.id
                    }
                });
            } else {
                cart = await client.carts.update({
                    where: {
                        id: existingCart.id
                    },
                    data: {
                        quantity: {
                            decrement: 1 
                        }
                    },
                    select: {
                        quantity: true
                    }
                });
            }
        }
        return cart;
    }

    static async deleteProductFromCart(user_id, product_id) {
        await client.carts.deleteMany({
            where: {
                user_id,
                product_id
            }
        });
    }

    static async deleteCart(user_id) {
        await client.carts.deleteMany({
            where: {
                user_id
            }
        });
    }

    static async getAllOrders() {
        const result = await client.orders.findMany({
            include: {
                user: true
            },
            orderBy: {
                id: "desc"
            }
        });
        return result;
    }

    static async getOrders(user_id) {
        const result = await client.orders.findMany({
            where: {
                user_id
            }
        });
        return result;
    }

    static async getOrder(id) {
        const result = await client.orders.findUnique({
            where: { id },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                },
                user: true
            }
        });
        return result;
    }

    static async createOrder(user_id, price) {
        const result = await client.orders.create({
            data: {
                user_id,
                price
            }
        });
        return result;
    }

    static async setOrderStatus(id, status) {
        const result = await client.orders.update({
            where: { id },
            data: { status },
            include: {
                user: true
            }
        });

        return result;
    }

    static async giveOrderBonus(order_id, user_id, bonus) {
        await AccountService.updateBonus(user_id, bonus);
        const result = await client.orders.update({
            where: { id: order_id },
            data: { bonus_completed: true }
        });

        return result;
    }

    static async getAllUsers() {
        const result = await client.users.findMany();
        return result;
    }

    static async getUser(id) {
        const result = await client.users.findUnique({
            where: { id }
        });
        return result;
    }

    static async setUserRole(id, role) {
        const result = await client.users.update({
            where: { id },
            data: { role }
        });

        return result;
    }

    static async getAllMessages() {
        const result = await client.messages.findMany({
            include: {
                user: true
            }
        });
        return result;
    }
}

export default ShopService;