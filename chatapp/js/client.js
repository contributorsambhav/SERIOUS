const socket = io("http://localhost:8000")

const form = document.getElementById("sendcontainer")
const messageInp = document.getElementById("messageInp")
const messageContainer = document.querySelector(".container")

const name = prompt("Enter your name to join: ")
socket.emit("new-user-joined",name)