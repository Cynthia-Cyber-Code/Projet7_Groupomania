const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.auth = {
            userId: decodedToken.userId,
            isAdmin : decodedToken.isAdmin
        };
        next();
    } catch (error) {
        // window.location = "/"
        res.status(401).json({error});
    }
};