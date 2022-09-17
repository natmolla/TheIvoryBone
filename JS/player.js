
let nameField = document.getElementById('nameField');
let playerName = getCookie('playerName');

let classField = document.getElementById('classField');
let playerClass = getCookie('playerClass')

let armorClassField = document.getElementById('armorClassField');
let armorClass = getCookie('armorClass');

let killsField = document.getElementById('killsField');



selectPlayer();
getKills();


console.log()




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
