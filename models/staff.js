const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, trim: true, required: true },
    salary: { type: Number },
    created_at: { type: Date, default: Date.now }
  },{
      collection: 'staffs'
  });
  

  const staff = mongoose.model('Staff', schema);

module.exports = staff;