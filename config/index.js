const dotenv = require('dotenv')

dotenv.config();

module.exports = {
    NODE_ENV : process.env.NODE_ENV,
    PORT : process.env.PORT,
    JWT_SECRET :process.env.JWT_SECRET,
    MONGODB_URI : process.env.MONGODB_URI,
    IMAGE_PATH : process.env.IMAGE_PATH
}

