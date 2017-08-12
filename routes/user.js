module.exports = (controller) => {

    return (router) => {
        router.get('/user', (req, res) => {
            controller.get(req, res);
        });
        
        router.post('/user', (req, res) => {
            controller.post(req, res);
        });
    }
}