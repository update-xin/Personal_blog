function getNow() {
    return Math.floor(new Date().getTime() / 1000)
}
function timeFormat(unixTime) {
    const date = new Date(unixTime * 1000);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
}
module.exports.getNow = getNow;
module.exports.timeFormat = timeFormat;