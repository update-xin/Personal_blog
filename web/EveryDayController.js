const app = require("../express")
const url = require("url")
const everyDayDao = require("../dao/EveryDayDao")
const timeUtil = require("../util/TimeUtil")

app.get("/blog/addEveryDay", (req, res) => {
    const params = url.parse(req.url, true).query;
    everyDayDao.insertEveryDay(params.content, timeUtil.getNow(), (result) => {
        res.writeHead(200);
        res.end(JSON.stringify({ status: 1, msg: "success" }))
    })
})
app.get("/blog/getEveryDay", (req, res) => {
    everyDayDao.queryLastEveryDay((result) => {
        res.writeHead(200);
        res.end(JSON.stringify(result))
    })
})

