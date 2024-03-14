import express from "express"
import * as apiController from "../controller/apiController.js"
import userController from "../controller/userController.js"
import groupController from "../controller/groupController.js"
import {checkUserJWT, checkUserPermission} from "../middleware/JWTAction.js"

const router = express.Router()

/**
 * 
 * @param {*} app   - express app
 */

// const checkUserLogin = (req,res,next) => {
//     const nonSecurePaths = ['/', '/register', '/login'];
//   if (nonSecurePaths.includes(req.path)) return next();

//   //authenticate user
//   if(user){
//     next();   
//   } else {

//   }
// }

const testMiddleware = (req,res,next) => {
    console.log("calling a middleware");
    if(true){
        return res.send('reject middleware')
    }
    next();
}


const initApiRoute = (app) => {
    router.all('*', checkUserJWT, checkUserPermission);

    router.post('/register', apiController.handleRegister)
    router.post('/login', apiController.handleLogin)
    router.get('/account', userController.getUserAccount)

    router.get('/user/read', userController.readFunc)
    // test http://localhost:8080/api/v1/read?page=10&limit=30
    router.post('/user/create', userController.createFunc)
    router.put('/user/update', userController.updateFunc)
    router.delete('/user/delete', userController.deleteFunc)

    router.get('/group/read', groupController.readFunc)

    return app.use("/api/v1", router)
}

export default initApiRoute


