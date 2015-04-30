window.onload = function(){

	var scene = new THREE.Scene(),
		clock = new THREE.Clock(),
		d20Geo = new THREE.Geometry()

	var windowWidth = window.innerWidth
		windowHeight = window.innerHeight

	var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10000);
    scene.add(camera)
    camera.rotation.order = 'YXZ'
    camera.position.z += 600;
    camera.position.x += 600;
    camera.position.y += 700;
    camera.lookAt(new THREE.Vector3(0, 0, 0));


    var light = new THREE.DirectionalLight(0xffffff)
    light.position.set(1, 1, 1).normalize()
    scene.add(light)

    scene.add(new THREE.AmbientLight(0xffffff));

    // var secondLight = new THREE.DirectionalLight( 0xeee);
    // secondLight.position.set(10, 600, -600)
    // secondLight.lookAt(new THREE.Vector3(0, 0, 0))
    // scene.add(secondLight)

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

    //plane in y-z space
    var planeYZ = new THREE.Geometry()
    planeYZ.vertices.push(new THREE.Vector3( 0, -height, width ))
    planeYZ.vertices.push(new THREE.Vector3( 0, -height, -width ))
    planeYZ.vertices.push(new THREE.Vector3( 0, height, -width ))
    planeYZ.vertices.push(new THREE.Vector3( 0, height, width ))

    //plane in x-z space
    var planeXZ = new THREE.Geometry()
    planeXZ.vertices.push(new THREE.Vector3( -width, 0, height ))
    planeXZ.vertices.push(new THREE.Vector3( -width, 0, -height ))
    planeXZ.vertices.push(new THREE.Vector3( width, 0, -height ))
    planeXZ.vertices.push(new THREE.Vector3( width, 0, height ))

    planes.push(planeXY)
    planes.push(planeYZ)
    planes.push(planeXZ)

    var vertices = []

    planes.forEach(function(el) {
    	el.faces.push(new THREE.Face3( 0, 1, 2 ))
    	el.faces.push(new THREE.Face3( 0, 2, 3 ))
    	
    	el.vertices.forEach(function(vertex) {
    		vertices.push(vertex)
    	})
    })

    vertices.forEach(function(el) {
    	console.log(el)
    })

    var materialXY = new THREE.MeshLambertMaterial( { color: 0xF6831E, side: THREE.DoubleSide } ),
    	materialYZ = new THREE.MeshBasicMaterial( {color: 0x29CFF0, side: THREE.DoubleSide} ),
    	materialXZ = new THREE.MeshBasicMaterial( {color: 0xF04A29, side: THREE.DoubleSide} )

    var xyMesh = new THREE.Mesh(planeXY, materialXY),
    	yzMesh = new THREE.Mesh(planeYZ, materialYZ),
    	xzMesh = new THREE.Mesh(planeXZ, materialXZ)

    //construction of d20
    d20Geo.vertices.push(planeYZ.vertices[3], planeXY.vertices[2], planeXZ.vertices[3])
    d20Geo.faces.push(new THREE.Face3(0, 1, 2));
    var d20material = new THREE.MeshBasicMaterial( {color: 0x93F05D, side: THREE.DoubleSide} )
    d20material.opacity = 0.6
    d20material.transparent = true
    var d20Mesh = new THREE.Mesh(d20Geo, d20material)
    scene.add(d20Mesh)
    var wireframe = new THREE.WireframeHelper(d20Mesh, 0xff0000)
    scene.add(wireframe)

    scene.add(xyMesh) // orange
    scene.add(yzMesh) // blue
    scene.add(xzMesh) // red

    function animate() {
        requestAnimationFrame( animate )
         camera.position.x = Math.sin(clock.getElapsedTime()) * 1000
         camera.position.z = Math.cos(clock.getElapsedTime()) * 1000
        camera.lookAt(new THREE.Vector3(0, 0, 0))
        renderer.render(scene, camera)
    }
      animate()
}