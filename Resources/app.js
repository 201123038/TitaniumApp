/**
 * Create a new `Ti.UI.TabGroup`.
 */
var tabGroup = Ti.UI.createTabGroup();
var win;

	tabGroup.addTab(createTab("Inicio", "Inicio", ""));
	tabGroup.addTab(createTab("", "PaperNews", "assets/images/paper.png"));
	tabGroup.addTab(createTab("", "Camara", "assets/images/camara.png"));
	tabGroup.addTab(createTab("", "Galeria", "assets/images/galeria.png"));
	


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
	if(message=="Inicio"){
		
		//pestaña principal
		win = Ti.UI.createWindow({
        	title: title,
        	backgroundImage: "assets/images/background.png",
        	backgroundColor: '#fff'
        }),
        label1 = Ti.UI.createLabel({
        text: "Titanium APP",
        Top:	5,
        left:	20,
  		color: "#333",
        font: {
            fontSize: 60
        }});
        		  
        win.add(label1);
	    

		//pestaña de Camara
	} else if(message=="Camara"){
		
		win = Ti.UI.createWindow({
	        	layout: 'vertical',
	           	backgroundImage: "assets/images/background.png",
			   	backgroundColor: '#fff'
	    	}),
	    	photoBtn = Ti.UI.createButton({
	        	title: 'Tomar Foto',
	        	display: 'block',
	        	top:	30,
   				height: 100,
	        	width: 300
    		}),
    		videoBtn = Ti.UI.createButton({
        		title: 'Tomar Video',
	        	display: 'block',
        		top: 80,
   				width: 300,
   				height: 100
    		});
		win.add(photoBtn);
		win.add(videoBtn);    

	}else if(message=="Galeria"){		
		win = Ti.UI.createWindow({
	        	layout: 'vertical',
	           	backgroundImage: "assets/images/background.png",
	        	backgroundColor: '#fff'
	    	}),
	    	imageBtn = Ti.UI.createButton({
	        	title: 'Ver Galeria',
	        	display: 'block',
	        	top:	100,
   				height: 100,
	        	width: 300
    		}),
		
		win.add(imageBtn);	
		
	}else{
		
		
		//pestaña de noticias
		win = Ti.UI.createWindow({
	        layout: 'vertical',
        	backgroundColor: '#fff',
           	backgroundImage: "assets/images/background.png",    	
    	}),
    	imageView1 = Ti.UI.createImageView({
                image: "assets/images/n4.jpg",
            	title:	"Noticia 1",
   				width: 200,
   				height: 150
        }),
        imageView2 = Ti.UI.createImageView({
                image: "assets/images/n3.jpg",
            	title:	"Noticia 2",
            	Top:	200,
            	width: 200,
   				height: 150
        }),
        imageView3 = Ti.UI.createImageView({
                image: "assets/images/n2.jpg",
            	title:	"Noticia 3",
            	Top:	400,
            	width: 	200,
   				height: 150
        });
            win.add(imageView1);
            win.add(imageView2);
            win.add(imageView3);
          
     }

	//	win.open();	
    
	var tab = Ti.UI.createTab({
        title: title,
        icon: icon,
        window: win
    });

	win.setTitle("Titanium App");
	
	
    return tab;
}

function showCamera (type, callback) {
    var camera = function () {
        // se llama Titanium.Media.showCamera & respond callbacks
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
            saveToPhotoGallery: true, // se guarda en la galeria
            mediaTypes: [ type ]
        });
    };
 
    // Se verifican los permisos
    if (!Ti.Media.hasCameraPermissions()) {
 
        // solicita los permisos 
        Ti.Media.requestCameraPermissions(function (e) {
 
            // se muestra la camara
            if (e.success) {
                camera();
 
            // No se permitio acceso a la camara
            } else {
                callback(new Error('No se obtuvieron los permisos para la camara'), null);
            }
        });
    } else {
        camera();
    }
}
 
photoBtn.addEventListener('click', function () {
 
    // Intenta tomar una foto
    showCamera(Ti.Media.MEDIA_TYPE_PHOTO, function (error, result) {
        if (error) {
            alert('No se pudo tomar la foto');
            return;
        }
 
        // se valida que se tomo una foto
        if (result.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
    	    
			alert('Fotografía guardada exitosamente !');
		}
    	
    });

	});
 
videoBtn.addEventListener('click', function () {
 
    // Intento de tomar videl
    showCamera(Ti.Media.MEDIA_TYPE_VIDEO, function (error, result) {
        if (error) {
            alert('No se pudo capturar el video');
            return;
        }
  
        // valida que se tomo video
        if (result.mediaType == Ti.Media.MEDIA_TYPE_VIDEO) {
			alert('Video guardado exitosamente !');   
       }
    });
});

imageView1.addEventListener('click', function (e) {
		var url="https://elperiodico.com.gt/mundo/2018/03/22/que-pasa-con-los-datos-en-la-red/";
		if (e) {
            alert('No se puede abrir la ruta  \n'+url);
            
        }else{
			win.open(url , "Noticia1" , "width=120,height=300,scrollbars=YES"); 			
		}
});

imageView2.addEventListener('click', function (e) {
		var url="https://elperiodico.com.gt/inversion/2018/03/21/telefonica-presenta-plataforma-para-emprendedores/";
		if (e) {
            alert('No se puede abrir la ruta  \n'+url);
            
        }else{
			win.open(url , "Noticia2" , "width=120,height=300,scrollbars=YES"); 			
		}
});

imageView3.addEventListener('click', function (e) {
		var url="https://elperiodico.com.gt/accion/2018/03/11/rojos-golean-a-petapa-y-sanarate-es-lider/";
		if (e) {
            alert('No se puede abrir la ruta  \n'+url);
            
        }else{
			win.open(url , "Noticia3" , "width=120,height=300,scrollbars=YES"); 			
		}
});


 imageBtn.addEventListener('click', function(){
    Ti.Media.openPhotoGallery({
        mediaTypes: [ Titanium.Media.MEDIA_TYPE_PHOTO ],
        success: function (e) {
            alert('media.width: ' + e.media.width
                + '\nmedia.height: ' + e.media.height
                + '\nmedia.length: ' + e.media.length
                + '\nmedia.mimeType: ' + e.media.mimeType
                + '\nmedia.nativePath: ' + e.media.nativePath);
        },
        error: function (e) {
            alert('error abriendo imagen: ' + e);
        }
    });
});
 