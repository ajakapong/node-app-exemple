module.exports = (err,req,res,next) =>{

    const statusCode = err.statusCode || 500;
    const message = err.message || 'เกิดข้อผิดพลาดในระบบ'

    return res.status(statusCode).json({
        error:{
            status_code: statusCode,
            message : message,
            validation: err.validation
        }
    })
}