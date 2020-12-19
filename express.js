const express = require("express")
// const cookie = require("cookie-parser")
// const bodyParser = require("body-parser")
const path = require("path")
const filename = path.resolve(__dirname, "./page")
const app = express()
app.use(express.static(filename))

module.exports = app;