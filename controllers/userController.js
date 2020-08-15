
const User = require('../models/user')

exports.index = async (req,res,next) => {
    const user = await User.find();
    return res.status(200).json({
        data : user
    })
} 

exports.register = async (req,res,next) =>{
    try {
        const {name,email,password} = req.body;

        const user = new User();
        user.name = name;
        user.email = email;
        user.password = await user.encryptPassword(password);
        await user.save();
    
        return res.status(201).json({
            message : 'สมัครสมาชิกเรียบร้อย'
        });
    } catch (error) {
        next(error);
    }
} 