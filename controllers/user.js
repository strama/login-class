module.exports = (schemas) => {

    const user = schemas.user;

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
                user.findOne(query, (error, result) => {
                    if (error) return res.json({ success: false, message: error });
                    if (!result) {
                        return res.json({ success: false, message: 'User not found' });
                    } else {
                        return res.json({ success: true, message: 'Success', user: result });
                    }
                });
            }
        }
    }
}