const express = require("express")
const app = express();
const port = 8000;
const path = require('path')
const fs = require('fs')



// for serving static files
app.use("/static",express.static("static"))

app.use(express.urlencoded())


// set the template engine as pug
app.set('view engine','pug')

//setting the views dir
app.set('views',path.join(__dirname,'views'))


app.get("/",((req,res)=>{
    res.status(200).render("index.pug")
}))

app.get("/form",(req,res)=>{
    res.status(200).render("form.pug")
})

app.get("/contact",(req,res)=>{
    res.status(200).render("contact.pug")
})

app.get("/gallery",(req,res)=>{
    res.status(200).render("gallery.pug")
})

app.get("/services",((req,res)=>{
    res.render("services.pug")
}))

app.listen(port,(()=>{
    console.log("The application started succesfully on port "+port)
}))