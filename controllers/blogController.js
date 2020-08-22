const { IMAGE_PATH } = require('../config')
const Blog = require('../models/blog');
const uploadImageTodisk = require('../services/upload');

// exports.index = async (req, res, next) => {
//     const blog = await Blog.find()
//         .populate("user", "name email")
//         .sort({ _id: -1 })

//     const blogs = blog.map((value, item) => {
//         return {
//             id : value._id,
//             topic : value.topic,
//             image : IMAGE_PATH + value.photo,
//             author : value.user,
//             created_at: value.createdAt
//         }
//     })

//     return res.status(200).json({
//         data: blogs
//     });
// }

exports.index = async (req, res, next) => {

    const { page, pageSize } = req.query;
    const myPage =  page ? parseInt(page) : 1;
    const myPageSize = pageSize ? parseInt(pageSize) : 3;

    const options = {
        selete: 'topic phone createdAt',
        sort: { _id : -1},
        // populate : 'user',
        populate :[{
            path: "user",
            select: "name email"
        }],
        customLabels: {docs: 'blogs',totalDocs: 'totle'},
        page : myPage,
        limit : myPageSize
    };
    const result = await Blog.paginate({},options);

    return res.status(200).json({
        data: result
    });
}

exports.insert = async (req, res, next) => {
    const { topic, photo } = req.body;

    const blog = new Blog({
        topic: topic,
        user: req.user._id,
        photo: await uploadImageTodisk(photo)
    });

    const newBlog = await blog.save();

    return res.status(201).json({
        message: 'เพิ่มข้อมูลเรียบร้อยแล้ว',
        data: newBlog
    });
}