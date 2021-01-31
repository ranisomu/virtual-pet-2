//Create variables here
var dog,dogImage, happyDog;
var foodS, foodStock;
var database;

function preload() {
  //load images here
  dogImage = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
 }

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImage);
  dog.scale = 0.1;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

 }


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  textSize(16);
  fill("white");
  stroke("white");
  text("press UP_ARROW key to feed food to dog",100,20);
  textSize(22);
  fill("white");
  stroke("white");
  text("Food Remaining : " + foodS,150,170);

 }

function readStock(data) {
 foodS = data.val();
 }

function writeStock(x) {

 if(x<=0){
   x=0;
 }else{
   x=x-1;
 } 

 database.ref('/').update({
  Food:x
 })

}