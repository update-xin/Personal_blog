const dbUtil = require("./DBUtil")

function insertComments(blogId, commentsId, content, name, email, ctime, success) {
    const sql = "insert into comments (`blog_id`, `comments_id`, `content`, `name`, `email`, `ctime`) values (?, ?, ?, ?, ?, ?);";
    const params = [blogId, commentsId, content, name, email, ctime];
    const connection = dbUtil.createConnection();
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
function queryCommentsByBlogId(blogId, success) {
    const sql = "select * from comments where blog_id = ?;";
    const params = [blogId];
    const connection = dbUtil.createConnection();
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


module.exports.insertComments = insertComments;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;