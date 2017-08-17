//regex function for getting param from URL...

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
	// var name =getParameterByName('name');
	// var user_id =getParameterByName('user');
	// var email =getParameterByName('email');
	// var fbpic = getParameterByName('fbpic');
	// var fname = getParameterByName('fname');
	// var pass = getParameterByName('password');
	// var img = getParameterByName('image');
	// var address = getParameterByName('address');
	// var city = getParameterByName('city');
	// var country = getParameterByName('country');
	// var contact = getParameterByName('contact');
	// var code = getParameterByName('code');
	

//END REGEX HERE

//checking for existing email if not sending verification at current email


function signup(){
             var  fname = $("#fullname").val(); 
             var email = $("#sign_email").val();
             var pass = $("#sign_pass").val();
			 var confirm_password = $("#con_pass").val();
			 var city  = $("#city").val();
			 var country  = $("#country").val();
			  var contact = $("#contact").val();
			  
			
			 var dataString = "fname="+ fname + "&email=" + email + "&password=" + pass + "&contact=" + contact +"&country=" + country + "&city=" + city;
			//alert(dataString);
			  if ($.trim(fname).length > 0 && $.trim(email).length > 0 && $.trim(pass).length > 0 && $.trim(confirm_password).length > 0 && $.trim(contact).length > 0  && $.trim(city).length > 0 && $.trim(country).length > 0) {
				  if( pass == confirm_password){
              
                 $.ajax({
                    url: "http://kppreventsmarketing.com/webservices/verifyemail.php",
                    type: "POST",
                    data: {email: email},
                    success: function(data){
					var str= data;	
					
				if(str.Status == "exist")
				{ alert("Email already exist, Try Again");}	
				else{
			   alert("Email has been sent to " + email );
			    window.location.href = "verifyaccount.html?"+dataString+"&code="+str.Status+"";
			}
			
	   
                    }
				  });  }
					else { alert("Confirm password donot match");}
         }
		 else { alert("Please Fill in all fields");}		 
        };
		
		
//verifycode

	function verifycode(){
           
			  var fname = getParameterByName('fname');
				var pass = getParameterByName('password');
				// var image = getParameterByName('image');
				// var address = getParameterByName('address');
				var city = getParameterByName('city');
				var country = getParameterByName('country');
				var contact = getParameterByName('contact');
				var ucode = getParameterByName('code');
				var email =getParameterByName('email');
			 var code = $("#code").val();
			 var dataString = "fname="+ fname + "&email=" + email + "&password=" + pass + "&contact=" + contact +"&country=" + country + "&city=" + city;
			  if ($.trim(email).length > 0 && $.trim(code).length > 0) {
                   
					if( code == ucode){
				  $.ajax({
                    url: "http://kppreventsmarketing.com/webservices/register.php",
                    type: "POST",
                    data: dataString,
					// {fname: fname, email: email,password:password , image: image , address : address , city : city , country :country , contact : contact},
                    success: function(data){
					var str= data;	
					
			if(str.Status == "success"){
			  // alert("You're now registered, " + fname );
			   window.location.href = "imageupload.html?email="+email+"";
			}
			if(str.Status == "exist")
			{alert("Email already Exist, Try again");
			}
			
                        
                    }
                    });   
                } else {alert("Invalid Code");}
         }
		 else { alert("Please Enter Code");}		 
        };		
//sign in
function signin(){
              
             var email = $("#email").val();
             var pass = $("#password").val();
			 
			
			 var dataString = "&email=" + email + "&pass=" + pass;
			  if ($.trim(email).length > 0 && $.trim(pass).length > 0) {
			  // loadshow();
                    $.ajax({
                    url: "http://kppreventsmarketing.com/webservices/login.php",
                    type: "POST",
                    data: {email: email,pass:pass},
                    success: function(data){
					// loadhide();
					var str= data;	
			if(data.Status == "success"){
			// alert("Welcome, "+ str.username);
			   window.location.href = "events.html?user="+str.id+"&email="+email+"&fbpic="+str.image+"";
			}
			else{
				alert("Email or Password Incorrect : Please Retry");
				window.location.href = "login.html";
			    }
                        
                    }
                    });   
                
         }
		 else { alert("Please Fill in all fields");}		 
        };		
		
//uploading image 		
	
		function takephoto()
{
navigator.camera.getPicture(uploadPhoto, onFail, { 
quality: 40, 
correctOrientation : true,
saveToPhotoAlbum: true,
destinationType: Camera.DestinationType.FILE_URL
});
}
function uploadFromGallery() {

    // Retrieve image file location from specified source
    navigator.camera.getPicture(uploadPhoto,
                                function(message) { alert('get picture failed'); },
                                { quality: 40, 
								correctOrientation : true,
                                destinationType: navigator.camera.DestinationType.FILE_URI,
                                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
                                );

}
function onFail(message) {
alert('Failed because: ' + message);
}

function uploadPhoto(imageURI) {
	 // loadshow();
    var options = new FileUploadOptions();
    options.fileKey="file";
    // options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
	 mystring = imageURI.substr(imageURI.lastIndexOf('/')+1); 
var newchar = '1';
mystring = mystring.split('?').join(newchar);
	options.fileName=mystring;
    options.mimeType="image/jpeg";
    imagesrc = imageURI;
	document.getElementById("userimg").src = imagesrc;
	// alert("save "+imagesrc);
	 var email =getParameterByName('email');
	
    var params = new Object();
    options.params = params;
	 options.chunkedMode = false;
    var ft = new FileTransfer();
	// alert(imageURI);
    ft.upload(imageURI, encodeURI("http://kppreventsmarketing.com/webservices/ProfilePhotoUpload.php?email="+email+""), win, fail, options);
}

function win(r) {
	 // loadhide();
	// regshow();
	alert("An upload: Code = " + r.response);
    // alert("Code = " + r.responseCode);
    // alert("Response = " + r.response);
    // alert("Sent = " + r.bytesSent);
}

function fail(error) {
	 // loadhide();
    // alert("Check Internet connection = " + error.code);
	 alert("Check Internet connection");
    // alert("upload error source " + error.source);
    // alert("upload error target " + error.target);
}

function upload()
{ window.location = "login.html";
}

// end uploading
				