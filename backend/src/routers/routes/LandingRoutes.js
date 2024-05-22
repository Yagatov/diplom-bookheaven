import Routes from "../Routes.js";

import LandingController from "../../controllers/LandingController.js";

class LandingRoutes extends Routes {
    _register() {
        this.router.get('/home', LandingController.getHomePage);
        this.router.get('/search', LandingController.getSearch);
        this.router.get('/category/:id', LandingController.getCategory);
        this.router.get('/product/:id', LandingController.getProduct);
    }
}

export default LandingRoutes;