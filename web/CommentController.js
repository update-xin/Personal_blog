const app = require("../express")
const url = require("url")
const timeUtil = require("../util/TimeUtil");
const commentDao = require("../dao/CommentsDao");
const cpatcha = require("svg-captcha")

app.get("/blog/sendComment", (req, res) => {
    const params = url.parse(req.url, true).query;
    commentDao.insertComments(parseInt(params.blogId), parseInt(params.commentId), params.content, params.name, params.email, timeUtil.getNow(), (result) => {
        res.writeHead(200);
        res.end()
    })
})
app.get("/blog/getRandomCode", (req, res) => {
    const img = cpatcha.create({ fontSize: 50, width: 100, height: 35 });
    res.writeHead(200);
    res.end(JSON.stringify(img))
})
app.get("/blog/getComment", (req, res) => {
    const params = url.parse(req.url, true).query;
    if (!params.id) {
        response.writeHead(400);
        response.end("must be have id");
        return;
    }
    commentDao.queryCommentsByBlogId(parseInt(params.id), (result) => {
        const map = new Map();
        for (let i = 0; i < result.length; i++) {
            result[i].ctime = timeUtil.timeFormat(result[i].ctime)
            map.set(result[i].id, result[i].name);
            if (result[i].comments_id !== 0) {
                result[i].name = result[i].name + " 回复 " + map.get(result[i].comments_id);

            }
        }
        res.writeHead(200);
        res.end(JSON.stringify(result))
        return;
    })
})
