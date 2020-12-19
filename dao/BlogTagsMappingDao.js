const dbUtil = require("./DBUtil")

function insertBlogTagsMapping(blogId, tagsId, success) {
    const sql = "insert into blog_tags_mapping (`blog_id`, `tags_id`) values (?, ?);";
    const params = [blogId, tagsId];
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
function queryBlogTagsMappingByBlogId(blogId, success) {
    const sql = "select * from blog_tags_mapping where blog_id = ?;";
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
function queryBlogTagsMappingByTagsId(blogId, success) {
    const sql = "select * from blog_tags_mapping where tags_id = ?;";
    const params = [tagsId];
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

module.exports.insertBlogTagsMapping = insertBlogTagsMapping;
module.exports.queryBlogTagsMappingByBlogId = queryBlogTagsMappingByBlogId;
module.exports.queryBlogTagsMappingByTagsId = queryBlogTagsMappingByTagsId;
