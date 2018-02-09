/*
* Pupp-Paradise NCI project
* Daniela Elisabeth Kepper, Michael O'Shea, Menyhert Palinko
*
* Contains not real-life comments as well for demonstration purposes!
*
* Server Communication Helper JS-app
*
* The goal here is to solve the server communication as efficiently as possible with the help of AJAX 
* and also demonstrate pure JavaScript skills, therefore there is no third party component used here.
* The methods encapsulates the code used for communicating the server in order to be highly reusable.
*
*/
function PuppServerCom(page_url) {

	this.pageUrl = page_url;

	this.XMLHTTP_VERSIONS = [
		"Microsoft.XmlHttp",
		"MSXML2.XmlHttp.5.0", 
		"MSXML2.XmlHttp.4.0",
		"MSXML2.XmlHttp.3.0", 
		"MSXML2.XmlHttp.2.0"
	];

	/*
	* Returns with the available XMLHttpRequest object we need for the asynchronous server call.
	* Supports multiple browsers
	*/
	this.getXHR = function() {

		if(typeof XMLHttpRequest != undefined) { 

			return new XMLHttpRequest();

		} else {

			var vLength = this.XMLHTTP_VERSIONS.length;

			for(var i = 0; i < vLength; i++) {

				try {

					var xmlHTTP = new ActiveXObject(this.XMLHTTP_VERSIONS[i]);
					return xmlHTTP;

				} catch(e) {
					console.log(e);
				}
         	} 
     	}

     	return null;
	}

	/*
	* Asynchronous server call.
	* @relativePath: the name of the .html file we want to get from the server.
	* @callBack: out callBack function, which will be called when the page successfully loaded from the server.
	*/
	this.getPageFromServer = function(relativePath, callBack) {

		var xmlHTTP = this.getXHR();

     	xmlHTTP.onreadystatechange = function() {

     		if(xmlHTTP.status === 200 && xmlHTTP.readyState === 4) {
     			callBack(xmlHTTP.responseText == undefined ? xmlHTTP.response : xmlHTTP.responseText);
     		}      
    	}

    	var serverURL = this.pageUrl.endsWith("/") ? this.pageUrl : this.pageUrl + "/";
    	xmlHTTP.open('GET', serverURL + relativePath, true);
    	xmlHTTP.send('');
	}
}
