// fondo


// var granimInstance = new Granim({
//     element: '#canvas-image-blending',
//     direction: 'top-bottom',
//     isPausedWhenNotInView: true,
//     image : {
//         source: 'assets/img/back_1.jpg',
//         blendingMode: 'multiply',
//         stretchMode: ['stretch','stretch']
//     },
//     states : {
//         "default-state": {
//             gradients: [
//                 ['#EB3349', '#F45C43'],
//                 ['#FF8008', '#FFC837'],
//                 ['#4CB8C4', '#3CD3AD'],
//                 ['#24C6DC', '#514A9D'],
//                 ['#FF512F', '#DD2476'],
//                 ['#DA22FF', '#9733EE']
//             ],
//             transitionSpeed: 2000
//         }
//     }
// });



// icono de menu desplegable

const iconElement = document.getElementById('icon');
sonido = document.getElementById("audio");
        

const options1 = {
    from: 'fa-bars',
    to: 'fa-stream',
    animation: 'rubberBand'
};

const options2 = {
    from: 'fa-stream' ,
    to: 'fa-bars',
    animation: 'rubberBand'
};

let apretado = false;


iconElement.addEventListener('click', function(){
    // sonido.play();
    
    if (apretado == false){
        iconate(iconElement, options1);
        apretado = true;
    }
    else if (apretado == true) {
        iconate(iconElement, options2);
        apretado = false;
    }
    
} );

// funciones

function mobile(){
    document.getElementById("idMobile").classList.toggle("mobile");
    // document.getElementById("nombre").classList.toggle("nombre2");
}

function playSound(){
    audio = document.getElementById("audio2");
    audio.play();
}

/* ////////////////////////////////////////////////////////////////////////////////////// */
/* ///////////////////////////////////////////////////////////////////////////////////////// */
/* JUEGOOOOO */




var character = document.querySelector(".character");
var map = document.querySelector(".map");

//start in the middle of the map
var x = 20  ;
var y = 0  ;
var held_directions = []; //State of which arrow keys we are holding down
var speed = 1; //How fast the character moves in pixels per frame

const placeCharacter = () => {
   
   var pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
   );
   
   const held_direction = held_directions[0];
   if (held_direction) {
      if (held_direction === directions.right) {x += speed;}
      if (held_direction === directions.left) {x -= speed;}
      if (held_direction === directions.down) {y += speed;}
      if (held_direction === directions.up) {y -= speed;}
      character.setAttribute("facing", held_direction);
   }
   character.setAttribute("walking", held_direction ? "true" : "false");
   
   //Limits (gives the illusion of walls)
   var leftLimit = -8;
   var rightLimit = (16 * 18.5);
   // var topLimit = -8 + 32;
   var topLimit = -15;
   // var bottomLimit = (16 * 7);
   var bottomLimit = (16 * 8);



   // LIMITES MONEDAS!!
   if  ( (x > 60 && x < 65) && (y > -10 && y < 5) ) {
      x = 60;
      y = y;  
      console.log('choca izq');
   }

   if  ( (x > 60 && x < 87) && ( y < 8 && y > 6) ) {
      x = x;
      y = 8;  
      console.log('choca abajo');
      console.log(x);
   }

   if  ( (x > 60 && x < 87) && ( y < -12 && y > -14) ) {
      x = x;
      y = -14;  
      console.log('choca arriba');
      console.log(y);
   }

   if  ( (x > 83 && x < 85) && (y > -14 && y < 6) ) {
      x = 85;
      y = y;  
      console.log('choca der');
      console.log(x , y);
   }
   // /////////////////////////////////////////////////////////////////////////////

   // LIMITES BORDES!
   if (x < leftLimit) { x = leftLimit; }
   if (x > rightLimit) { x = rightLimit; }
   if (y < topLimit) { y = topLimit; }
   if (y > bottomLimit) { y = bottomLimit; }
   
   
   var camera_left = pixelSize * 166;
   var camera_top = pixelSize * 42;
   
   map.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, ${-y*pixelSize+camera_top}px, 0 )`;
   character.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`;  
}


//Set up the game loop
const step = () => {
   placeCharacter();
   window.requestAnimationFrame(() => {
      step();
   })
}
step(); //kick off the first step!



/* Direction key state */
const directions = {
   up: "up",
   down: "down",
   left: "left",
   right: "right",
}
const keys = {
   38: directions.up,
   37: directions.left,
   39: directions.right,
   40: directions.down,
}
document.addEventListener("keydown", (e) => {
   var dir = keys[e.which];
   if (dir && held_directions.indexOf(dir) === -1) {
      held_directions.unshift(dir)
   }
})

document.addEventListener("keyup", (e) => {
   var dir = keys[e.which];
   var index = held_directions.indexOf(dir);
   if (index > -1) {
      held_directions.splice(index, 1)
   }
});



/* BONUS! Dpad functionality for mouse and touch */
var isPressed = false;
const removePressedAll = () => {
   document.querySelectorAll(".dpad-button").forEach(d => {
      d.classList.remove("pressed")
   })
}
document.body.addEventListener("mousedown", () => {
   console.log('mouse is down')
   isPressed = true;
})
document.body.addEventListener("mouseup", () => {
   console.log('mouse is up')
   isPressed = false;
   held_directions = [];
   removePressedAll();
})
const handleDpadPress = (direction, click) => {   
   if (click) {
      isPressed = true;
   }
   held_directions = (isPressed) ? [direction] : []
   
   if (isPressed) {
      removePressedAll();
      document.querySelector(".dpad-"+direction).classList.add("pressed");
   }
}
//Bind a ton of events for the dpad
document.querySelector(".dpad-left").addEventListener("touchstart", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("touchstart", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("touchstart", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("touchstart", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mousedown", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("mousedown", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("mousedown", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("mousedown", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mouseover", (e) => handleDpadPress(directions.left));
document.querySelector(".dpad-up").addEventListener("mouseover", (e) => handleDpadPress(directions.up));
document.querySelector(".dpad-right").addEventListener("mouseover", (e) => handleDpadPress(directions.right));
document.querySelector(".dpad-down").addEventListener("mouseover", (e) => handleDpadPress(directions.down));









