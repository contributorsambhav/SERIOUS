const prompt = require('prompt-sync')({ sigint: true })

let m = "y";

var playerscore = 0;

var cscore = 0;

while (m === "y" || m === "Y") {                

    let a = parseInt(Math.random() * 3);
    let b;

    // console.log(a)

    if (a == 0) {
        b = "snake";
    } else if (a == 1) {
        b = "water";
    } else {
        b = "gun"

    }

    // console.log(b)

    let c = prompt("Choose either Snake (or S),Water (or W) or Gun (or G) : ")

    c = c.toLowerCase()

    if (c != "snake" && c != "s"
        && c != "water" && c != "w"
        && c != "gun" && c != "g") {
        console.error("Kya kar rha hai tu \n Sudhar jaa ****");
    }

    else {
        console.log("Computer chose", b);
        console.log("You chose", c);
        if ((b == "snake" && (c == "gun" || c == "g")) ||
            (b == "water" && (c == "snake" || c == "s")) ||
            (b == "gun" && (c == "water" || c == "w"))) {
            console.log("You won")
            playerscore += 1;
        } else if (b == c) {
            console.log("Game drawn");
        } else {
            console.log("You Lost")
            cscore += 1
                ;
        }
    }

    m = prompt("Enter y to play again any other key to terminate the game: ")
}

console.log(`Your score is ${playerscore - cscore}`)