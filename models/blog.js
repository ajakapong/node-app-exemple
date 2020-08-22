const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  topic: { type: String, trim: true, required: true },
  photo: { type: String, default: 'nopic.png' },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
},{
    collection: 'blogs',
    timestamps: true
});

const blog = mongoose.model('Blog', schema);

module.exports = blog;

