const express = require("express")
const app = express();
const port = 80;
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose');
const bodyparser = require("body-parser")

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/contactdetails');
    console.log("Connected to database")

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const contactschema = new mongoose.Schema({
    name: String

});

const contact = mongoose.model('contact', contactschema);



// for serving static files
app.use("/static",express.static("static"))

app.use(express.urlencoded())


// set the template engine as pug
app.set('view engine','pug')

//setting the views dir
app.set('views',path.join(__dirname,'views'))

//our pug demo endpoint

// app.get("/demo",((req,res)=>{
//     res.status(200).render('demo',{title: " This is pug endpoint ka title",message : "This is pug's demo endpoint"})
// }))

// //GET POST endpoints
// app.get("/",((req,res)=>{
//     res.send("This is home page of my first Express app get request")
// }))


// app.post("/",((req,res)=>{
//     res.send("This is about page of my first Express app post request")
// }))

// app.get("/about",((req,res)=>{
//     res.send("This is about page of my first Express app")
// }))

//This is to declare variables to be used inplain html present in pug file


app.get("/",((req,res)=>{
    const con = "This is text content saved as variable"
    const parameters ={"title": "This is title as object","content":con}
    res.status(200).render("index.pug",parameters)
}))

app.post("/",((req,res)=>{

    //Storing details recieved by post request in javascript variables

    let objname = req.body.name
    let objage = req.body.age
    let objphone = req.body.phone
    let objemail = req.body.email
    let objaddress=req.body.address
    let objgender = req.body.gender
    let objmore = req.body.more
    let writeOutput = `The name of client is ${objname} \n Age is  ${objage}\n Gender is ${objgender} \n Some more info is that  \" ${objmore} \" \n Some contact details are \n Phone no. : ${objphone} \n Email : ${objemail} \n Address : ${objaddress} \n \n`

    fs.appendFileSync('Registrations.txt',writeOutput)

    const parameters ={"message": "Info submitted succesfully"}
    res.status(200).render("index.pug",parameters)

}))


app.get("/about",((req,res)=>{

       res.status(200).render("about.pug")

}))

app.get("/contact",((req,res)=>{

    res.status(200).render("contact.pug")

}))

app.get("/form",((req,res)=>{

    res.status(200).render("form.pug")

}))

// Note : parameters is an object that assigns title as given string and content is read from the avriablr con


//starting the server
app.listen(port,(()=>{
    console.log("The application started succesfully on port "+port)
}))

