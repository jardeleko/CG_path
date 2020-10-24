var scene;
var cam;
var renderer;
var cube;
var speedX = 0.5;
var speedY = 0.5;
//var speedZ = 0.5;

var createCube = function()  {
    var geometry = new THREE.BoxGeometry(15, 15, 15); 

     
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
    cube = new THREE.Mesh(geometry, mat);
    scene.add(cube);
    //0x090909 0xff0000 0x434343
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

var inputClick = function(e){
    console.log("Apertou a tecla: " +e.keyCode);
    if(e.keyCode == 32){ //space
        cube.rotation.x+=0.01;
        cube.rotation.y+=0.05;
        cube.rotation.z+=0.04; 
    }
    if(e.keyCode == 38){ //up
      if(cube.position.y < 26) cube.position.y += speedY;
        // cube.rotation.y+=0.005; 
    }
    if(e.keyCode == 40){ //down
        if(cube.position.y > -26) cube.position.y -= speedY;
    }

    if(e.keyCode == 37){ //left
        if(cube.position.x > -62) cube.position.x -= speedX;
          // cube.rotation.y+=0.005; 
      }
      if(e.keyCode == 39){ //right
          if(cube.position.x < 62) cube.position.x += speedX;
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

    createCube();
    render();
    renderer.render(scene, cam);
}

window.onload = this.init;