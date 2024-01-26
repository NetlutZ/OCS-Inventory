const jwt = require('jsonwebtoken');
const authenRole = (...allowedRoles) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
    
        if (!token) {
          return res.status(401).json({ message: 'Unauthorized: Token missing' });
        }
    
        try {
          const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
          if (!allowedRoles.includes(decoded.UserInfo.role)) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
          }
    
          req.user = decoded;
          next();
        } catch (error) {
          return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
      };
}

module.exports = {
    authenRole,
};