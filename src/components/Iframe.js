import Iframe from 'react-iframe';

<div className="col-lg-12 col-md-12 col-sm-12">{/* Begin Main Content single col*/}
    <Iframe 
        url="http://127.0.0.1:8081/"
        //src="http://127.0.0.1:8081/" 		html iframe property; all the properties are here https://www.npmjs.com/package/react-iframe
        width="100%"
        height="98%"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        frameborder="0" 
        //allow="accelerometer"				For video
        //autoplay							For video 
        //encrypted-media					For video
        //gyroscope; picture-in-picture" 	For video
        allowfullscreen
        styles={{margin: "does't work, so put this frame inside a div with a margin"}}
    />
</div>


