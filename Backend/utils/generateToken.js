const jwt = require("jsonwebtoken");

const generateToken = (userId, role = "user") => {

    return jwt.sign(

        {
            id: userId,
            role
        },

        process.env.JWT_SECRET,

        {
            expiresIn: process.env.JWT_EXPIRE
        }

    );

};

module.exports = generateToken;