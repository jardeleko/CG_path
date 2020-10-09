var scene;
var cam;
var renderer;
var cube;
var speedX = 0.4;
var speedY = 0.4;

var createCube = function()  {
    var geometrics = new THREE.SphereGeometry(10, 10, 10); //
    var mat = new THREE.MeshBasicMaterial({color:0x434343})
    cube = new THREE.Mesh(geometrics, mat);
    scene.add(cube);
    //0x090909 0xff0000
}

var render = function () {
    requestAnimationFrame(render);
    animationCube();
    renderer.render(scene, cam);
}

var animationCube = function() {
    if(this.cube.position.x >= 64 || this.cube.position.x <= - 64){
        speedX = speedX * -1;
   
    }
    if(this.cube.position.y >= 30 || this.cube.position.y <= - 30){
        speedY = speedY * -1;
    }
    this.cube.position.x+=speedX;
    this.cube.position.y+=speedY;

    console.log("position " + this.cube.position.x);
}

var init = function () {
    scene = new THREE.Scene();
    cam = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000);// toda renderização baseada no intervalo 1 -> 1000
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    cam.position.z = 100;

    createCube();
    render();
    renderer.render(scene, cam);
}

window.onload = this.init;