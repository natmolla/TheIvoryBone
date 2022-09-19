
const menu = document.querySelector('.menu');
const close = document.querySelector('.close');
const nav = document.querySelector('nav');

menu.addEventListener('click', () => {
    nav.classList.add('open-nav')
})

close.addEventListener('click', () => {
    nav.classList.remove('open-nav')
})


console.log(document)

let removeButton = document.getElementById('removeMonster')
let loadButton = document.getElementById('loadButton');
let addButton = document.getElementById('addMonster');
let selectButton = document.getElementById('selectMonster');

let monsterContent = document.getElementById('monsterContainer');
let content = document.getElementById('container');
let nameInput = document.getElementById('nameInput');
let typeInput = document.getElementById('typeInput');
let acInput = document.getElementById('acInput');
let sizeInput = document.getElementById('sizeInput');
let descInput = document.getElementById('descInput');
let removeInput = document.getElementById('removeInput');
let selectInput = document.getElementById('selectInput');



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



function loadSpan(response){
    content.innerHTML = "";  //refreshes the container information
    for(let i=0; i < response.length; i++){ //goes through the array
        let monsterName = document.createElement("p");
        monsterName.innerText = response[i];
        content.appendChild(monsterName);
    }
}

async function loadAllMonsters(){
    let response = await fetch("http://20.172.39.34:9000/monstermanual/monsters");
    response = await response.json();
    loadSpan(response);
}



function addMonster() {
    let request = new XMLHttpRequest();
    request.open("POST", "http://20.172.39.34:9000/monstermanual/monsters");
    request.setRequestHeader('Content-type', 'application/json; charset=UTF=8');
    let monsterObj = {name:nameInput.value, type:typeInput.value, size:sizeInput.value, description:descInput.value, armorClass:acInput.value };
    request.send(JSON.stringify(monsterObj));
}

function removeMonster() {
    let name = removeInput.value;
    let request = new XMLHttpRequest();
    request.open("DELETE", "http://20.172.39.34:9000/monstermanual/monster/"+name);
    request.setRequestHeader('Content-type', 'application/json; charset=UTF=8');
    request.send();
    console.log(JSON.stringify(removeInput));
}

async function selectMonster() {
    let name = selectInput.value;
    let response = await fetch("http://20.172.39.34:9000/monstermanual/monster/"+name);
    response = await response.json();
    loadMonster(response);
    
    
}

async function loadMonster(response) {
    console.log(response);
    monsterContent.innerHTML = "";
        
        let monsterName = document.createElement("p");
        monsterName = document.createElement("a");
    monsterName.href = "monsteredit.html"+"#monster="+response.name;
    monsterName.innerText = "Name: "+ response.name;
    let monsterArmorClass = document.createElement("p");
    let monsterSize = document.createElement("p");
    let monsterType = document.createElement("p");
    let monsterDescription = document.createElement("p");
    monsterType.innerText = "Type: " + response.type;
    monsterSize.innerText = "Size: " +response.size;
    monsterDescription.innerText = "Description: " + response.description;
    monsterArmorClass.innerText = "Armor Class: " +response.armorClass;
    

    monsterContent.appendChild(monsterName);
    monsterContent.appendChild(monsterType);
    monsterContent.appendChild(monsterSize);
    monsterContent.appendChild(monsterDescription);
    monsterContent.appendChild(monsterArmorClass);
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