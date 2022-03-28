const connect = require("./config/db")
const express= require("express")
const {register,login}=require('./controller/auth')
const Todocontroller=require("./controller/todocont")
const app = express()
app.use(express.json())
app.post("/register",register)
app.post("/login",login)
app.use("/todo",Todocontroller)

app.listen(5000,async()=>{
    await connect()
    console.log("listenning to 5000")
})