import express from "express"
import * as apiController from "../controller/apiController.js"
import userController from "../controller/userController.js"
import groupController from "../controller/groupController.js"

const router = express.Router()

/**
 * 
 * @param {*} app   - express app
 */

const testMiddleware = (req,res,next) => {
    console.log("calling a middleware");
    if(true){
        return res.send('calling a middleware')
    }
    next();
}

const initApiRoute = (app) => {
    router.get('/test-api', apiController.testApi)
    router.post('/register', apiController.handleRegister)
    router.post('/login', testMiddleware, apiController.handleLogin)

    router.get('/user/read', userController.readFunc)
    // test http://localhost:8080/api/v1/read?page=10&limit=30
    router.post('/user/create', userController.createFunc)
    router.put('/user/update', userController.updateFunc)
    router.delete('/user/delete', userController.deleteFunc)

    router.get('/group/read', groupController.readFunc)

    return app.use("/api/v1", router)
}

export default initApiRoute


