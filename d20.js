window.onload = function(){

	var scene = new THREE.Scene(),
		clock = new THREE.Clock(),
		d20Geo = new THREE.Geometry()

	var windowWidth = window.innerWidth
		windowHeight = window.innerHeight

	var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10000);
    //var camera = new THREE.OrthographicCamera( windowWidth / - 2, windowWidth / 2, windowHeight / 2, windowHeight / - 2, 1, 10000 );
    scene.add(camera)
    camera.rotation.order = 'YXZ'
    camera.position.z += 800;
    camera.position.x += 800;
    camera.position.y += 500;
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
    	width = 150
    	height = 200

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
    d20Geo.vertices.push(planeYZ.vertices[3], 
				    	planeXY.vertices[2], //1 
				    	planeXZ.vertices[3], 
						planeXZ.vertices[0], 
						planeXY.vertices[3], //4
						planeXZ.vertices[1], 
						planeYZ.vertices[2], //6
						planeXZ.vertices[2], 
						planeYZ.vertices[0], //8
						planeYZ.vertices[1], 
						planeXY.vertices[1], //10
						planeXY.vertices[0],
						planeXZ.vertices[1]) // 12


    d20Geo.faces.push(new THREE.Face3(0, 1, 2),
    				new THREE.Face3(0, 2, 3),
					new THREE.Face3(0, 3, 4),
					new THREE.Face3(4, 5, 6),
					new THREE.Face3(6, 1, 7),
					new THREE.Face3(5, 6, 7),
					new THREE.Face3(0, 6, 1),
					new THREE.Face3(0, 6, 4),
					new THREE.Face3(3, 2, 8), //xz3, xz0
					new THREE.Face3(5, 7, 9),
					new THREE.Face3(1, 2, 10), // xy2, xz3, xy1
					new THREE.Face3(1, 10, 7), // xy2, xy1, xz2
					new THREE.Face3(4, 11, 5), //xz1
					new THREE.Face3(4, 11, 3),
					new THREE.Face3(10, 8, 2), //xy1, yz0, xz3
					new THREE.Face3(10, 9, 7), //xy1, yz1, xz2
					new THREE.Face3(10, 8, 9),
					new THREE.Face3(11, 8, 3), //xy0, yz0, xz0
					new THREE.Face3(11, 9, 5),
					new THREE.Face3(11, 8, 9))  


    var d20material = new THREE.MeshBasicMaterial( {color: 0x93F05D, side: THREE.DoubleSide} )
    d20material.opacity = 0.8
    d20material.transparent = true
    var d20Mesh = new THREE.Mesh(d20Geo, d20material)
    scene.add(d20Mesh)
    var wireframe = new THREE.WireframeHelper(d20Mesh, 0xff0000)
    scene.add(wireframe)

    // scene.add(xyMesh) // orange
    // scene.add(yzMesh) // blue
    // scene.add(xzMesh) // red

    var referenceCube = new THREE.Mesh(new THREE.CubeGeometry( 90, 90, 90), new THREE.MeshLambertMaterial( {color: 'orange'}))
    referenceCube.position.x -= 400
    scene.add(referenceCube)

    function animate() {
        var time = clock.getElapsedTime()
	    // camera.position.x = Math.sin(clock.getElapsedTime()) * 1000	     
	    // camera.position.z = Math.cos(clock.getElapsedTime()) * 1000
	    //d20Mesh.rotation.x = Math.sin(time) * 10	
	    //d20Mesh.position.y += Math.cos(clock.getElapsedTime() - Math.PI) * 10
	    // camera.position.x = Math.sin(270 * Math.PI / 180) * 1000	     
	    // camera.position.z = Math.cos(270 * Math.PI / 180) * 1000
        d20Mesh.position.y = (Math.cos(time * 2) * 10 * Math.sign(Math.cos(time * 2) * 10) * (3/time)) * 100
        console.log(d20Mesh.position.y)
        camera.lookAt(new THREE.Vector3(0, 0, 0))
        renderer.render(scene, camera)
        requestAnimationFrame( animate )
    }
      animate()
}