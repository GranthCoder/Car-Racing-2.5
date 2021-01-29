class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1, car2, car3, car4];

    car1.addImage(car1Img);
    car2.addImage(car2Img);
    car3.addImage(car3Img);
    car4.addImage(car4Img);
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    

    if(soundState!==1){
      
      carStart.amp(0.1);
      carStart.play();
      
    }
  
    if(allPlayers !== undefined){
      background(ground);
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 250;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y

          textSize(14);
          fill("white");
          text(player.name,x-20,y-60);
        }
        
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }
    if(player.distance>=4100){
      gameState=2
    };



    if(keyIsDown(UP_ARROW) && player.index !== null){
      soundState = 1;
      
      
      carRace.amp(0.1);
      carRace.play();
      
      player.distance +=10
      console.log(player.distance);
      player.update();
    }

    
    drawSprites();
  }

  End(){
    console.log("Game Ended");
    drawSprites();
  }
}

