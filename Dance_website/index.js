const mongoose = require("mongoose");


main().catch(err => console.log(err));

async function main() {

await mongoose.connect("mongodb://localhost/student", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
}


var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));

db.once("open", function  () {
  console.log("we are connected");
});

const kittySchema = new mongoose.Schema({
  name: String,
  
});

kittySchema.methods.speak = function speak() {
  console.log("My name is harrykitty");
};

const Kitten = mongoose.model("Kitten", kittySchema);

var harrykitty = new Kitten({name : 'harrykitty'})

console.log(harrykitty.name)

const fluffy = new Kitten({ name: 'fluffy' });

fluffy.save();
  console.log(fluffy.speak)

  harrykitty.save();