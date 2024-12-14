let xp = 0;
let health = 100;
let gold = 70;
let currentWeapon = 0;
let fighting;
let inventory = ["stick"];


const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const enemyStats = document.querySelector("#enemyStats");
const enemyNameText = document.querySelector("#enemyName");
const enemyHealthText = document.querySelector("#enemyHealth");

const weapons = [
    {
        name: " stick ",
        power: 5
    },
    {
        name: " crowbar ",
        power: 20
    },
    {
        name: " dagger ",
        power: 30
    },
    {
        name: " katana ",
        power: 50
    },
    {
        name: " chainsaw ",
        power: 100
    }
];

const enemies = [
    {
        name: "homoerectus",
        level: 5,
        health: 50
    },
    {
        name: "dragon", 
        level: 20,
        health: 200
    }
];



const locations=[
    {
        name: "town square",
        "button text" : ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"store\"."
    },
    {
        name: "store",
        "button text" : ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown], 
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text" : ["Fight homoerectus", "Hide and make noises", "Go to town square"],
        "button functions": [fightHomo, hide, goTown ],
        text: "You enter the cave and see homoerectus."
    }, 
    {
        name: "fight",
        "button text" : ["Attack", "Dodge", "Run"],
        "button functions" : [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill enemy",
        "button text" : ["Go to Town Square", "Go to Town Square", "Go to Town Square"],
        "button functions" : [goTown, goTown, goTown],
        text: "You killed the ennemy mercilessly. You gain experience and find gold."
    },
    {
        name: "lose",
        "button text" : ["Play again?", "Play again?", "Play again?"],
        "button functions" : [restart, restart, restart],
        text: "You die. 💀"
    },
    {
        name: "win",
        "button text" : ["Replay", "Replay", "Replay"],
        "button functions" : [restart, restart, restart],
        text: "You defeated the dragon! You win!!!"
    }
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    enemyStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;  //or location["text"]
}

function goTown() {
    update(locations[0]);

}

function goStore() {
   update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if (gold<10)
    {
        text.innerText = "You do not have enough gold to buy Health";
    }
    else {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length-1)
    {
        if (gold>=30) {
            gold-=30;
            currentWeapon++;
            goldText.innerText=gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += "In inventory you have: " + inventory;
        }
        else 
        {
            text.innerText = "You do not have enough gold to buy a weapon.";
        }
    }
    else{
        text.innerText= "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button3.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold+=15;
        goldText.innerText = gold; 
        let currweapon = inventory.shift();
        text.innerText = "You sold a " + currweapon + ".";
        text.innerText = "In inventory, you have : " + inventory;
    }
    else {
        text.innerText = "Uh oh, I can't let you sell your only weapon...";
    }
}

function hide() {
    text.innerText = "You are now hiding."
    button1.innerText = "Make seagull noises."
    button1.onclick = seagullNoise;
    button2.innerText = "Sing abc song."
    button2.onclick = singABC;
}

function seagullNoise() {
    text.innerText = "Bravo! you tricked homoerectus into going out of the cave and hence won.";
    button1.innerText = null;
    button1.onclick = null;
    button2.innerText = null;
    button2.onclick = null;

}

function singABC() {
    text.innerText = "Uh oh, Homoerectus found you and held you captive. You lost."
    button1.innerText = null;
    button1.onclick = null;
    button2.innerText = null;
    button2.onclick = null;
}

function fightDragon() {
    fighting = 1;
    goFight();
}

function fightHomo() {
    fighting = 0;
    goFight();

}

function goFight() {
    update(locations[3]);
    enemyHealth = enemies[fighting].health;
    enemyStats.style.display = "block";
    enemyNameText.innerText = enemies[fighting].name;
    enemyHealthText.innerText = enemyHealth;
}

function attack() {
    text.innerText = "The " + enemies[fighting].name + " attacks.";
    text.innerText += " You attack it with your " +weapons[currentWeapon].name + ".";
    health -= enemies[fighting].level;
    enemyHealth -= weapons[currentWeapon].power + Math.floor(Math.random()*xp)+1; 
    healthText.innerText = health;
    enemyHealthText.innerText = enemyHealth;
    if (health <= 0)
    {
        lose();
    }
    else if (enemyHealth<=0) {
        fighting === 2 ? winGame() : defeatEnemy();
    }
}

function dodge() {
    text.innerText = "You dodged the attack from " + enemies[fighting].name + ".";
}

function defeatEnemy() {
    gold += Math.floor(enemies[fighting].level * 6.7);
    xp += enemies[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update (locations[4]);
}

function lose() {
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 100;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

