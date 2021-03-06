const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // check for token
    if(!token) {
        // unauthorized user
        return res.status(401).json({ msg: 'No token found' });
    }

    try{
        // else verify token
        const decoded = jwt.verify(token, process.env.jwtSecret);
        // add user from payload
        req.user = decoded;
        next();
    }catch(e){
        res.status(400).json({ msg: 'Token is not valid' });

    }   
}

module.exports = auth;