import express from "express"
import * as homeController 
    from "../controller/homeController.js"
const router = express.Router()

/**
 * 
 * @param {*} app   - express app
 */

const initWebRoute = (app) => {
    router.get('/', homeController.handleCheck)
    router.get('/user', homeController.handleUserPage)
    router.post('/user/create-user', homeController.handleCreateNewUser)
    router.post('/delete-user/:id', homeController.handleDeleteUser)
    router.get('/update-user/:id', homeController.getUpdateUserPage)
    router.post('/user/update-user', homeController.handleUpdateUser)
    
    return app.use("/", router)
}

export default initWebRoute


