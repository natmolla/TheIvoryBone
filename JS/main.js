
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


//LOGIN STUFF MENU OPTIONS

let logoutInput = document.getElementById('logout');
let viewLogin = document.getElementById('login');
let viewProfile = document.getElementById('profile');
let loginStatus = getCookie('playerName');

let logoutElement = document.getElementById('logout');
console.log(loginStatus);
let cookieName = getCookie('playerName');
let cookieDomain = getCookie('')

logoutInput.addEventListener('click', logout);

checkLogin();
checkLogout();

//CHECK IF LOGGED OUT





//CHECK IF LOGGED IN

function checkLogin() {
    if (loginStatus !== undefined ){
        viewLogin.classList.add('hideOption');
        
    } else if (loginStatus === undefined ) {
        viewProfile.classList.add('hideOption');
        logoutElement.classList.add('hideOption');
    }
}

//LOG OUT

function logout(){
    result = eraseCookie( 'playerName' );
    console.log(result);
    checkLogin();
}


async function tryLoggingIn() {
 let username = usernameInput.value;
 let password = passwordInput.value;

 let response = await fetch("http://20.172.39.34:9000/monstermanual/player/"+ username +"/"+password);
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



//COOKIE HELPER

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

