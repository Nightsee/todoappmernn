require('dotenv').config();
const mongoose = require('mongoose')
const User = require('./models/schema')
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')



const app = express()

app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(console.log("conected"))

// it finaly worked when you start the  06/09 don't miss with it please leave it as it is if possible 

app.post('/register',  (req, res) => {
    const {username , password} = req.body

    bcrypt.hash(password, 10).then(hash => {
        const newobj = {
            username: username,
            password: hash,
            tasks: []
        }
        try{
            const user =  User.create(newobj)
            res.status(200).json('finally my friend its working')
        }catch (error){
            res.status(400).json({error: error.message})
        }
    })

})

app.post('/login' , (req, res) => {
    const {username , password} = req.body
    User.findOne({username: username}, (error, foundUser) => {
        bcrypt.compare(password, foundUser.password).then(isok =>{
            if(!isok) return res.json({message: "wrong password ! "})
            let userid = {id: foundUser._id}
            const token = jwt.sign(userid, 'RANDOM_TOKEN_SECRET')
            
            // res.cookie("token", token, { httpOnly: true })
            let result = {isuser: true, userid: foundUser._id, token: token}
            return res.status(200).json(result)
        })   
    })      
})

app.get('/api/:id', (req, res)=>{
    const id = req.params.id
    User.findOne({_id: id}, (err, foundUser)=>{
        if(err) return res.json(err)
        let tasklist = foundUser.tasks
        res.json(tasklist)
    })
})

app.get('/api/delete/:userid/:taskid', (req, res)=>{
    let taskId = req.params.taskid
    let userid = req.params.userid
    let temptaskslist = []
    User.findOne({_id: userid}, (err, foundUser)=>{
        if(err) console.log(err)
        foundUser.tasks.map(item => {
            if(item._id == taskId){
                
            }else {
                temptaskslist.push(item)
            }
        })
        foundUser.tasks = temptaskslist
        foundUser.save()
    })
})

app.post('/api/edit/:userid/:taskid', (req, res)=>{
    let taskId = req.params.taskid
    let userid = req.params.userid
    let temptaskslist = []
    let theuptodatedtask = {}
    const {taskname, description} = req.body.newtask

    User.findOne({_id: userid}, (err, foundUser)=>{
        if(err) console.log(err)
        foundUser.tasks.map(item => {
            if(item._id == taskId){
                item = {
                    taskname: taskname,
                    description: description,
                }
                theuptodatedtask = item   
                temptaskslist.push(item)
            }else {
                temptaskslist.push(item)
            }
        })
        foundUser.tasks = temptaskslist
        foundUser.save()

        res.json({refetch: true})
    })
})

app.post('/api/create', (req, res)=>{
    const {taskname, description} = req.body.newtask
    const newtask = {taskname, description, priority: "not specified"}
    const token = req.body.token
        jwt.verify(token, 'RANDOM_TOKEN_SECRET', (err, decoded)=>{
            if(err) return 
            
            User.findOne({_id : decoded.id}, (err, foundUser)=>{
                if(err) return console.log(err)
                foundUser.tasks.push(newtask)
                foundUser.save()
            })
        })
    res.json({refetch: true})
})

app.post('/verify', (req, res) => {
    
    let token = req.body.token
    if(typeof token == 'undefined'){
        res.json({islogedin: false})
    }else{
        jwt.verify(token, 'RANDOM_TOKEN_SECRET', (err, decoded)=>{
            if(err) return res.send(err) 
                
                res.json({islogedin: true, userid : decoded.id})
            })
        }
    }) 




app.listen(process.env.PORT, ()=>{
    console.log('listening to port: ' + process.env.PORT )
})