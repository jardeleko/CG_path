var scene;
var camera;
var renderer;

var velocity = 0.1;


var createACube = function() {
    //parte 01
    pivot = new THREE.Group();
    pivot.position.set(0,0,0);
    scene.add(pivot);

    var geometry = new THREE.BoxGeometry( 2, 10, 2 );
    black = new THREE.Color(0, 0, 0);
    blue = new THREE.Color(0, 0, 1);
    green = new THREE.Color(0, 1, 0);
    solidblue = new THREE.Color(0, 1, 1);
    red = new THREE.Color(1, 0, 0);
    purple = new THREE.Color(1, 0, 1);
    yellow = new THREE.Color(1, 1, 0);
    white = new THREE.Color(1, 1, 1);
    var colors = [red,blue, green];
    var colorzin40graus = [solidblue, yellow, purple];
    var material = new THREE.MeshBasicMaterial( { color: yellow } );
    braco = new THREE.Mesh( geometry, material );
    braco.position.y+=pivot.position.x+5;
    pivot.add(braco);

    var geometry2 = new THREE.SphereGeometry(2, 32,32);
    var material2 = new THREE.MeshBasicMaterial( { color: 0x343434} );
    cotovelo = new THREE.Mesh(geometry2, material2);
    cotovelo.position.y-=5;
    braco.add(cotovelo);

    var geometry3 = new THREE.SphereGeometry(2, 32,32);
    var material3 = new THREE.MeshBasicMaterial( { color: purple} );
    ombro = new THREE.Mesh(geometry3, material3);
    ombro.position.y+=5;
    braco.add(ombro);

    //parte 02
    pivot2 = new THREE.Group();
    pivot2.position.set(0,0,0);
    cotovelo.add(pivot2);

    var geometry4 = new THREE.BoxGeometry( 2, 10, 2 );
    var material4 = new THREE.MeshBasicMaterial( { color: yellow } );
    antebraco = new THREE.Mesh( geometry4, material4 );
    
    antebraco.position.y-=pivot2.position.x-5;
    pivot2.rotation.z = Math.PI;
    pivot2.add(antebraco);

    var geometry5 = new THREE.SphereGeometry(2, 32,32);
    var material5 = new THREE.MeshBasicMaterial( { color: solidblue} );
    pulso = new THREE.Mesh(geometry5, material5);
    pulso.position.y+=5;
    
    antebraco.add(pulso);
   
};

var init = function() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.createACube();

    camera.position.z = 100;

    render();

    document.addEventListener('keydown', onKeyDown ); 

    document.addEventListener('mousedown', onMouseDown ); //metodos de controle do mouser
    document.addEventListener('mouseup', onMouseUp ); 
    document.addEventListener('mousemove', onMouseMouse ); 
  
};

var ci = 0
var render = function() {
    requestAnimationFrame( render );

    renderer.render( scene, camera );
};

var rotationVelocity = 0.1;

var onKeyDown = function(e){
    console.log(e.keyCode);
    if(e.keyCode == 37){
        braco.position.x-=velocity;
        
    }
    if (e.keyCode == 32){ //ao apertar espaço o braço gira 180 graus em z(para ambos os lados)
        if(pivot.rotation.z > 2 || pivot.rotation.z < -2) rotationVelocity*=-1;
        pivot.rotation.z+=rotationVelocity;
        
        //if(pivot2.rotation.z <= 6) pivot2.rotation.z+=rotationVelocity;    
    }

    if(e.keyCode == 39){//ao apertar a tecla para frente ele faz movimentos de 90 graus de z desde que o eixo do antebraço esteja setado em 3.14
        if(pivot.rotation.z > 1.5 || pivot.rotation.z < 0) rotationVelocity*=-1;
        pivot.rotation.z+=rotationVelocity;
        
        if(pivot2.rotation.z <= 6) pivot2.rotation.z+=rotationVelocity;  
    }

    if (e.keyCode == 187){ // +
        braco.scale.x+=0.1;
        braco.scale.y+=0.1;
        braco.scale.z+=0.1;
    }
    if (e.keyCode == 189){ // -
        braco.scale.x-=0.1;
        braco.scale.y-=0.1;
        braco.scale.z-=0.1;
    }
}


var posicaoMouser = { //controla a posiÃ§Ã£o do mouser
    x: 0,
    y: 0
};

var cliquePressionado = false; //para controlar o tempo que o cara esta pressionando o botao do mouser

var onMouseDown = function(e){
    cliquePressionado = true;
    //console.log("Apertou Clicou")
}


var onMouseUp = function(e){
    cliquePressionado = false;
  //  console.log("SOltou o clique");
}


var onMouseMouse = function (e){
    if (cliquePressionado){

        var deltaMovimento = {
            x: e.offsetX - posicaoMouser.x,
            y: e.offsetY - posicaoMouser.y,
        }

        //braco.position.x += deltaMovimento.x*0.01;
        //braco.position.y += deltaMovimento.y*0.01*-1;

        braco.rotation.x += toRadians(deltaMovimento.y*1)*0.5;
        braco.rotation.y += toRadians(deltaMovimento.x*1)*0.5;
    }

    posicaoMouser = {  //nova posiÃ§Ã£o do mouser
        x : e.offsetX,
        y : e.offsetY
    };
}

window.onload = this.init;

function toRadians(angle) {
	return angle * (Math.PI / 180);
}
