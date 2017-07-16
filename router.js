module.exports = (express, routes) => {

    return (app) => {

        var router = express.Router();

        for (key in routes.middleware) {
            routes.middleware[key](router);
        }

        app.use('/api', router);
        return app;
    }
}