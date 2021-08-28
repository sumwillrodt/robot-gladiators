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
// for (initial expression; condition) {
//    statement
// }
for(var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    // call fight function with enemy
    fight(pickedEnemyName);
}