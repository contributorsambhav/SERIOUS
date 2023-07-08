const prompt = require('prompt-sync')({ sigint: true })

chances = 15

console.log(`you have ${chances} chances`)

let a = parseInt(Math.random() * 101);
// console.log(a);


for (i = chances; i > 0; i--) {

  b = prompt("enter your guess : ")
  if (a == b) {
    console.log("You guessed it right")
    break;
  }
  else {
    chances -= 1
    console.log(`you have ${chances} chances left`)
    if (a > b) {
      console.log("enter a bigger number")
    }
    else {
      console.log("enter a smaller number")

    }
  }
}
let scr = 16 - chances
console.log(`great your score is ` + scr)
let n = prompt("Enter your name: ")
const fs = require("fs")

fs.appendFile('hiscore.txt', `${n} scored ${scr} on `+new Date()+"\n  \n", function (err) {
  if (err) throw err;
  console.log('Your Score is Saved!');
});


