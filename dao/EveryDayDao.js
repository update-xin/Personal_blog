const dbUtil = require("./DBUtil")

function insertEveryDay(content, ctime, success) {

    const sql = "insert into everyday (`content`,`ctime`) values (?,?);";
    const params = [content, ctime];
    const connection = dbUtil.createConnection();
    connection.connect();

    connection.query(sql, params, function (error, result) {
        if (error) {
            console.log(error)

        } else {

            success(result)
        }
    })
    connection.end()

}

function queryLastEveryDay(success) {
    const sql = "select * from everyday order by id desc limit 1";
    const connection = dbUtil.createConnection()
    connection.connect();
    connection.query(sql, function (error, result) {
        if (error) {
            console.log(error)
        } else {
            success(result)
        }
    })
    connection.end()
}

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryLastEveryDay = queryLastEveryDay;