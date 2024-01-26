const bcrypt = require('bcrypt');
const { Users } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { use } = require('../routes/Device');
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Users.findOne({
            where: {
                username: username,
            },
        });

        if (user) {
            const compare = await bcrypt.compare(password, user.password);
            if (compare) {
                const token = jwt.sign(
                    {
                        "UserInfo":{
                            username: user.username,
                            role: user.role,
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '30s' }
                );

                Users.update({
                    token: token,
                }, {
                    where: {
                        username: username,
                    },
                });

                req.session.username = user.username;
                res.cookie('jwt', token, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 1000 * 60 * 30 });
                res.send({ Login: true, token: token });
            } else {
                res.send({ Login: false, error: 'Wrong password' });
            }
        } else {
            res.send({ Login: false, error: 'User not found' });
        }
    } catch (error) {
        res.send({ error: error.message });
    }
};

module.exports = {
    loginUser,
};