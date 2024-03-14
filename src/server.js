import express from "express"
import configViewEngine from "./config/viewEngine"
import initWebRoute from "./routes/web"
import initApiRoute from "./routes/api"
require("dotenv").config()
import bodyParser from "body-parser"
import connection from "./config/connectDB"
import configCors from "./config/cors"
import cookieParser from "cookie-parser"
// import { verify } from "jsonwebtoken"


const app = express()

const PORT = process.env.PORT || 8080

// config cors
configCors(app)

// config view engine
configViewEngine(app)

// config body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// check DBconnection
connection()

// config cookie-parser
app.use(cookieParser())

// init web routes
initWebRoute(app)

// init web routes
initApiRoute(app)


app.use((req,res) => {
    res.send('404 not found')
})

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = ", PORT)
})