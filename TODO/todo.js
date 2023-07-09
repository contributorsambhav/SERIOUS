
let todo = document.getElementById("todo")

let point = prompt("Enter the point")

todo.innerHTML = todo.innerHTML +` <li type="disc"> ${point} </li>`


    setInterval(() => {
        let point = prompt("Enter the point")
        todo.innerHTML = todo.innerHTML +` <li type="disc"> ${point} </li>`
       
    },5000)
    
