const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: { type: String, trim: true, required: true },
  score: { type: Number },
  blog: { type: Schema.Types.ObjectId, ref: 'Blog' }
},{
    timestamps: true,
    collection: 'comments'
});

const comment = mongoose.model('Comment', schema);

module.exports = comment;