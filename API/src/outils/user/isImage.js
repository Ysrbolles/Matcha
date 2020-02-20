var fs = require('fs');
const isEmpty = require('../empty/isEmpty');
const fileType = require('file-type')
// function to encode file data to base64 encoded string
function isImage(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    let test = new Buffer(bitmap).toString('base64');
    const mimeInfo = fileType(Buffer.from(test, 'base64'))
    if(isEmpty(mimeInfo)) return false
    if(mimeInfo.ext != 'gif' && mimeInfo.ext != 'jpeg' && mimeInfo.ext != 'jpg' && mimeInfo.ext != 'png') return false
    if(isEmpty(test)) return false
    return true
}
module.exports = isImage
