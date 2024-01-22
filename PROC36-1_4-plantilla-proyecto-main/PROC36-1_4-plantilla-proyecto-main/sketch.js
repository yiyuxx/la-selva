var balloon,balloonImage1,balloonImage2;
var database;
var height;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon-01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon-01.png","Images/HotAirBallon-01.png",
   "Images/HotAirBallon-01.png","Images/HotAirBallon-02.png","Images/HotAirBallon-02.png",
   "Images/HotAirBallon-02.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png");
  }

// Función para configurar el ambiente inicial
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,650,250,650);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, console.log("error"));
  textSize(20); 
}

// Función para mostrar UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBallon",balloonImage2)
    // Agrega la animación del globo [usa balloonImage2]
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    // Agrega la animación del globo [usa balloonImage2]
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    // Agrega la animación del globo [usa balloonImage2]
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    // Agrega la animación del globo [usa balloonImage2]
    balloon.scale=balloon.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**¡Usa las flechas del teclado para mover el globo aerostático!",40,40);

}


function updateHeight(x,y){
  database.ref('/balloon/height').update({
    'x': height.x + x ,
    'y': height.y + y
  })
}




function readHeight(data){
height = data.val();
console.log(height.x);
balloon.x = height.x
balloon.y = height.y
 }

function showError(){
  console.log("Error la escribir en la base de datos");
}
