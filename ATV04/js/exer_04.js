var scene;
var camera;
var renderer;

var velocity = 0.1;

var ground;

var createACube = function() {
    var geometry = new THREE.BoxGeometry( 2, 10, 2 );

    red = new THREE.Color(1, 0, 0);
    green = new THREE.Color(0, 1, 0);
    blue = new THREE.Color(0, 0, 1);
    var colors = [red, green, blue];

    for (var i = 0; i < 3; i++) {
        geometry.faces[4 * i].color = colors[i];
        geometry.faces[4 * i+1].color = colors[i];
        geometry.faces[4 * i+2].color = colors[i];
        geometry.faces[4 * i+3].color = colors[i];

    }
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: true } );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    var geometry2 = new THREE.SphereGeometry(2, 32,32);
    var material2 = new THREE.MeshBasicMaterial( { color: 0xffffff} );
    sphere = new THREE.Mesh(geometry2, material2);
    sphere.position.y-=5;
    cube.add(sphere);

    pivot = new THREE.Group();
    pivot.position.set(0,0,0);
    pivot.add(cube);

    scene.add(pivot);
    cube.position.y+=pivot.position.x+5;

};

var guiFunction = function(){

    var hexcontrol;

    const gui = new dat.GUI();
    param = {
        a: "init ",
        b: 1, 
        c: "#000000",
        x: 0,
        y: 0,
        z: 0
    };
    gui.add(param, 'a').name("Nome");
    gui.add(param, 'b').min(0).max(10).step(1).name("Points");   
    //gui.addColor(param, 'c').name('table-colors');
    
    
    var cor = gui.addColor(param, 'c').name('table-colors');
    cor.onChange(function(hexcontrol){
        ground.material.color.setHex(hexcontrol.replace("#", "0x"));
    })

    gui.add(param, 'x').min(-100).max(10).step(100).name("Position: ");   
    gui.add(param, 'y').min(-100).max(10).step(100).name("Position: ");   
    gui.add(param, 'z').min(-100).max(10).step(100).name("Position: ");   

    gui.open();
}

var init = function() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x343434);
    camera = new THREE.PerspectiveCamera( 40,
                                        window.innerWidth /
                                        window.innerHeight,
                                        1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.createACube();

    camera.position.z = 100;
    camera.position.y = 20;

    var geometrics = new THREE.SphereGeometry(10, 10, 10); //
    var mat = new THREE.MeshBasicMaterial({color:'white'})
    sphere_ = new THREE.Mesh(geometrics, mat);
    scene.add(sphere_);
    sphere_.position.z = 450;
    sphere_.position.y =10;



    ground = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(100, 10000, 10),
        new THREE.MeshBasicMaterial({color:0x050303})
    );
    
    ground.rotation.x -= Math.PI/2;
    ground.position.y = -2;

    scene.add(ground);
    guiFunction();
    //var grid = new THREE.GridHelper(30, 10, 'blue', green);
    //grid.position.y -= 4;
    //scene.add(grid)

    render();

    document.addEventListener('keydown', onKeyDown ); 
/*
    document.addEventListener('mousedown', onMouseDown ); //metodos de controle do mouser
    document.addEventListener('mouseup', onMouseUp ); 
    document.addEventListener('mousemove', onMouseMouse ); 
  */
};

var ci = 0
var render = function() {
    requestAnimationFrame( render );

    renderer.render( scene, camera );
};

var rotationVelocity = 0.1;

var onKeyDown = function(e){
    sphere_.position.z -= velocity*40;
    if(e.keyCode == 38){
        camera.rotation.x-=-0.1;   
    //    pivot.position.z -= velocity*20;
    }
    if(e.keyCode == 40){
        camera.rotation.x+=-0.1;
    //    pivot.position.z += velocity*20;
    }
    if(e.keyCode == 37){
        camera.rotation.y+=0.1;
    }
    if(e.keyCode == 39){
        camera.rotation.y+=-0.1;
     }
    if (e.keyCode == 32){ //espaÃ§o -> rotaÃ§Ã£o pelo pivo.
        
        console.log("Z: "+ pivot.rotation.z);
        if (pivot.rotation.z > 1.7 || pivot.rotation.z < -1){
            rotationVelocity*=-1;
        }
        pivot.rotation.z+=rotationVelocity; 
       // pivo.rotation.y+=0.1;
    }
    if (e.keyCode == 187){ // +
        cube.scale.x+=0.1;
        cube.scale.y+=0.1;
        cube.scale.z+=0.1;

    //    ground.scale.x +=0.1;
    //    ground.scale.y +=0.1;
    }
    if (e.keyCode == 189){ // -
        cube.scale.x-=0.1;
        cube.scale.y-=0.1;
        cube.scale.z-=0.1;

       // ground.scale.x -=0.1;
        //ground.scale.y -=0.1;
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

        //cube.position.x += deltaMovimento.x*0.01;
        //cube.position.y += deltaMovimento.y*0.01*-1;

        cube.rotation.x += toRadians(deltaMovimento.y*1)*0.5;
        cube.rotation.y += toRadians(deltaMovimento.x*1)*0.5;
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