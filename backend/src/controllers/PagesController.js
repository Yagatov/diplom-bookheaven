import ShopService from "../services/ShopService.js";

class PagesController {
    static async home(req, res, next) {
        const result = {
            categories: {
                navigation: []
            },
            sets: []
        }

        result.categories.navigation = await ShopService.getNavigationCategories(5);
        result.sets = await ShopService.getHomeSets(5)

        res.send(result);
    }

    static async category(req, res, next) {
        let result = {}

        try {
            result = await ShopService.getProductsWhereCategory(Number(req.params.id));

            return res.send(result)
        } catch(error) {
            console.log(error);
            res.status(500).send({
                message: 'error'
            })
        }
    }

    static async search(req, res, next) {
        let result = {
            products: []
        }

        try {
            result.products = await ShopService.search(req.query?.message);

            return res.send(result)
        } catch(error) {
            console.log(error);
            res.status(500).send({
                message: 'error'
            })
        }
    }
}

export default PagesController;