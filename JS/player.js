const menu = document.querySelector('.menu');
const close = document.querySelector('.close');
const nav = document.querySelector('nav');

menu.addEventListener('click', () => {
    nav.classList.add('open-nav')
})

close.addEventListener('click', () => {
    nav.classList.remove('open-nav')
})



let nameField = document.getElementById('nameField');
let playerName = getCookie('playerName');

let classField = document.getElementById('classField');
let playerClass = getCookie('playerClass')

let armorClassField = document.getElementById('armorClassField');
let armorClass = getCookie('armorClass');

let killsField = document.getElementById('killsField');
let goldField = document.getElementById('goldField');



selectPlayer();
getKills();


console.log()
goldField.innereHTML = "50";



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



async function selectPlayer() {
    let name = playerName;
    let response = await fetch("http://20.172.39.34:9000/monstermanual/player/"+name);
    response = await response.json();
    loadPlayer(response);
    
    
}

async function loadPlayer(response) {
   
    nameField.innerHTML = "";
    nameField.innerHTML = response.name;

    classField.innerHTML = "";
    classField.innerHTML = response.playerClass;

    armorClassField.innerHTML = "";
    armorClassField.innerHTML = response.armorClass;
    
        
   

}




async function getKills(){
    let name = playerName;
    let response = await fetch("http://20.172.39.34:9000/monstermanual/leaderboard/"+name);
    response = await response.json();
    killsField.innerHTML= response;
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
