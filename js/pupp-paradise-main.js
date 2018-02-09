/*
* Pupp-Paradise NCI project
* Daniela Elisabeth Kepper, Michael O'Shea, Menyhert Palinko
*
* Contains not real-life comments as well for demonstration purposes!
*
* MAIN JS-app
*
* The goal here is to solve generic tasks such as navigation with the help of helper functions written separately.
* The MainApp also contains the generic parameters used throughout the web-page.
*
*/

/*
* Main JS Object for the whole application. Later on it is easily extensible by more third party components. 
* As we include every js file into the same document in this way we can create a "namespace" for our JavaScript code 
* and avoid collisions due to global JS objects. The third party components will not affect the existing code.
* For initializing the home page JQuery is used. It will call pure JavaScript function, which shows how easy to integrate JQuery even if we already have pure JavaScript code.
*/
function PuppParadiseApp() {

	/*
	* Couple of "global" parameters reused in the app
	*/
	this.EMAIL_REGEXP = new RegExp("^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
	this.NAME_REGEXP = new RegExp("(?:^[A-Z][\\'\\-A-Za-z\\.\\s]+\\w$)");
	this.CONTACT_ERROR_DIV_ID = "contactErrorMessage";
	this.CONTACT_SUCCESS_DIV_ID = "contactSuccessMessage";

	//0.85sec
	this.TRANSITION_MILLISEC = 850;

	//0.075sec
	this.DISPLAY_DELAY_MILLISEC = 75;

	//4sec
	this.SUCCESS_MESSAGE_HIDE_MILLISEC = 4000;

	//0.5sec
	this.VALIDATION_DELAY = 760;

	this.INPUT_ERROR_CLASS = "inputError";

	this.ACTIVE_CLASS = "active";

	this.MENU_ITEMS = ["home", "services", "gallery", "contact"];

	this.serverCom = new PuppServerCom(window.location.protocol + "//" + window.location.host);

	/*
	* Sets the main innerHTML according to the given page.
	* @page: The name of the page we want to load without ".html"!
	*/
	this.navigatePageTo = function(page) {

		//console.log("Navigating to " + page);
		var this_ = this;

		this.serverCom.getPageFromServer("/" + page + ".html", function(pageContent) {

			//console.log(pageContent);

			document.getElementById("main").innerHTML = pageContent;
			
			/*
			* Javascript engine will create a new Execution context
			* when we call the setTimeout below, so we need to pass
			* a reference to this.
			*/
			this_.removeActiveClassFromMenuItems();

			//change the highlighted item in the menu
			var activeElement = document.getElementById(page);

			if (activeElement != undefined && activeElement != null) {
				activeElement.classList.add(this_.ACTIVE_CLASS);
			}
			
			if (page == "home") {
			    isHomeMenuActive = true;
			    if (!isSlideShowStarted) {
			        isSlideShowStarted = true;
			        autoSlide();
			    } else {
			        showNextImage();
			    }
			} else {
			    isHomeMenuActive = false;
			}
		});
	}

	this.addInputErrorStyle = function(e) {
		if (!e.classList.contains(this.INPUT_ERROR_CLASS)) {
			e.classList.add(this.INPUT_ERROR_CLASS);
		}
	};

	this.removeInputErrorStyle = function(e) {
		if (e.classList.contains(this.INPUT_ERROR_CLASS)) {
			e.classList.remove(this.INPUT_ERROR_CLASS);
		}
	};

	this.removeActiveClassFromMenuItems = function() {
		for (var i = 0; i < this.MENU_ITEMS.length; i++) {
			document.getElementById(this.MENU_ITEMS[i]).classList.remove(this.ACTIVE_CLASS);
		}
	};
}

var puppParadiseApp = new PuppParadiseApp();

$(document).ready(function(){
    //initialize with the home page
    puppParadiseApp.navigatePageTo("home");
});

/*
* Home page
* slideShow
*/
var index = 0;
var isHomeMenuActive = false;
var isSlideShowStarted = false;

function showNextImage() {
    try {
        var i;
        var x = document.getElementsByClassName("slides");
        for(i=0;i<x.length;i++){
            x[i].style.display = "none";
        }
        index++;
        if(index > x.length){index = 1}
        x[index-1].style.display = "block";
    } catch (e) {
        console.log(e);
    }
}

function autoSlide(){
    if (isHomeMenuActive) {
        showNextImage();
    }
    setTimeout(autoSlide,5000);
}
