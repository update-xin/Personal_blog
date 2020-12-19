const dbUtil = require("./DBUtil")


function insertTags(name, success) {
    var sql = "insert into tags (`name`) values (?);";
    var params = [name];
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

function queryTags(name, success) {
    var sql = "select * from tags where name = ?;";
    var params = [name];
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

function queryAllTags(success) {
    var sql = "select * from tags;";
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}

module.exports.insertTags = insertTags;
module.exports.queryTags = queryTags;
module.exports.queryAllTags = queryAllTags;