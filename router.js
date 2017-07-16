module.exports = (express, routes) => {

    return (app) => {

        var router = express.Router();

        for (key in routes.middlewares) {
            routes.middlewares[key](router);
        }

        app.use('/api', router);
        return app;
    }
}