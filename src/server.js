import express from "express"
import configViewEngine from "./config/viewEngine.js"
import initWebRoute from "./routes/web.js"
import dotenv from "dotenv"
dotenv.config()
import bodyParser from "body-parser"
import connection from "./config/connectDB.js"


const app = express()

// config view engine
configViewEngine(app)

// config body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// check DBconnection
connection()

// init web routes
initWebRoute(app)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = ", PORT)
})