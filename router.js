module.exports = (express, routes) => {

    return (app) => {

        var router = express.Router();

        for (key in routes.routes) {
            routes.routes[key](router);
        }

        app.use('/api', router);
        return app;
    }
}