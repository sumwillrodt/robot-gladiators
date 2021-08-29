//Game States
// "WIN" - Plyer robot has defeated all enemy robots
//      * Fight all enemy robots
//      * Defeat each enmeny robot
// "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//You can log multiple values at once: 
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

//function expression (not declaration) creates a function by assigning it to a variable
var fight = function(enemyName) {
    // repeat and execute as long as the enemy-robot is alive 
    while(enemyHealth > 0) {
        //Alert players that round is starting
        // window.alert("Welcome to Robot Gladiators!");

        //Ask to fight or skip battle
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

            // if player choses to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT") {

            // remove enemy's health
            enemyHealth = enemyHealth - playerAttack;
            console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

            // check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }

            // remove player's health
            playerHealth = playerHealth - enemyAttack;
            console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

            // check player's health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
            } else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }
            
        // if player choses to skip
        } else if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm quitting
            var confirmSkip = window.confirm("Are you sure you want to quit?");
                if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight. Goodbye");
                playerMoney = playerMoney -2;
            } else {
                fight();
            }
        }
    }
}

// fight(); no longer need

var startGame = function () {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    
    for(var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round "  + ( i + 1 ));
            var pickedEnemyName = enemyNames[i];
            enemyHealth = 50;

            // call fight function with enemy
            fight(pickedEnemyName);

            // if not at the last enemy in array
            if (playerHealth > 0 && i < enemyNames.length -1) {
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
    if (playerHealth > 0) {
        window.alert("Great job, you survived the game! You now have a score of " + playerMoney + ".");
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

var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

    //use to carryout action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "Refill":
        case "refill":
           if (playerMoney >= 7) {
               window.alert("Refilling player's health by 20 for 7 dollars.");

                //increase health & decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
           } 
           else {
               window.alert("You don't have enough money!");
           }

            break;

        case "UPGRADE":
        case "Upgrade":
        case "upgrade":
            if (playerMoney >= 7){
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                //increase attack & decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }

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

// start game when page loads
startGame();