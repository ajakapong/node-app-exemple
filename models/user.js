const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true, index: true },
    password: { type: String, trim: true, required: true, minlength: 3 },
    role: { type: String, default: "member" },
}, {
    collation: 'users'
});

userSchema.methods.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}

userSchema.methods.comparePassword = async function (password) {
    const isValid = await bcrypt.compare(password,this.password);
    return isValid;
}

const user = mongoose.model('User', userSchema);

module.exports = user;