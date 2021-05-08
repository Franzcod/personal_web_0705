

// Fondo img
var imgList= [  'assets/img/back_1.jpg',
                'assets/img/back_3.jpg',
                'assets/img/back_1.jpg',
                'assets/img/back_3.jpg'  ];
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var granimInstance = new Granim({
    element: '#canvas-image-blending',
    direction: 'top-bottom',
    isPausedWhenNotInView: true,
    image : {
        source: imgList[getRandomInt(0, 4)],
        blendingMode: 'multiply',
        stretchMode: ['stretch','stretch']
    },
    states : {
        "default-state": {
            gradients: [
                ['#EB3349', '#F45C43'],
                ['#FF8008', '#FFC837'],
                ['#4CB8C4', '#3CD3AD'],
                ['#24C6DC', '#514A9D'],
                ['#FF512F', '#DD2476'],
                ['#DA22FF', '#9733EE']
            ],
            transitionSpeed: 2000
        }
    }
});



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


function mobile(){
    document.getElementById("idMobile").classList.toggle("mobile");
    // document.getElementById("nombre").classList.toggle("nombre2");
}

function playSound(){
    audio = document.getElementById("audio2");
    audio.play();
}





