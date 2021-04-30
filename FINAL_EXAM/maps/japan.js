export default function mapJAPAN(){
    mapboxgl.accessToken = 'pk.eyJ1IjoidHJvbGwzZXJvIiwiYSI6ImNrbmhqZXBkNzM2MnAydnBodmhmcDI4OWQifQ.PJ8LCLQh3TsFVlhFE1pRkQ';
    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 3, // starting zoom
    center: [140.80078125, 33.232253141714885], // starting position
    pitch: 50,
    antialias: true
    });

    var modelOrigin = [139.80078125, 40.232253141714885];
    var modelAltitude = 2;
    var modelRotate = [Math.PI / 2, 0, 0];
 
    var modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
    modelOrigin,
    modelAltitude
    );
 
    // transformation parameters to position, rotate and scale the 3D model onto the map
    var modelTransform = {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: modelAsMercatorCoordinate.z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
/* Since our 3D model is in real world meters, a scale transform needs to be
* applied since the CustomLayerInterface expects units in MercatorCoordinates.
*/
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()*100000
    };
 
    var THREE = window.THREE;
 
    // configuration of the custom layer for a 3D model per the CustomLayerInterface
    var customLayer = {
    id: '3d-model',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();
 
        // create two three.js lights to illuminate the model
        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);
 
        var directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);
 
        // use the three.js GLTF loader to add the 3D model to the three.js scene
        var loader = new THREE.GLTFLoader();
        loader.load(
            './crud_assets/yourewinner.glb',
            function (gltf) {
                this.scene.add(gltf.scene);
            }.bind(this)
        );
        this.map = map;
 
        // use the Mapbox GL JS map canvas for three.js
        this.renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl,
            antialias: true
        });
 
        this.renderer.autoClear = false;
    },
    render: function (gl, matrix) {
var rotationX = new THREE.Matrix4().makeRotationAxis(
new THREE.Vector3(1, 0, 0),
modelTransform.rotateX
);
var rotationY = new THREE.Matrix4().makeRotationAxis(
new THREE.Vector3(0, 1, 0),
modelTransform.rotateY
);
var rotationZ = new THREE.Matrix4().makeRotationAxis(
new THREE.Vector3(0, 0, 1),
modelTransform.rotateZ
);
 
var m = new THREE.Matrix4().fromArray(matrix);
var l = new THREE.Matrix4()
.makeTranslation(
modelTransform.translateX,
modelTransform.translateY,
modelTransform.translateZ
)
.scale(
new THREE.Vector3(
modelTransform.scale,
-modelTransform.scale,
modelTransform.scale
)
)
.multiply(rotationX)
.multiply(rotationY)
.multiply(rotationZ);
 
this.camera.projectionMatrix = m.multiply(l);
this.renderer.resetState();
this.renderer.render(this.scene, this.camera);
this.map.triggerRepaint();
    }
    };
 
    map.on('style.load', function () {
    map.addLayer(customLayer, 'waterway-label');
    });
}