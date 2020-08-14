const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String
}, {
    collation: 'users'
});

const user = mongoose.model('User',userSchema);

module.exports = user;