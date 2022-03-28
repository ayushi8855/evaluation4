const express = require("express")
const Todo = require("../model/todomodel")
const authenticate =require("../middleware/authenticate")
const router= express.Router()
router.post("/",authenticate,async(req,res)=>{
    try {
    const todo =await Todo.create({
        title:req.body.title
    })
    return res.status(201).send(todo)
    } catch (error) {
        return res.send(201).send(error.message)
    }
})

router.get("/",async(req,res)=>{
    try {
    const todo =await Todo.find().lean().exec()       
   
    return res.status(201).send(todo)
    } catch (error) {
        return res.send(201).send(error.message)
    }
})

router.get("/:id",authenticate,async(req,res)=>{
    try {
    const todo =await Todo.findById(req.params.id).lean().exec()       
   
    return res.status(201).send(todo)
    } catch (error) {
        return res.send(201).send(error.message)
    }
})

router.patch("/:id",authenticate,async(req,res)=>{
    try {
    const todo =await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()       
   
    return res.status(201).send(todo)
    } catch (error) {
        return res.send(201).send(error.message)
    }
})

router.delete("/:id",authenticate,async(req,res)=>{
    try {
    const todo =await Todo.findByIdAndDelete(req.params.id).lean().exec()       
   
    return res.status(201).send(todo)
    } catch (error) {
        return res.send(201).send(error.message)
    }
})
module.exports= router