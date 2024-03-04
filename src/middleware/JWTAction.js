require('dotenv').config();
import jwt from 'jsonwebtoken';

// encoded
const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key);
    } catch(error){
        console.log(error);
    }
    return token;
}

// decoded
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null
    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch(err){
        console.log(err);
    }
    return data;
}

module.exports = {
    createJWT, verifyToken
}
