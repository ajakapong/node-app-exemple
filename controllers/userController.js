
const User = require('../models/user')
const { validationResult } = require('express-validator');

exports.index = async (req, res, next) => {
    const user = await User.find();
    return res.status(200).json({
        data: user
    })
}

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const error = new Error('ข้อมูลที่ส่งมาไม่ถูกต้อง');
          error.statusCode = 422;
          error.validation = errors.array()
          throw error;
        }

        //check email ซ้ำ
        const existEmail = await User.findOne({ email: email });
        if (existEmail) {
            const error = new Error('อีเมล์ซ้ำ มีผู้ใช้งานแล้ว');
            error.statusCode = 400;
            throw error;
        }

        const user = new User();
        user.name = name;
        user.email = email;
        user.password = await user.encryptPassword(password);
        await user.save();

        return res.status(201).json({
            message: 'สมัครสมาชิกเรียบร้อย'
        });

    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const error = new Error('ข้อมูลที่ส่งมาไม่ถูกต้อง');
          error.statusCode = 422;
          error.validation = errors.array()
          throw error;
        }

        //check ว่ามีอีเมล์นี้ในระบบหรือไม่
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error('ไม่พบอีเมล์นี้ในระบบ');
            error.statusCode = 401;
            throw error;
        }

        //เปรียบเทียบรหัสผ่านว่าตรงกันหรือไม่
        const isValid = await user.comparePassword(password);
        if (!isValid) {
            const error = new Error('รหัสผ่านไม่ถูกต้อง');
            error.statusCode = 401;
            throw error;
        }e

        return res.status(200).json({
            message: 'เข้าระบบเรียบร้อย'
        });

    } catch (error) {
        next(error);
    }
}