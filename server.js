/*
 * @Description: 
 * @Author: DuTim
 * @Date: 2019-10-13 11:49:18
 * @LastEditors: Dutim
 * @LastEditTime: 2019-10-14 17:21:36
 */
const express= require('express')
const bodyParser=require("body-parser")
const passport =require('passport')
//db
const db=require('./config/database')
const mongoose=require("mongoose")

const app=express()

const router=require('./routes/api/users')
const profiles=require("./routes/api/profiles")
//use bodyParser midware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//import mod
mongoose.connect(db.mongoURI,{ useNewUrlParser: true ,useUnifiedTopology: true})
.then(()=>{
    console.log("connect ok")
}).catch(err=>console.log(err))

//初始化 passport 验证 token
app.use(passport.initialize());
require("./config/passport")(passport)//传递归去

// router

// use router
app.use('/api/users',router)
app.use('/api/profiles',profiles)


const port=5000
app.get('/',(req,res)=>{
    res.send("hello nodejs")
})


app.listen(port,()=>{
    console.log(`http://127.0.0.1:${port}`);
    
})