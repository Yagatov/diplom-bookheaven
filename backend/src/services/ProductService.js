import { client } from "../Database.js";

class ProductService {
    static async getById(id) {
        const result = await client.products.findUnique({
            where: { id },
            include: {
                categories: true
            }
        })
        return result;
    }
}

export default ProductService;