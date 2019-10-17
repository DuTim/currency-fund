/*
 * @Description: 
 * @Author: DuTim
 * @Date: 2019-10-13 12:33:15
 * @LastEditors: Dutim
 * @LastEditTime: 2019-10-13 12:33:15
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  identity: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);
