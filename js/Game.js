class Game{
    constructor(){
    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })
    }
    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_image);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_image);
    players=[player1,player2];
    }
    play(){
        form.hide();

        Player.getPlayerInfo();
        console.log(allPlayers);
        image(backround_image, 0, 0, 1000, 800);
        if(allPlayers!= undefined){

        
            var x =100;
            var y=200;
            var i = 0;

            drawSprites();

            for(var plr in allPlayers){
                i = i+1; // i = 1
                x = 500-allPlayers[plr].distance;
                y=500;
                
                players[i -1].x = x; //  
                players[i - 1].y = y;

                // Differentiate the main player by printing
                // the name of the player on the basket. 
                if(i === player.index){
                    fill("White")
                    textSize(25);
                    text(allPlayers[plr].name, x-25, y-25);
                }
            }

            if(keyIsDown(RIGHT_ARROW) && player.index !== null){
                player.distance -= 10;
                player.update();
            }
            if(keyIsDown(LEFT_ARROW) && player.index !== null){
                player.distance += 10;
                player.update();
            }

            if(frameCount%20 === 0){
                fruits = createSprite(random(100,1000), 0, 100, 100);
                fruits.velocityY = 6;

                var rand = Math.round(random(1,5));
                switch(rand){
                    case 1: fruits.addImage("fruit1",fruit1_image);
                    break;
                    case 2: fruits.addImage("fruit2",fruit2_image);
                    break;
                    case 3: fruits.addImage("fruit3",fruit3_image);
                    break;
                    case 4: fruits.addImage("fruit4",fruit4_image);
                    break;
                    case 5: fruits.addImage("fruit5",fruit5_image);
                    break;
                }
                fruitGroup.add(fruits);
            }

            if(player.index !== null){
                for(var i = 0; i < fruitGroup.length; i++){
                    if(fruitGroup.get(i).isTouching(players)){
                        fruitGroup.get(i).destroy();
                        player.score = player.score + 1
                        player.update();
                    }
                }
            }

            textSize(25);
            fill("white");
            text("Player 1: "+ allPlayers.player1.score,100,100);
            text("Player 2: "+ allPlayers.player2.score,100,150);

            if(player.score >= 10){
                this.end();
            }
        }
}
end(){
    game.update(2);
    clear();
    fill("Black");
    textSize(40);
    text("GAME OVER!",350, 300);
    }
}