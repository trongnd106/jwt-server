import express from "express"
import configViewEngine from "./configs/viewEngine.js"
import initWebRoute from "./routes/web.js"
import dotenv from "dotenv"
dotenv.config()
import bodyParser from "body-parser"


const app = express()

// config view engine
configViewEngine(app)

// config body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// init web routes
initWebRoute(app)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = ", PORT)
})