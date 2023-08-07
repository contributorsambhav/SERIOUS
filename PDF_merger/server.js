const express = require('express')
const app = express()
const port = 80

app.get("/",((req,res)=>{
  res.status(200).render("../templates/index.pug")
  console.log(req.body.input1,req.body.input2)
}))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})