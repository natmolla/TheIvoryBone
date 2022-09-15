
const menu = document.querySelector('.menu');
const close = document.querySelector('.close');
const nav = document.querySelector('nav');

menu.addEventListener('click', () => {
    nav.classList.add('open-nav')
})

close.addEventListener('click', () => {
    nav.classList.remove('open-nav')
})


let loginbutton = document.getElementById('loggingin');
let usernameInput = document.getElementById('username');
let passwordInput = document.getElementById('password');
let wrongloginbox = document.getElementById('wronglogin');
let closebutton = document.getElementById('closewindow');

loginbutton.addEventListener("click", tryLoggingIn);
loginbutton.addEventListener("click", clearFields);


async function tryLoggingIn() {
 let username = usernameInput.value;
 let password = passwordInput.value;

 let response = await fetch("http://localhost:9000/monstermanual/player/"+ username +"/"+password);
 response = await response.json();
 console.log(response);

    if (response == true) {
        console.log(response);
        window.location = "playerprofile.html";
        document.cookie = "playerName=" + username;
    }

    else if(response == false) {
        wrongloginbox.innerHTML = "";
        wrongloginbox.innerHTML = "Wrong login credentials, try again."
    }

}

function clearFields() {
    wrongloginbox.innerHTML = "";
}