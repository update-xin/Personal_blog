const app = require("../express")
const url = require("url")
const tagsDao = require("../dao/TagsDao")

app.get("/getTagsCloud", (req, res) => {
    tagsDao.queryAllTags(result => {
        result.sort(() => {
            return 0.5 - Math.random()
        })
        res.writeHead(200);
        res.end(JSON.stringify(result))
    })
})