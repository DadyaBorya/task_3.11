const express = require("express")
const ejs = require('ejs');
const DatabaseController = require("./controllers/DatabaseController")
const client = require("./cache/cache")
const model = require("./models/model")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

app.set('views', 'templates');
app.set('view engine', 'ejs');
app.use(express.json())

const start = async () => {
    await client.open(process.env.REDIS_HOST)

    app.listen(PORT, () => {
        console.log(`Server start on port ${PORT}`)
    })
}

app.get("/mysql", DatabaseController.mysql)
app.get("/redis", DatabaseController.redis)

start()