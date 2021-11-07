const hosts = require('../hosts'); //Using hosts (eg. servers) to be conected with the current application

//Another approach: https://stackoverflow.com/questions/6478914/reverse-geocoding-code
//google geocoder
const getLocalization = (callback) =>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(((position)=>{
            //console.log ("Position => ", position);
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            callback ({"latitude": lat, "longitude": lon});
            //fetch ('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + lat + '&longitude=' + lon '&localityLanguage=pt')
        }));
    } 
    else {
		console.log ("Geolocation is not supported by this browser.");
		callback ({"latitude": null, "longitude": null});
    }
}
//window.addEventListener('mousemove', (e)=>{console.log("Event", e)}) //Just testing event listener. resize, mousemove, etc. From these events we can get window.innerHeight, window.innerWidth, etc.
//TEST -> var dict = {"one": 1, "two": 2, "three":3}; console.log ("HERE -> ", Object.keys(dict)); console.log ("HERE -> ", Object.values(dict));


	/*
	updateDimensions = () => {
		this.setState({
		  height: window.innerHeight, 
		  width: window.innerWidth
		});
		console.log (window.innerHeight)
	}
	*/

	const handleUploadFile = (event) => {
		//Blob or BLOB = Binary Large Object or Basic Large Object. So let's be blobbing (move big binary data)
		//fileDownload(event.target.files[0], __dirname + 'download1.jpg'); //__dirname = ./ = process.cwd()
		//fileDownload('C:/download1.jpg'); //__dirname = ./ = process.cwd()
		/*
        //The UNIX timestamp is an integer that represents the number of seconds elapsed since January 1 1970.
        On UNIX-like machines, which include Linux and macOS, you can type date +%s
        In Javascript we call new Date().getTime()	or	new Date().valueOf()
		*/

		// URL.createObjectURL(event.target.files[0]) //Might be used to grab the file from the input to a variable in order to use it directly.
		var formData = new FormData(); // Currently empty
		//formData.append('myFile', URL.createObjectURL(event.target.files[0]))
		formData.append('myFile', event.target.files[0]);
		let nameToSave = new Date().getTime().toString() + event.target.files[0].name;
		formData.append('clientName', nameToSave); //Now we have the timestamp plus the real name. We don't need to specify event.target.files[0].name
		formData.append('token', "bea1c159664e244decc7eaa1f1c5bed5fc434f6e5d1e8851ec7f1b31660c5498");
		formData.append('component', "2");
		
		fetch(hosts.ango_restapi + "/users/upload", {
			method: 'POST', //method: 'DELETE',
			/*Not necessary*/
			headers: {
			//'Accept': 'application/json',
			//'Content-Type': 'application/json',
			//'Content-Type': "multipart/form-data"
			'enctype': "multipart/form-data"
			},
			body: formData
		})
		
		return nameToSave;
	}

	const handleUploadFile2 = (file, callBackFunction) => {
		//file.path = file.name;
		var namesToSave = [];
		var imagesToPreview = [];
		for (var i=0; i<file.length; i++){
			var formData = new FormData(); // Currently empty
			formData.append('myFile', file[i]);
			let nameToSave = new Date().getTime().toString() + file[i].name;
			let imageToPreview = file[i];
			formData.append('clientName', nameToSave); //Now we have the timestamp plus the real name. We don't need to specify event.target.files[0].name
			formData.append('token', "bea1c159664e244decc7eaa1f1c5bed5fc434f6e5d1e8851ec7f1b31660c5498");
			formData.append('component', "2"); //TODO: use real token!!!
			if ((i===0) && (i!==file.length-1))
				namesToSave.push (nameToSave + "'"); //Names to send to realtime
			else if((i!==0) && (i===file.length-1))
				namesToSave.push ("'" + nameToSave); //Names to send to realtime
			else if (file.length-1 === 0)
				namesToSave.push (nameToSave); //Names to send to realtime
			else
				namesToSave.push ("'" + nameToSave + "'"); //Names to send to realtime
			imagesToPreview.push (URL.createObjectURL (imageToPreview)); //Names to send to realtime
	
			fetch(hosts.ango_restapi + "/users/upload", { //users
				method: 'POST',
				headers: {
				'enctype': "multipart/form-data"
				},
				body: formData
			})
		}

		callBackFunction ({"names": namesToSave, "images": imagesToPreview});
		//return nameToSave;
	}

	module.exports = {
		getLocalization, handleUploadFile, handleUploadFile2
	}
	
	//Use
	/*
		auxiliaryFunctions.getLocalization (callBack =>{
			alert (callBack.longitude)
		})
	*/
