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


app.post("/form",((req,res)=>{

    let passengerName = req.body.from_station
    let passengerAge = req.body.passenger_age
    let passengerGender = req.body.passenger_gender
    let passengerToStation = req.body.to_station
    let passengerFromStation = req.body.from_station
    let passengerDateOfJourney  = req.body.date_of_journey

    let writeOutput = `The name of client is ${passengerName} \n Age is  ${passengerAge}\n Gender is ${passengerGender} \n from station ${passengerFromStation}  \n to station ${passengerToStation} \n date of journey ${passengerDateOfJourney} \n \n \n `
    
    fs.appendFileSync('output.txt',writeOutput)
    res.status(200).render("form.pug")
    
}))



app.listen(port,(()=>{
    console.log("The application started succesfully on port "+port)
}))