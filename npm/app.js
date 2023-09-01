const express = require("express")
const app = express();
const port = 80;
const path = require('path')
const fs = require('fs')



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
    let objgender = req.body.gender
    let objmore = req.body.more
    let writeOutput = `The name of client is ${objname} \n Age is  ${objage}\n Gender is ${objgender} \n Some more info is that  \" ${objmore} \" \n \n `

    fs.appendFileSync('output.txt',writeOutput)

    const parameters ={"message": "Info submitted succesfully"}
    res.status(200).render("index.pug",parameters)

}))
// Note : parameters is an object that assigns title as given string and content is read from the avriablr con


//starting the server
app.listen(port,(()=>{
    console.log("The application started succesfully on port "+port)
}))

