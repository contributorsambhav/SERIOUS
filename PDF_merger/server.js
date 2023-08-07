const express = require('express')
const app = express()
const port = 80

app.get("/",((req,res)=>{
  res.status(200).render("../templates/index.pug")
}))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})