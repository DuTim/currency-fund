/*
 * @Description: 
 * @Author: DuTim
 * @Date: 2019-10-13 12:33:15
 * @LastEditors: Dutim
 * @LastEditTime: 2019-10-13 19:36:04
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    type: {
        type: String
    },
    describe: {
        type: String
    },
    income: {
        type: String,
        required: true
    },
    expend: {
        type: String,
        required: true
    },
    cash: {
        type: String,
        required: true
    },
    remark: {
        type: String,
      
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = User = mongoose.model('profile', ProfileSchema);