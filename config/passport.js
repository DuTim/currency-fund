/*
 * @Description: 
 * @Author: DuTim
 * @Date: 2019-10-13 15:07:55
 * @LastEditors: Dutim
 * @LastEditTime: 2019-10-13 15:07:55
 */
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/database");

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // console.log(jwt_payload);
    User.findById(jwt_payload.id)
        .then(user => {
          if(user){
            return done(null,user);
          }

          return done(null,false);
        })
        .catch(err => console.log(err));
  }));
}