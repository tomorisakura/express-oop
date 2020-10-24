const jwt = require('jsonwebtoken');

class Auth {

    authorization(req, res, next) {
        try {

            const token = req.headers['authorization'];
            
            jwt.verify(token, 'secret_key', (err, decoded) => {
                if(err) res.send({ message : err });
                req.decoded = decoded;
                next();
            })
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Auth;