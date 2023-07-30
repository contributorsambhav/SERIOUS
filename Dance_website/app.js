const express = require("express")
const app = express();
const port = 80;
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/contactdetails');
}

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));

db.once("open", function () {
  console.log("Connected to database");
});


const contactschema = new mongoose.Schema({
    name: String,
    age: String ,
    gender : String,
    phone:String ,
    email :String,
    address: String,
    moredetails :String 


});

const contact = mongoose.model('contact', contactschema);

// for serving static files
app.use("/static",express.static("static"))

app.use(express.urlencoded())

// set the template engine as pug
app.set('view engine','pug')

//setting the views dir
app.set('views',path.join(__dirname,'views'))

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

    res.status(200).render("index.pug")


    //creating document using predeclared schema
    const objcontact = new contact({

        name: objname,
        gender : objgender,
        age: objage ,
        phone:objphone ,
        email :objemail,
        address: objaddress,
        moredetails :objmore 


    });
    //saving the document
    objcontact.save()

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


//starting the server
app.listen(port,(()=>{
    console.log("The application started succesfully on port "+port+" http://localhost/")
}))

