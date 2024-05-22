import { ServerError } from "../Errors.js";
import ProductService from "../services/ProductService.js";
import ShopService from "../services/ShopService.js";

class PagesController {
    static async getHomePage(req, res, next) {
        const result = {
            categories: {
                navigation: []
            },
            sets: []
        }

        try {
            result.categories.navigation = await ShopService.getNavigationCategories(5);
            result.sets = await ShopService.getHomeSets(5)
        } catch(error) {
            return next(new ServerError());
        }

        res.send(result);
    }

    static async getSearch(req, res, next) {
        let result = {
            products: []
        }

        try {
            result.products = await ShopService.search(req.query?.message);
        } catch(error) {
            return next(new ServerError());
        }

        res.send(result)
    }

    static async getCategory(req, res, next) {
        let result = {}

        try {
            result = await ShopService.getProductsWhereCategory(Number(req.params.id));
        } catch(error) {
            return next(new ServerError());
        }

        res.send(result);
    }

    static async getProduct(req, res, next) {
        let result = {}

        try {
            result = await ProductService.getById(Number(req.params.id));
        } catch(error) {
            return next(new ServerError());
        }

        res.send(result);
    }
}

export default PagesController;