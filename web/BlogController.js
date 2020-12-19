const app = require("../express")
const url = require("url")
const blogDao = require("../dao/BlogDao")
const tagsDao = require("../dao/TagsDao")
const blogTagsMappingDao = require("../dao/BlogTagsMappingDao");
const timeUtil = require("../util/TimeUtil");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

app.post("/blog/addBlog", jsonParser, (req, res) => {
    blogDao.insertBlog(req.body.title, req.body.author, decodeURI(req.body.content), 0, timeUtil.getNow(), req.body.tags, (blogResult) => {
        let tags = req.body.tags.split(",")
        for (let i = 0; i < tags.length; i++) {
            tagsDao.queryTags(tags[i], (tagsResult) => {
                if (tagsResult.length > 0) {
                    blogTagsMappingDao.insertBlogTagsMapping(blogResult.insertId, tagsResult[0].id, function (result) { })
                } else {
                    tagsDao.insertTags(tags[i], function (newTagsResult) {
                        blogTagsMappingDao.insertBlogTagsMapping(blogResult.insertId, newTagsResult.insertId, function (result) { })
                    })
                }
            })
        }
        res.writeHead(200);
        res.end(JSON.stringify({ status: 1, msg: "ok" }))
    })
});

app.get("/blog/getBlogByPage", (req, res) => {
    const params = url.parse(req.url, true).query;
    const offset = params.offset;
    const limit = params.limit;
    blogDao.queryBlogByPage(parseInt(offset), parseInt(limit), (result) => {
        for (let i = 0; i < result.length; i++) {
            result[i].content = result[i].content.replace(/<[a-zA-Z]+>/g, "");
            result[i].content = result[i].content.replace(/<\/[a-zA-Z]+>/g, "");
            result[i].content = result[i].content.replace(/&nbsp|&gt|&lt/g, "");
            result[i].content = result[i].content.replace(/;/g, "");

            result[i].content = result[i].content.replace(/<img src="data:image\/jpeg;[\w\W]+>/g, "");
            result[i].ctime = timeUtil.timeFormat(result[i].ctime)
            if (result[i].content.length > 500) {
                result[i].content = result[i].content.substr(0, 500)
            }
        }
        res.writeHead(200);
        res.end(JSON.stringify(result))
    })
})

app.get("/blog/getTotalBlogCount", (req, res) => {
    blogDao.queryBlogCount((result) => {
        res.writeHead(200);
        res.end(JSON.stringify(result))
    })
})

app.get("/blog/getBlogDetail", (req, res) => {
    const params = url.parse(req.url, true).query;
    if (!params.id) {
        res.writeHead(400);
        res.end("must be have param id")
        return;
    }
    blogDao.queryBlogById(parseInt(params.id), (result) => {
        res.writeHead(200);
        res.end(JSON.stringify(result))
    })
})

app.get("/blog/getAllBlogMsg", (req, res) => {
    blogDao.queryAllBlog(result => {
        res.writeHead(200);
        res.end(JSON.stringify(result))
    })
})
app.get("/blog/getHotBlog", (req, res) => {
    blogDao.queryBlogByViews(result => {
        res.writeHead(200);
        res.end(JSON.stringify(result))
    })
})
app.get("/blog/search", (req, res) => {
    const params = url.parse(req.url, true).query;
    if (!params.search) {
        res.writeHead(400);
        res.end("must have be search");
        return;
    }
    blogDao.queryBlogBySearch(params.search, result => {
        blogDao.queryBlogBySearchCount(params.search, count => {
            res.writeHead(200);
            res.end(JSON.stringify({ count: count, list: result }))
        })
    })
})
app.get("/blog/addViews", (req, res) => {
    const params = url.parse(req.url, true).query;
    blogDao.addViews(params.id, result => {
        res.writeHead(200);
        res.end(JSON.stringify(result))
    })
})
app.get("/blog/tags", (req, res) => {
    const params = url.parse(req.url, true).query;
    if (!params.tags) {
        res.writeHead(400);
        res.end("must have be search");
        return;
    }
    blogDao.queryBlogByTags(params.tags, result => {
        blogDao.queryBlogByTagsCount(params.tags, count => {
            res.writeHead(200);
            res.end(JSON.stringify({ count: count, list: result }))
        })
    })
})
