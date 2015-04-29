window.onload = function(){

	var scene = new THREE.Scene()

	var d20Geo = new THREE.Geometry()

	var windowWidth = window.innerWidth
		windowHeight = window.innerHeight

	var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    scene.add(camera)
    camera.position.z += 300;
    camera.position.x += 300;
    camera.position.y += 700;
    camera.lookAt(new THREE.Vector3(0, 0, 0));


    var light = new THREE.DirectionalLight(0xffffff)
    light.position.set(1, 1, 1).normalize()
    scene.add(light)

    scene.add(new THREE.AmbientLight(0x333333));

    var renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor( 0xeeeeee, 1 )
    document.body.appendChild(renderer.domElement)

    //so the Vertices of a regular icosahedron are the vertices of three orthogonal planes connected in a certain way

    //let's set up those three-dimensional orthogonal planes

    var planes = [],
    	width = 300
    	height = 400

    //plane in x-y space
    var planeXY = new THREE.Geometry()
    planeXY.vertices.push(new THREE.Vector3( -height, -width, 0 ))
    planeXY.vertices.push(new THREE.Vector3( height, -width, 0 ))
    planeXY.vertices.push(new THREE.Vector3( height, width, 0 ))
    planeXY.vertices.push(new THREE.Vector3( -height, width, 0 ))

    planes.push(planeXY)

    //plane in y-z space
    var planeYZ = new THREE.Geometry()
    planeYZ.vertices.push(new THREE.Vector3( 0, -height, width ))
    planeYZ.vertices.push(new THREE.Vector3( 0, -height, -width ))
    planeYZ.vertices.push(new THREE.Vector3( 0, height, -width ))
    planeYZ.vertices.push(new THREE.Vector3( 0, height, width ))

    planes.push(planeYZ)

    //plane in x-z space
    var planeXZ = new THREE.Geometry()
    planeXZ.vertices.push(new THREE.Vector3( -width, 0, height ))
    planeXZ.vertices.push(new THREE.Vector3( -width, 0, -height ))
    planeXZ.vertices.push(new THREE.Vector3( width, 0, -height ))
    planeXZ.vertices.push(new THREE.Vector3( width, 0, height ))

    planes.push(planeXZ)

    planes.forEach(function(el) {
    	el.faces.push(new THREE.Face3( 0, 1, 2 ))
    	el.faces.push(new THREE.Face3( 0, 2, 3 ))
    })

    var materialXY = new THREE.MeshBasicMaterial( { color: 0xF6831E, side: THREE.DoubleSide } ),
    	materialYZ = new THREE.MeshBasicMaterial( {color: 0x29CFF0, side: THREE.DoubleSide} ),
    	materialXZ = new THREE.MeshBasicMaterial( {color: 0xF04A29, side: THREE.DoubleSide} )


    var xyMesh = new THREE.Mesh(planeXY, materialXY)
    var yzMesh = new THREE.Mesh(planeYZ, materialYZ)
    var xzMesh = new THREE.Mesh(planeXZ, materialXZ)
 
 	

    scene.add(xyMesh)
    scene.add(yzMesh)
    scene.add(xzMesh)

    function animate() {
        requestAnimationFrame( animate )
        //xyMesh.rotation.y += 2 * Math.PI / 180
        //camera.rotation.y += 2 * Math.PI / 180
        //xyMesh.translateZ(-1)
        renderer.render(scene, camera)
    }
      animate()
}