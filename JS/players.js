console.log(document)



const menu = document.querySelector('.menu');
const close = document.querySelector('.close');
const nav = document.querySelector('nav');

menu.addEventListener('click', () => {
    nav.classList.add('open-nav')
})

close.addEventListener('click', () => {
    nav.classList.remove('open-nav')
})



let removeButton = document.getElementById('removePlayer')
let loadButton = document.getElementById('loadButton');
let addButton = document.getElementById('addPlayer');
let selectButton = document.getElementById('selectPlayer');

let playerContent = document.getElementById('playerContainer');
let content = document.getElementById('container');
let playerMenu = document.getElementById('playerContainerMenu');

let nameInput = document.getElementById('nameInput');
let classInput = document.getElementById('classInput');
let acInput = document.getElementById('acInput');
let passInput = document.getElementById('passwordInput');
let removeInput = document.getElementById('removeInput');
let selectInput = document.getElementById('selectInput');

loadButton.addEventListener("click", loadAllPlayers);
removeButton.onclick = removePlayer;
addButton.onclick = addPlayer;

selectButton.addEventListener("click", selectPlayer);

function loadSpan(response){
    content.innerHTML = "";  //refreshes the container information
    for(let i=0; i < response.length; i++){ //goes through the array
        let playerName = document.createElement("p");
        playerName.innerText = response[i];
        content.appendChild(playerName);
    }
}

async function loadAllPlayers(){
    let response = await fetch("http://20.172.39.34:9000/monstermanual/players");
    response = await response.json();
    loadSpan(response);
}



function addPlayer() {
    let request = new XMLHttpRequest();
    request.open("POST", "http://20.172.39.34:9000/monstermanual/players");
    request.setRequestHeader('Content-type', 'application/json; charset=UTF=8');
    let playerObj = {name:nameInput.value, playerClass:classInput.value, armorClass:acInput.value, password:passInput.value};
    request.send(JSON.stringify(playerObj));
}

function removePlayer() {
    let name = removeInput.value;
    let request = new XMLHttpRequest();
    request.open("DELETE", "http://20.172.39.34:9000/monstermanual/player/"+name);
    request.setRequestHeader('Content-type', 'application/json; charset=UTF=8');
    request.send();
    console.log(JSON.stringify(removeInput));
}

async function selectPlayer() {
    let name = selectInput.value;
    let response = await fetch("http://20.172.39.34:9000/monstermanual/player/"+name);
    response = await response.json();
    loadPlayer(response);
    
    
}

async function loadPlayer(response) {
    console.log(response);
    playerContent.innerHTML = "";
        
        let playerName = document.createElement("p");
        playerName = document.createElement("a");
    playerName.href = "playeredit.html"+"#player="+response.name;
    playerName.innerText = "Name: " + response.name;
    let playerArmorClass = document.createElement("p");
    let playerClass = document.createElement("p");
    playerArmorClass.innerText = "Armor Class: " +response.armorClass;
    playerClass.innerText = "Player Class: " + response.playerClass;

    playerContent.appendChild(playerName);
    playerContent.appendChild(playerClass);
    playerContent.appendChild(playerArmorClass);

}