var scene;
var cam;
var renderer;
var cube;
var speedX = 0.2;
var speedY = 0.2;
var speedZ = 0.2;

var createCube = function()  {
    var geometry = new THREE.BoxGeometry(2, 10, 2); 
     
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
/*
    geometry.faces[0].color = colors[6];
    geometry.faces[1].color = colors[2];
    geometry.faces[2].color = colors[6];
    geometry.faces[3].color = colors[2];
    geometry.faces[4].color = colors[6];
    geometry.faces[5].color = colors[2];
    geometry.faces[6].color = colors[6];
    geometry.faces[7].color = colors[2];
    geometry.faces[8].color = colors[6];
    geometry.faces[9].color = colors[2];
    geometry.faces[10].color = colors[6];
    geometry.faces[11].color = colors[2];

    for (let i = 0; i < 3; i++) {
        geometry.faces[4*i].color = colors[i];
        geometry.faces[4*i+1].color = colors[i];
        geometry.faces[4*i+2].color = colors[i];
        geometry.faces[4*i+3].color = colors[i];
    }


    */

    var mat = new THREE.MeshBasicMaterial({color:'green'})
    cube = new THREE.Mesh(geometry, mat);
    scene.add(cube);

    var geometry4 = new THREE.BoxGeometry(2, 10, 2); 
    var mat4 = new THREE.MeshBasicMaterial({color:green})
    var cube_plus = new THREE.Mesh(geometry4, mat4);
    cube_plus.position.y+=10;
    cube.add(cube_plus);

    //0x090909 0xff0000 0x434343
    var geometry2 = new THREE.SphereGeometry(2, 32, 32);
    var mat2 = new THREE.MeshBasicMaterial({color:0x434343});
    sphere = new THREE.Mesh(geometry2, mat2);
    sphere.position.y-=5;
    cube.add(sphere);
    
    var geometry3 = new THREE.SphereGeometry(2, 32, 32);
    var mat3 = new THREE.MeshBasicMaterial({color:0x434343});
    sphere2 = new THREE.Mesh(geometry3, mat3);
    sphere2.position.y+=5;
    cube.add(sphere2);
    
    cube_plus.add(cube);

    var geometry5 = new THREE.SphereGeometry(2, 32, 32);
    var mat5 = new THREE.MeshBasicMaterial({color:0x434343});
    sphere3 = new THREE.Mesh(geometry5, mat5);
    sphere3.position.y+=5;
    cube.add(sphere3);
    cube_plus.add(sphere3);

    pivot = new THREE.Group();
    pivot.position.set(0,0,0);
    pivot.add(cube);



    scene.add(pivot);
    cube.position.y+=pivot.position.x-5;
}

var render = function () {
    requestAnimationFrame(render);
    //animationCube();
    renderer.render(scene, cam);
}

var animationCube = function() {
    
    if(this.cube.position.x >= 64 || this.cube.position.x <= - 64){
        speedX = speedX * -1;
   
    }
    if(this.cube.position.y >= 30 || this.cube.position.y <= - 30){
        speedY = speedY * -1;
    }
    if(this.cube.position.y >= 20 || this.cube.position.y <= - 20){
        speedZ = speedZ * -1;
    }

    this.cube.position.x+=speedX;
    this.cube.position.y+=speedY;
    this.cube.position.z+=speedZ;

    cube.rotation.x+=0.01;
    cube.rotation.y+=0.005;   
}

var count = 0;

var cubeRotate = function(){ 
//rotaciona o cubo por baixo .
//matrizRotacao = new THREE.Matrix4().makeRotationAxis(new THRRE.Vector3(0, 1, 0.1), Math.PI/6.0); //matriz de rotação
//cube.applyMatrix(matrizRotacao);
        
    if(count ++ >= 10){
        var rotateQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.5, 0.5, 0, 'XYZ'));
        cube.quaternion.multiplyQuaternions(rotateQuaternion, cube.quaternion);
        count = 0;
        console.log(cube.quaternion);
    }    

   console.log(cube.rotation);
}
var rotationVelocity = 0.1;

var inputClick = function(e){
    console.log("Apertou a tecla: " +e.keyCode);
    
    if(e.keyCode == 32){ //space agora rotaciona pelo pivo 
    //    cube.rotation.x+=0.01;
        if(pivot.rotation.z > 1.7 || pivot.rotation.z <= -1){
            rotationVelocity*=-1;
        }
        pivot.rotation.z+=rotationVelocity;
    //    cube.rotation.z+=0.04; 
    }

    if(e.keyCode == 38){ //up
        cube.position.y += speedY;
       // cube.rotation.y+=0.005; 
    }
    if(e.keyCode == 40){ //down
        cube.position.y -= speedY;
       // cube.rotation.y+=0.005; 
    }
    if(e.keyCode == 187){
        cube.scale.x += 1;
        cube.scale.y += 1;
        cube.scale.z += 1;
        
    }
    if(e.keyCode == 189){
        cube.scale.x -= 1;
        cube.scale.y -= 1;
        cube.scale.z -= 1;
    }
} 


var init = function () {
    scene = new THREE.Scene();
    cam = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000);// toda renderização baseada no intervalo 1 -> 1000
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    cam.position.z = 100;

    document.addEventListener('keydown', inputClick);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMouse);

    createCube();
    cam.position.z =100;
    render();
    renderer.render(scene, cam);
}

var posicaoMouser = {
    x: 0,
    y: 0 
}
var cliquePressionado = false;

var onMouseDown = function(e){
    cliquePressionado = true;
    console.log("Apertou clicou");
}
var onMouseUp = function(e){
    cliquePressionado = false;
    console.log("Soltoou o clique");
}
var onMouseMouse = function(e){
    if(cliquePressionado){

        var deltaMovimento = {
            x: e.offsetX - posicaoMouser.x,
            y: e.offsetY - posicaoMouser.y,
        }
        cube.position.x += deltaMovimento.x*0.01;
        cube.position.y += deltaMovimento.y*0.01*-1;

        cube.rotation.x += toRadians(deltaMovimento.y * 1)*0.2;
        cube.rotation.y += toRadians(deltaMovimento.x * 1)*0.2;

   //     var deltaRotacao = new THREE.Quaternion().setFromEuler(new THREE.Euler(
   //         toRadians(deltaMovimento.y * 1)*0.2, //angulo de rotação em y
   //         toRadians(deltaMovimento.x * 1)*0.2, //angulo de rotação em x
   //        0,
   //         'XYZ'
   //     ));

   //     cube.quaternion.multiplyQuaternions(deltaRotacao, cube.quaternion);

    //    cube.position.x += (e.offsetX)*0.00001;
    //    cube.position.y += (e.offsetY)*0.0001;
    }   
    posicaoMouser = {
        x: e.offsetX,
        y: e.offsetY
    }   
 //   console.log("este é meu delta move: " + deltaMovimento);
 //   console.log("cube position: " + cube.position);
}

window.onload = this.init;

function toRadians(angle){
    return angle * (Math.PI/180);
}