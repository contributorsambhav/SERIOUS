
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


    
    
    
    