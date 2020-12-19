const dbUtil = require("./DBUtil")

function insertBlog(title, author, content, views, ctime, tags, success) {
    const sql = "insert into blog (`title`, `author`, `content`, `views`, `ctime`, `tags`) values (?, ?, ?, ?, ?, ?);";
    const params = [title, author, content, views, ctime, tags];
    const connection = dbUtil.createConnection();
    connection.connect()
    connection.query(sql, params, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            success(result)
        }
    })
    connection.end()
}

function deleteBlog(id, success) {
    const sql = "delete from blog where id = ?;";
    const params = [id];
    const connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, params, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            success(result)
        }
    })
    connection.end()
}
function addViews(id, success) {
    const sql = "update blog set views = views + 1 where id = ?;";
    const params = [id];
    const connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, params, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            success(result)
        }
    })
    connection.end()
}
function queryAllBlog(success) {
    const sql = "select id, title, author, views, ctime, tags from blog order by ctime desc;";
    const connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            success(result)
        }
    })
    connection.end()
}
function queryBlogCount(success) {
    const sql = "select count(1) as count from blog;";
    const connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            success(result)
        }
    })
    connection.end()
}
function queryBlogByPage(offset, limit, success) {
    const sql = "select * from blog order by id desc limit ?,?;";
    const params = [offset, limit];
    const connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, params, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            success(result)
        }
    })
    connection.end()
}
function queryBlogByViews(success) {
    const sql = "select * from blog order by views desc limit 10;";
    const connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            success(result)
        }
    })
    connection.end()
}
function queryBlogById(id, success) {
    const sql = "select * from blog where id = ?;";
    const params = [id];
    const connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, params, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            success(result)
        }
    })
    connection.end()
}
function queryBlogBySearch(search, success) {
    var sql = "select * from blog where title like concat(concat('%', ?), '%') or content like concat(concat('%', ?), '%');";
    var params = [search, search];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, params, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}
function queryBlogBySearchCount(search, success) {
    var sql = "select count(1) from blog where title like concat(concat('%', ?), '%') or content like concat(concat('%', ?), '%');";
    var params = [search, search];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, params, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}
function queryBlogByTags(tags, success) {
    var sql = "select * from blog where tags = ?;";
    var params = [tags];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, params, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}
function queryBlogByTagsCount(tags, success) {
    var sql = "select count(1) from blog where tags = ?;";
    var params = [tags];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, params, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}

module.exports.insertBlog = insertBlog;
module.exports.deleteBlog = deleteBlog;
module.exports.addViews = addViews;
module.exports.queryAllBlog = queryAllBlog;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogByViews = queryBlogByViews;
module.exports.queryBlogById = queryBlogById;
module.exports.queryBlogBySearch = queryBlogBySearch;
module.exports.queryBlogBySearchCount = queryBlogBySearchCount;
module.exports.queryBlogByTags = queryBlogByTags;
module.exports.queryBlogByTagsCount = queryBlogByTagsCount;

