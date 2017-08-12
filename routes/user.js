module.exports = (controller, passport) => {

    return (router) => {
        router.post('/login', (req, res) => {
            controller.login(req, res);
        });
        
        router.post('/register', (req, res) => {
            controller.register(req, res);
        });

        router.post('/auth', passport.authenticate('jwt', { session: false }), (req, res) => {
            controller.auth(req, res);
        });
    }
}