const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile);

const uploadImageTodisk = async (base64Image) => {
    const projectPath = path.resolve('./');
    const uploadPath = projectPath + '/public/images/';
    const ext = base64Image.substring(base64Image.indexOf('/') + 1, base64Image.indexOf(';base64'));

    let filename = '';
    if (ext === 'svg+xml') {
        filename = uuidv4.v4() + '.svg';
    }
    else {
        filename = uuidv4.v4() + `.${ext}`;
    }

    //extract base64 data ออกมา
    let image = decodeBase64Image(base64Image);

    //เขียนไฟล์เก็บไว้ที่ upload path
    await writeFileAsync(uploadPath + filename, image.data, 'base64');

    return filename;
}



function decodeBase64Image(base64Str) {
    var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var image = {};
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }

    image.type = matches[1];
    image.data = matches[2];

    return image;
}

module.exports = uploadImageTodisk