/*
 * @Description: 
 * @Author: DuTim
 * @Date: 2019-10-13 12:13:15
 * @LastEditors: Dutim
 * @LastEditTime: 2019-10-13 20:24:52
 */
//login and register
const express = require('express')
const router = express.Router()

const passport = require("passport")
const Profile = require('../../models/Profile')
/**
 * @description: $route  get  /api/profiles/test
 * @ public
 * @return: json
 */
router.get('/test', (req, res) => {
    res.json({
        msg: "loginok"
    });
})

/**
 * @description: $route  post  /api/profile/add
 * @ private
 * @return: json
 */
router.post("/add", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const profileFields = {};


    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;
    new Profile(profileFields).save().then(profile => res.json(profile))

})
/**
 * @description: $route  get  /api/profile/
 * @ private 获取所有信息
 * @return: json
 */
router.get("/", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log(1);
    Profile.find().then(data => {
        if (!data) {
            return res.status(404).json("没有任何东西")
        }
        res.json(data)

    }).catch(err => console.log('请求失败'))
})


/**
 * @description: $route  get  /api/profile/:id
 * @ private 获取one信息
 * @return: json
 */
router.get("/:id", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log(1);
    Profile.findOne({
        _id: req.params.id
    }).then(data => {
        if (!data) {
            return res.status(404).json("没有任何东西")
        }
        res.json(data)

    }).catch(err => console.log('请求失败'))
})


/**
 * @description: $route  post  /api/profile/edit
 * @ private  编辑接口
 * @return: json
 */
router.post("/edit/:id", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const profileFields = {};

    console.log(1);
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;
    Profile.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: profileFields
        }, {
            new: true
        })
        .then(data => res.json(data))

})

/**
 * @description: $route  delete  /api/profile/delete/:id
 * @ private remove
 * @return: json ok
 */
router.delete("/delete/:id", passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    console.log(1);
    await Profile.findOneAndDelete({
            _id: req.params.id
        })
        .then(  async data => {
            await data.save()
            .then(profile => res.json(profile))
            .catch(err => res.json({
                    message: "delete err"
                }))
        })
        .catch(err => console.log(err))
})


module.exports = router