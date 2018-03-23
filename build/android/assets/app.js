/**
 * Create a new `Ti.UI.TabGroup`.
 */
var tabGroup = Ti.UI.createTabGroup();

	tabGroup.addTab(createTab("Tab 1", "ventana 1", "assets/images/tab1.png"));
	tabGroup.addTab(createTab("Tab 2", "ventana 2", "assets/images/tab2.png"));
	var win;



// Verifica si hay permisos
if (!Ti.Media.hasCameraPermissions()) {
 
    // hace el request para acceso a camara
    Ti.Media.requestCameraPermissions(function (e) {
 
        // Exito!
        if (e.success) {
            Ti.Media.showCamera({ 
	   
 			});
 
        // Error!
        } else {
            Ti.API.error('Error !! No hay permisos para acceder a la camara');
        }
    });
} else {
    // Ya hay permisos
    Ti.Media.showCamera({
    	
    	
    });
}
/**
 * Open the tabGroup
 */
tabGroup.open();

/**
 * Creates a new Tab and configures it.
 *
 * @param  {String} title The title used in the `Ti.UI.Tab` and it's included `Ti.UI.Window`
 * @param  {String} message The title displayed in the `Ti.UI.Label`
 * @return {String} icon The icon used in the `Ti.UI.Tab`
 */
function createTab(title, message, icon) {
	if(title=="Tab 2"){
		
		win = Ti.UI.createWindow({
	        	title: title,
	        	layout: 'vertical',
	        	backgroundColor: '#fff'
	    	}),
	    	photoBtn = Ti.UI.createButton({
	        	title: 'Tomar Foto'
    		}),
    		videoBtn = Ti.UI.createButton({
        		title: 'Tomar Video'
    		});
		win.add(photoBtn);
		win.add(videoBtn);    

	}else{	

		win = Ti.UI.createWindow({
        	title: title,
        	backgroundColor: '#fff'
    	
    	});
    	var imageView = Ti.UI.createImageView({
                image: "assets/images/tab1.png"
            });
            // add the imageView to the window
            win.add(imageView);
     }
    var label = Ti.UI.createLabel({
        text: message,
        color: "#333",
        font: {
            fontSize: 20
        }
    });

    win.add(label);

	//	win.open();	
    
	var tab = Ti.UI.createTab({
        title: title,
        icon: icon,
        window: win
    });
    
    return tab;
}

function showCamera (type, callback) {
    var camera = function () {
        // call Titanium.Media.showCamera and respond callbacks
        Ti.Media.showCamera({
            success: function (e) {
                callback(null, e);
            },
            cancel: function (e) {
                callback(e, null);
            },
            error: function (e) {
                callback(e, null);
            },
            saveToPhotoGallery: true, // save our media to the gallery
            mediaTypes: [ type ]
        });
    };
 
    // check if we already have permissions to capture media
    if (!Ti.Media.hasCameraPermissions()) {
 
        // request permissions to capture media
        Ti.Media.requestCameraPermissions(function (e) {
 
            // success! display the camera
            if (e.success) {
                camera();
 
            // oops! could not obtain required permissions
            } else {
                callback(new Error('could not obtain camera permissions!'), null);
            }
        });
    } else {
        camera();
    }
}
 
photoBtn.addEventListener('click', function () {
 
    // attempt to take a photo with the camera
    showCamera(Ti.Media.MEDIA_TYPE_PHOTO, function (error, result) {
        if (error) {
            alert('could not take photo');
            return;
        }
 
        // validate we taken a photo
        if (result.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
        
           // create an imageView to display our photo
/*            var imageView = Ti.UI.createImageView({
                image: result.media
            });
 
            // add the imageView to the window
            win.add(imageView);*/
        }
    });
});
 
videoBtn.addEventListener('click', function () {
 
    // attempt to capture video with the camera
    showCamera(Ti.Media.MEDIA_TYPE_VIDEO, function (error, result) {
        if (error) {
            alert('could not capture video');
            return;
        }
  
        // validate we taken a video
        if (result.mediaType == Ti.Media.MEDIA_TYPE_VIDEO) {
   
     
            // create a videoPlayer to display our video
    /*        var videoPlayer = Ti.Media.createVideoPlayer({
                url: result.media.nativePath,
                autoplay: true
            });
 
            // add the videoPlayer to the window
            win.add(videoPlayer);
        */
       }
    });
});
 
