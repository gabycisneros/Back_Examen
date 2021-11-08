const jwt = require("jsonwebtoken");

function verifier(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send("unauthorized no clave");
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null'){
        return res.status(401).send("unauthorized no token");
    }
    const payload = jwt.verify(token, 'secret');
    console.log('payload '+payload._id);
    req.userId = payload._id;
    next();
}

module.exports = verifier;