const fs = require("fs")
const files = fs.readdirSync("./web")
for (let i = 0; i < files.length; i++) {
    require("./web/" + files[i])
}