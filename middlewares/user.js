module.exports = (controller) => {

    return (router) => {
        router.get('/user', (req, res) => {
            controller.get(req, res);
        });
    }
}