module.exports = (controller) => {

    return (router) => {
        router.post('/login', (req, res) => {
            controller.login(req, res);
        });
        
        router.post('/register', (req, res) => {
            controller.register(req, res);
        });
    }
}