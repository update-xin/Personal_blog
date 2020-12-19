const mysql = require("mysql")
function createConnection() {
    var connection = mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "qwe1415",
        database: "myblog"
    })
    return connection;
}
module.exports.createConnection = createConnection;