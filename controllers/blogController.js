const Blog = require('../models/blog');

exports.index = async (req, res, next) => {

    return res.status(200).json({
        data: {}
    });
}

exports.insert = async (req, res, next) => {
    const { topic, photo } = req.body;

    const blog = new Blog({
        topic: topic,
        user: req.user._id
    });

    const newBlog = await blog.save();
    
    return res.status(201).json({
        message: 'เพิ่มข้อมูลเรียบร้อยแล้ว',
        data: newBlog
    });
}