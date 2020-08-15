const Staff = require('../models/staff');
const staff = require('../models/staff');


exports.index = async (req, res, next) => {
    // const staff = await Staff.find().select('-sarary').sort('-_id');
    const staff = await Staff.find().where('salary').gte(20000).sort('-_id');
    return res.status(200).json({
        data: staff
    })
}

exports.show = async (req, res, next) => {
    try {
        const { id } = req.params;
        const staff = await Staff.findById(id);

        if (!staff) {
            let error = new Error('ไม่พบข้อมูลพนักงาน');
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({
            data: staff
        });

    } catch (error) {
        next(error)
    }
}

exports.search = async (req, res, next) => {
    const { name } = req.query;
    const staff = await Staff.find({ name: { $regex: '.*' + name + '.*', $options: 'i' } })

    return res.status(200).json({
        data: staff
    });
}

exports.insert = async (req, res, next) => {
    const { name, salary } = req.body;

    const staff = new Staff({
        name: name,
        salary: salary
    })

    const dataUpdate = await staff.save();

    return res.status(201).json({
        message: 'เพิ่มข้อมูลเรียบร้อย',
        data: dataUpdate
    });
}

exports.update = async (req, res, next) => {
    const { id } = req.params;
    const { name, salary } = req.body;

    const staff = await Staff.updateOne({ _id: id }, {
        name: name,
        salary: salary
    });

    return res.status(200).json({
        staff: staff,
        message: "แก้ไข้อมูลเรียบร้อย"
    });
}

exports.delete = async (req, res, next) => {

    const { id } = req.params;

    const staff = await Staff.deleteOne({ _id: id });

    return res.status(200).json({
        staff: staff,
        data: 'ลบข้อมูลเรียบร้อยแล้ว'
    });
} 