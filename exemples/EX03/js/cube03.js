var scene;
var cam;
var renderer;
var braco1;
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
    geometry.faces[11].color = colors[2];*/

for (let i = 0; i < 3; i++) {
    geometry.faces[4*i].color = colorzin40graus[i];
    geometry.faces[4*i+1].color = colorzin40graus[i];
    geometry.faces[4*i+2].color = colorzin40graus[i];
    geometry.faces[4*i+3].color = colorzin40graus[i];

}
    var mat = new THREE.MeshBasicMaterial({color:'white', vertexColors:true})
    braco1 = new THREE.Mesh(geometry, mat);
    scene.add(braco1);
    //0x090909 0xff0000 0x434343
    var geometry2 = new THREE.SphereGeometry(2, 32, 32);
    var mat2 = new THREE.MeshBasicMaterial({color:0x434343});
    cotovole = new THREE.Mesh(geometry2, mat2);
    cotovole.position.y-=5;
    braco1.add(cotovole);

    //var geometry3 = new THREE.SphereGeometry(2, 32, 32);
    //var mat3 = new THREE.MeshBasicMaterial({color:0x434343});
    //sphere2 = new THREE.Mesh(geometry3, mat3);
    //sphere2.position.y+=5;
    //scene.add(sphere2);

    pivot = new THREE.Group();
    pivot.position.set(0,0,0);
    pivot.add(braco1);

    scene.add(pivot);
    braco1.position.y+=pivot.position.x+5;
}

var render = function () {
    requestAnimationFrame(render);
    //animationCube();
    renderer.render(scene, cam);
}

var animationCube = function() {
    
    if(this.braco1.position.x >= 64 || this.braco1.position.x <= - 64){
        speedX = speedX * -1;
   
    }
    if(this.braco1.position.y >= 30 || this.braco1.position.y <= - 30){
        speedY = speedY * -1;
    }
    if(this.braco1.position.y >= 20 || this.braco1.position.y <= - 20){
        speedZ = speedZ * -1;
    }

    this.braco1.position.x+=speedX;
    this.braco1.position.y+=speedY;
    this.braco1.position.z+=speedZ;

    braco1.rotation.x+=0.01;
    braco1.rotation.y+=0.005;   
}

var count = 0;

var cubeRotate = function(){ 
//rotaciona o cubo por baixo .
//matrizRotacao = new THREE.Matrix4().makeRotationAxis(new THRRE.Vector3(0, 1, 0.1), Math.PI/6.0); //matriz de rotação
//braco1.applyMatrix(matrizRotacao);
        
    if(count ++ >= 10){
        var rotateQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.5, 0.5, 0, 'XYZ'));
        braco1.quaternion.multiplyQuaternions(rotateQuaternion, braco1.quaternion);
        count = 0;
        console.log(braco1.quaternion);
    }    

   console.log(braco1.rotation);
}
var rotationVelocity = 0.1;

var inputClick = function(e){
    console.log("Apertou a tecla: " +e.keyCode);
    
    if(e.keyCode == 32){ //space agora rotaciona pelo pivo 
    //    braco1.rotation.x+=0.01;
        if(pivot.rotation.z > 1.7 || pivot.rotation.z < -1) rotationVelocity*=-1;
        pivot.rotation.z+=rotationVelocity;

    //    braco1.rotation.z+=0.04; 
    }

    if(e.keyCode == 38){ //up
        braco1.position.y += speedY;
       // braco1.rotation.y+=0.005; 
    }
    if(e.keyCode == 40){ //down
        braco1.position.y -= speedY;
       // braco1.rotation.y+=0.005; 
    }
    if(e.keyCode == 187){
        braco1.scale.x += 1;
        braco1.scale.y += 1;
        braco1.scale.z += 1;
        
    }
    if(e.keyCode == 189){
        braco1.scale.x -= 1;
        braco1.scale.y -= 1;
        braco1.scale.z -= 1;
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
        braco1.position.x += deltaMovimento.x*0.01;
        braco1.position.y += deltaMovimento.y*0.01*-1;

        braco1.rotation.x += toRadians(deltaMovimento.y * 1)*0.2;
        braco1.rotation.y += toRadians(deltaMovimento.x * 1)*0.2;

   //     var deltaRotacao = new THREE.Quaternion().setFromEuler(new THREE.Euler(
   //         toRadians(deltaMovimento.y * 1)*0.2, //angulo de rotação em y
   //         toRadians(deltaMovimento.x * 1)*0.2, //angulo de rotação em x
   //        0,
   //         'XYZ'
   //     ));

   //     braco1.quaternion.multiplyQuaternions(deltaRotacao, braco1.quaternion);

    //    braco1.position.x += (e.offsetX)*0.00001;
    //    braco1.position.y += (e.offsetY)*0.0001;
    }   
    posicaoMouser = {
        x: e.offsetX,
        y: e.offsetY
    }   
 //   console.log("este é meu delta move: " + deltaMovimento);
 //   console.log("braco1 position: " + braco1.position);
}

window.onload = this.init;

function toRadians(angle){
    return angle * (Math.PI/180);
}