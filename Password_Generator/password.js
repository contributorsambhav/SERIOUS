
var button = document.getElementById("myButton");

function handleButtonClick() {

    function generatePassword(length) {
        
        const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
        
        let password = "";
        
        for (let i = 0; i < length; i++) {
            const randomIndex = (Math.random() * characters.length);
            password += characters.charAt(randomIndex);
        }
        
        return password;
    }
    
    const password = generatePassword(100);
    

    let passwd = document.getElementById("passwd")
    passwd.innerHTML = password

}


    
    
    
function copyHandler(){

    // Text to be copied to the clipboard
    const textToCopy = passwd.innerHTML;
    
    // Use the Clipboard API to write text to the clipboard
    navigator.clipboard.writeText(textToCopy)
    .then(function () {
        // Successful copy
        alert("Password copied to clipboard ");
      })
      .catch(function (err) {
          // Handle errors
          console.error("Unable to copy to clipboard: ", err);
        });
    };
