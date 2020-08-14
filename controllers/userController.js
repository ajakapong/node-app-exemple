
const User = require('../models/user')

exports.index = async (req,res,next) => {
    const user = await User.find();
    return res.status(200).json({
        data : user
    })
} 