//Game States
// "WIN" - Plyer robot has defeated all enemy robots
//      * Fight all enemy robots
//      * Defeat each enmeny robot
// "LOSE" - Player robot's health is zero or less

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min +1) + min);
    return value;
}

//function expression (not declaration) creates a function by assigning it to a variable
var fight = function(enemy) {
    console.log(enemy);

    // repeat and execute as long as the enemy-robot is alive 
    while(enemy.health > 0 && playerInfo.health > 0) {

        //Ask to fight or skip battle
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

            // if player choses to skip
            if (promptFight === "skip" || promptFight === "SKIP") {
                //confirm quitting
                var confirmSkip = window.confirm("Are you sure you want to quit?");
                
                // if yes (true)
                if (confirmSkip) {
                    window.alert(playerInfo.name + " has chosen to skip the fight. Goodbye");
                    playerInfo.money = Math.max(0, playerInfo.money - 2);
                    break;
                }
            }

        // if player choses to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT") {

            // remove enemy's health
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.health = Math.max(0, enemy.health - damage);

            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                // award player money for winning
                playerInfo.money = playerInfo.money + 20;

                // leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }

            // remove player's health
            var damage = randomNumber(enemy.attack - 3, enemy.attack)

            playerInfo.health = Math.max(0, playerInfo.health - damage);

            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        } 
    }
}

//start game
var startGame = function () {
    // reset player stats
    playerInfo.reset();
    
    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round "  + ( i + 1 ));

            var pickedEnemyObj = enemyInfo[i];

            pickedEnemyObj.health = randomNumber(40, 60);

            // call fight function with enemy
            fight(pickedEnemyObj);

            // if not at the last enemy in array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask player to shop before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                // if yes, go to store
                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            window.alert("You have lost your robot battle! GAME OVER!");
        }
    }
    
    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
}

//end entire game
var endGame = function() {
    //if player is still alive, player wins
    if (playerInfo.health > 0) {
        window.alert("Great job, you survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    //ask player to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

// shop between battles
var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

    //use to carryout action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "Refill":
        case "refill":
            playerInfo.refillHealth();
            break;

        case "UPGRADE":
        case "Upgrade":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;

        case "LEAVE":
        case "Leave":
        case "leave":
            window.alert("Leaving the store.");
            break;

        default:
            window.alert("You did not pick a valid option. Please try again.");

            //call shop() again
            shop();
            break;
    }
}

// player info
var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
          window.alert("Refilling player's health by 20 for 7 dollars.");
          this.health += 20;
          this.money -= 7;
        } 
        else {
          window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
          window.alert("Upgrading player's attack by 6 for 7 dollars.");
          this.attack += 6;
          this.money -= 7;
        } 
        else {
          window.alert("You don't have enough money!");
        }
    }
}

//You can log multiple values at once: 
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyInfo = [
    {
      name: "Roborto",
      attack: randomNumber(10,14)
    },
    {
      name: "Amy Android",
      attack: randomNumber(10,14)
    },
    {
      name: "Robo Trumble",
      attack: randomNumber(10,14)
    }
];

// start game when page loads
startGame();