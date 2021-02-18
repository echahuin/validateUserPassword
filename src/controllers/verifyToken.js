// aquie tenemos un middleweare
const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const token = req.headers['x-acces-token'];
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'no token provider'
        })
    }
    const decoded = jwt.verify(token, 'unico');
    req.userId = decoded.id
    next()
}

module.exports = verifyToken;