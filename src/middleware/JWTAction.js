require('dotenv').config();
import jwt from 'jsonwebtoken';

const nonSecurePaths = ['/', '/login', '/register', '/account'];

// encoded
const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key);
        // console.log(">>> check token: ", token);
    } catch(error){
        console.log(error);
    }
    return token;
}

// decoded
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET
    let decoded = null
    try {
        decoded = jwt.verify(token, key);
    } catch(err){
        console.log(err)
    }
    return decoded;
}

// check user login 
const checkUserJWT = (req,res,next) => {
    if (nonSecurePaths.includes(req.path) || req.path === '/account') return next();
    let cookies = req.cookies
    if(cookies && cookies.jwt){
        let token = cookies.jwt
        let decoded = verifyToken(token)
        // if have real token & decoded token successfully
        if(decoded){
            req.user = decoded;
            req.token = token;
            // console.log(">>> check request: ", req.user);
            next();
        } else {
            return res.status(401).json({
                EC: -1,
                DT: '',
                EN: 'Not authenticated the user'
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EN: 'Not authenticated the user'
        })
    }
}

const checkUserPermission = (req,res,next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    if(req.user){
        let email = req.user.email;   //decoded.email
        let roles = req.user.groupWithRoles.Roles;
        let currentUrl = req.path;
        if(!roles || roles.length === 0){
            return res.status(403).json({
                EC: -1,
                DT: '',
                EN: `You don't have permission to access this resource...`
            })
        }
        let canAccess = roles.some(item => item.url === currentUrl)
        if(canAccess === true){
            next();
        } else {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EN: `You don't have permission to access this resource...`
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EN: 'Not authenticated the user'
        })
    }
}

module.exports = {
    createJWT, verifyToken, checkUserJWT, checkUserPermission
}
