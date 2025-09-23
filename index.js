const path = require("path")
const fs = require("fs")
const express = require("express")
const Sheet = require("./excel-to-json")

const app = express()

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html"))
    // Sheet()
})

app.listen(3003,()=>console.log("listening to port: 3000 "))
