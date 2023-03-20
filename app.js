const express = require("express")
const app=express()
const mongoose = require("mongoose")
const PORT = 5012
const {MONGOURI} = require('./keys')
const user = require("./models/user")
const post = require("./models/post")

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeah")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

app.use(express.json())

// require('./middleware/requireLogin')
require('./models/user')
require('./models/post')


app.use(require('./routes/auth'))
app.use(require('./routes/post'))



app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})