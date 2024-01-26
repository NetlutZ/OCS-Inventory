const {Users} = require('../models');

const logoutUser = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    try {
        const foundUser = await Users.findOne({
            where: {
                token: refreshToken,
            }
        });

        if (!foundUser) {
            res.clearCookie('jwt', {httpOnly: true});
            return ressendStatus(204);
        }

        Users.update({
            token: null,
        }, {
            where: {
                token: refreshToken,
            },
        });

        res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: true});
        res.sendStatus(204);

    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    logoutUser,
};