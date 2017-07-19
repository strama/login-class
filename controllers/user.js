module.exports = (schemas) => {

    const User = schemas.user;

    return {
        get: (req, res) => {
            const email = req.query.email;
            const password = req.query.password;
            if (!email) {
                return res.json({ success: false, message: 'Invalid e-mail' });
            } else if (!password) {
                return res.json({ success: false, message: 'Invalid password' });
            } else {
                const query = { email: email, password: password };
                User.findOne(query, (error, result) => {
                    if (error) return res.json({ success: false, message: error });
                    if (!result) {
                        return res.json({ success: false, message: 'User not found' });
                    } else {
                        return res.json({ success: true, message: 'Success', user: result });
                    }
                });
            }
        },
        post: (req, res) => {
            const email = req.body.email;
            const password = req.body.password;
            const name = req.body.name;
            const lastName = req.body.last_name;
            if (!email) {
                return res.json({ success: false, message: 'Invalid e-mail' });
            } else if (!password) {
                return res.json({ success: false, message: 'Invalid password' });
            } else if (!name) {
                return res.json({ success: false, message: 'Invalid name' });
            } else if (!lastName) {
                return res.json({ success: false, message: 'Invalid last name' });
            } else {
                var user = new User();
                user.email = email;
                user.password = password;
                user.name = name;
                user.last_name = lastName;
                user.save(error => {
                    if (error) return res.json({ success: false, message: 'Failed to register new user' });
                    return res.json({ success: true, message: 'Success' });
                });
            }
        }
    }
}