require('dotenv').config();
const jwt = require('jsonwebtoken');

const authen = async (req, res, next) => {
    try {
        const authenHeader = req.headers.authorization || req.headers.Authorization;
        if (!authenHeader?.startsWith('Bearer ')) {
            return res.send({ error: 'No token' });
        }
        const token = req.headers.authorization.split(' ')[1];
        // data from jwt.sign
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    return res.send({ error: err.message });;
                }
                else {
                    req.user = decoded.UserInfo.username;
                    req.role = decoded.UserInfo.role;
                    next();
                    res.json({ decoded });
                }
            }
        );
        //res.json({ decoded });
    } catch (error) {
        res.send({ error: error.message });
    }

};

module.exports = {
    authen,
};