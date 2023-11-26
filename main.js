import "./css/style.css"

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.setZ(30);

renderer.render( scene, camera );

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347} );
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

const heartShape = new THREE.Shape();
heartShape.moveTo(25, 25);
heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25); 

const extrudeSettings = { depth: 2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
const heartMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const heart = new THREE.Mesh(heartGeometry, heartMaterial);
scene.add(heart);

heart.scale.set(0.05, 0.05, 0.05);

heart.rotation.x = Math.PI;

heart.position.y = 2;
heart.position.z = 0;
heart.position.x = -1;

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(ambientLight)


const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xfffff})
    const star = new THREE.Mesh( geometry, material );

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star)
}

Array(250).fill().forEach(addStar)

const backgroundTexture = new THREE.TextureLoader().load('space.jpeg');
scene.background = backgroundTexture;



const christmasTexture = new THREE.TextureLoader().load('christmas1.png');

const christmas = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: christmasTexture,
    })
);

scene.add(christmas);


christmas.position.z = 30;

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    christmas.rotation.x += 0.05;
    christmas.rotation.y += 0.075;
    christmas.rotation.z += 0.05;


    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera


function animate(){
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
    renderer.render(scene, camera);
}

animate()