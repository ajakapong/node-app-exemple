
exports.index = (req, res, next) => {
    res.send('respond with a resource');
}

exports.show = (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    return res.status(200).json({
        data: id
    });
}

exports.search = (req, res, next) => {
    const { name, age } = req.query;
    return res.status(200).json({
        data: { name, age }
    });
} 

exports.insert = (req, res, next) => {
    const { name, age } = req.body;
    return res.status(200).json({
        data: { name, age }
    });
}

exports.update = (req, res, next) => {
    const { id } = req.params;
    const { name, age } = req.body;
    return res.status(200).json({
        data: { id,name, age }
    });
} 

exports.delete = (req, res, next) => {
    const { id } = req.params;
    return res.status(200).json({
        data: { id }
    });
} 