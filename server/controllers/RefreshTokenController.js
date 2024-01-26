const { Users } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const refreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        res.status(401).send({ error: 'No token' });
        return;
    }
    const refreshToken = cookies.jwt;
    try {
        const foundUser = await Users.findOne({
            where: {
                token: refreshToken,
            }
        });

        if (foundUser) {
            jwt.verify(
                refreshToken,
                process.env.ACCESS_TOKEN_SECRET,
                (err, decoded) => {
                    console.log(decoded)
                    if (err || foundUser.username !== decoded.UserInfo.username) {
                        console.log(foundUser.username, decoded.username)
                        res.status(403).send({ error: err.message });
                        return;
                    }
                    const token = jwt.sign(
                        {
                            "UserInfo":{
                                username: foundUser.username,
                                role: foundUser.role,
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '30s' }
                    );
                    res.json({ token });
                });
        } else {
            res.status(403).send({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    refreshToken,
};