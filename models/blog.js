const {IMAGE_PATH} = require('../config')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new Schema({
  topic: { type: String, trim: true, required: true },
  photo: { type: String, default: 'nopic.png' },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
},{
    toJSON:{ virtuals : true},
    collection: 'blogs',
    timestamps: true
});

schema.virtual('image').get(function(){
  return IMAGE_PATH + this.photo; 
});

schema.plugin(mongoosePaginate);

const blog = mongoose.model('Blog', schema);

module.exports = blog;

