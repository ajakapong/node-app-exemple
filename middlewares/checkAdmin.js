

module.exports.isAdmin = (req, res, next) => {
    try {
        const { role } = req.user;

        if (role === 'admin') {
            next();
        }
        else {
            const error = new Error('เฉพาะผู้ดูแลระบบเท่านั้น')
            error.statusCode = 403;
            throw error;
        }

    } catch (error) {
        next(error);
    }
}