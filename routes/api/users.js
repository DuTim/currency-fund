/*
 * @Description: 
 * @Author: DuTim
 * @Date: 2019-10-13 12:13:15
 * @LastEditors: Dutim
 * @LastEditTime: 2019-10-15 17:59:40
 */
//login and register
const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const keys=require("../../config/database")
const passport=require("passport")
const User = require('../../models/User')
/**
 * @description: $route  get  /api/users/test
 * @ public
 * @return: json
 */
// router.get('/test', (req, res) => {
//     res.json({
//         msg: "loginok"
//     });
// })

/**
 * @description: $route  post  /api/users/register
 * @ public
 * @return: json
 */
router.post('/register', (req, res) => {
    //   console.log(req.body);
    //       res.json({ok:"ok"
    //     })
    User.findOne({
        email: req.body.email
    }).then((user) => {
        if (user) {
            return res.status(400).json({
                email: "email已经被注册"
            })
        } else {
            var avatar = gravatar.url('req.body.email', {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar,
                identity:req.body.identity
            })
            console.log(req.body);
            console.log(newUser);
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    // Store hash in your password DB.
                    if (err) console.log(123)
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                });
            });

        }
    })

})


/**
 * @description: $route  post  /api/users/register
 * @ public   
 * @return: JWT TOKEN   
 */
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    //find user 
    console.log(email, password)
    User.findOne({
            email
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    email: "密码错误"
                })
            }
            bcrypt.compare(password, user.password)
                .then(ok => {
                    if (ok) {
                        const rule={id:user.id,name:user.name,avatar:user.avatar,identity:user.identity}
                        jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                            if(err) throw err;
                            res.json({success:true,token:"Bearer "+token})
                        })
                       // jwt.sign("规则","加密名字","过期时间","callback")
                        // res.json({
                        //     massage: "suceess"
                        // })
                    } else {
                      res.json({
                            massage: "error"
                        })
                    }
                }, )
        })
})

/**
 * @description: $route  get  /api/users/current
 * @ private  return  current user
 * @return: 
 */
//router.get("/current","验证token",(req,res)=>{})
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{res.json({id:req.user.id,name:req.user.name,email:req.user.email,identity:req.user.identity})})
module.exports = router