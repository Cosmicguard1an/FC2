class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState').on("value", (data)=> {
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
                }
                player.getCount();
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];
    passedFinish = false;
        }
    
    play(){
        
                form.hide();

                Player.getPlayerInfo();
                player.getFinishedPlayer();
                 image(back_img, 0, 0, 1000, 800);
                 var x =100;
                 var y=200;
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500-allPlayers[plr].distance;
                     y=500;
                     
                     players[index-1].x = x;
                     players[index-1].y = y;
                       
                     if(index === player.index){
                         
                         fill("black");
                         textSize(25);
                         text(allPlayers[plr].name ,x-25,y+25);

                         
                     }
                    
                         textSize(25);
                         fill("white");
                         text("Player 1 :" +allPlayers.player1.score,50,50);
                        text("Player 2 :" + allPlayers.player2.score, 50, 100);
                 
                 }
                
                
                 

                if (keyDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
            
                 if (frameCount % 20 === 0) {
                     fruits = createSprite(random(100, 1000), 0, 100, 100);
                     fruits.velocityY = 6;
                     var rand = Math.round(random(1,5));
                     switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         break;
                         case 2: fruits.addImage("fruit1", fruit2_img);
                         break;
                         case 3: fruits.addImage("fruit1", fruit3_img);
                         break;
                         case 4: fruits.addImage("fruit1", fruit4_img);
                         break;
                         case 5: fruits.addImage("fruit1", fruit5_img);
                         break;
                     }
                     fruitGroup.add(fruits);
                     
                 }
                 
                  if (player.index !== null) {
                      for (var i = 0; i < fruitGroup.length; i++) {
                          if (fruitGroup.get(i).isTouching(players)) {
                              fruitGroup.get(i).destroy();
                              player.score =player.score+1;
                              player.update();
                              
                          }
                          
                      }
                  }
                  if(player.score === 5 && passedFinish === false) {
                      Player.updateFinishedPlayer();
                      console.log("finished player"  + finishedPlayer)
                      player.rank = finishedPlayer
                      player.update(); 
                      fruitGroup.setVelocityYEach(0)
                      fruitGroup.destroyEach();
                      passedFinish = true
                  }

                  else if(player.score === 5 && passedFinish === true) {
                    fruitGroup.setVelocityYEach(0)
                    fruitGroup.destroyEach();
                  }
    }

    displayRank() {
        imageMode(CENTER);
        Player.getPlayerInfo();
        image(goldImg,400, 400,250,300)
        image(silverImg, 200, 400, 250,300)
        textAlign(CENTER);
        textSize(30)
        for(var plr in allPlayers){
            if(allPlayers[plr].rank === 1) {
                fill("white");
                textSize()
                textAlign(CENTER)
                text("First: " + allPlayers[plr].name,400 ,150)
                console.log("hi")
            }

            else {
                fill("white");
                text("Second: "+allPlayers[plr].name,200, 150)
                console.log("second");
            }
        }
    }


    end(){
       console.log("Game Ended");
    }
}