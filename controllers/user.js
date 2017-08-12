module.exports = (schemas, bcrypt) => {

    const jwt = require('jsonwebtoken');

    const User = schemas.user;

    return {
        login: (req, res) => {
            const email = req.body.email;
            const password = req.body.password;
            if (!email) {
                return res.json({ success: false, message: 'Invalid e-mail' });
            } else if (!password) {
                return res.json({ success: false, message: 'Invalid password' });
            } else {
                const query = { email: email };
                User.findOne(query, (error, result) => {
                    if (error) return res.json({ success: false, message: error });
                    if (!result) {
                        return res.json({ success: false, message: 'User not found' });
                    } else {
                        bcrypt.compare(password, result.password, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                const token = jwt.sign(result, 'HAUHAUHAU', {
                                    expiresIn: 604800 // 1 week
                                });
                                return res.json({ success: true, message: 'Success', token: 'JWT ' + token, user: { _id: result._id, email: result.email, name: result.name, last_name: result.last_name } });
                            } else {
                                return res.json({ success: false, message: 'Wrong password' })
                            }
                        });
                    }
                });
            }
        },
        register: (req, res) => {
            const email = req.body.email;
            const name = req.body.name;
            const lastName = req.body.last_name;

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) throw err;
                    const password = hash;

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
                });
            });
        }, 
        auth: (req, res) => {
            return res.json({ success: true, message: 'Success', user: req.user });
        }
    }
}