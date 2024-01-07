import express from "express"
const router = express.Router()

/**
 * 
 * @param {*} app   - express app
 */

const initWebRoute = (app) => {
    router.get('/', (req,res) => {
        return res.send('Hello World!')
    })

    return app.use("/", router)
}

export default initWebRoute