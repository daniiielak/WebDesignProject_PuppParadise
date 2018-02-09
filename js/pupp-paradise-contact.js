/*
* Pupp-Paradise NCI project
* Daniela Elisabeth Kepper, Michael O'Shea, Menyhert Palinko
*
* Contains not real-life comments as well for demonstration purposes!
*
* CONTACT PAGE JS METHODS
*
* The goal here is to solve the validation (including animation etc.) without any third party component
* in order to demonstrate the pure-JavaScript skills
*
*/

puppParadiseApp.contactNameValid = null;
puppParadiseApp.contactEmailValid = null;
puppParadiseApp.contactMessageValid = null;
puppParadiseApp.contactNameTimeout = null;
puppParadiseApp.contactEmailTimeout = null;
puppParadiseApp.contactMessageTimeout = null;

puppParadiseApp.submitContactForm = function() {

    //perform validation before submit
	if (!this.validateContactName() || !this.validateContactEmail() || !this.validateContactMessage()) {
		return;
	}

	//there is no error
	this.hideErrorMessage();
	this.displaySuccessMessage("The message has been successfully sent to us. We will reply soon.");
	this.clearContactForm();
	window.scrollTo(0, 0);
};

/*
* Formal validation on contact name
* At least a firstname is mandatory
*/
puppParadiseApp.validateContactName = function() {

	var nameInput = document.contactForm.name;
	var name = nameInput.value;

	if (name == undefined || name == null || name == "") {

		this.displayErrorMessage("Entering name is mandatory");
		this.addInputErrorStyle(nameInput);
		return false;

	} else {

		if (!this.NAME_REGEXP.test(name)) {

			this.displayErrorMessage("Please enter valid name");
			this.addInputErrorStyle(nameInput);
			return false;

		} else {

			this.removeInputErrorStyle(nameInput);
			return true;
		}
	}
};

puppParadiseApp.formReqNameValidation = function() {

	var this_ = this;
	clearTimeout(this.contactNameTimeout);

	this.contactNameTimeout = setTimeout(function() {

        this_.contactNameValid = this_.validateContactName();

		if (this_.contactNameValid && (this_.contactEmailValid === null || this_.contactEmailValid === true)
			&& (this_.contactMessageValid === null || this_.contactMessageValid === true)) {

			this_.hideErrorMessage();

		} else if (this_.contactNameValid && this_.contactEmailValid === false) {

			this_.validateContactEmail();

		} else if (this_.contactNameValid && this_.contactMessageValid === false) {

			this_.validateContactMessage();
		}
    }, this.VALIDATION_DELAY);
};

/*
* Formal validation on contact email address
* Email is mandatory
*/
puppParadiseApp.validateContactEmail = function() {

	var emailInput = document.contactForm.email;
	var email = emailInput.value;

	if (email == undefined || email == null || email == "") {

		this.displayErrorMessage("Entering email is mandatory");
		this.addInputErrorStyle(emailInput);
		return false;

	} else {

		if (!this.EMAIL_REGEXP.test(email)) {

			this.displayErrorMessage("Please enter valid email");
			this.addInputErrorStyle(emailInput);
			return false;

		} else {

			this.removeInputErrorStyle(emailInput);
			return true;
		}
	}
};

puppParadiseApp.formReqEmailValidation = function() {

	var this_ = this;
	clearTimeout(this.contactEmailTimeout);

	this.contactEmailTimeout = setTimeout(function() {

		this_.contactEmailValid = this_.validateContactEmail();

		if (this_.contactEmailValid && (this_.contactNameValid === null || this_.contactNameValid === true)
			&& (this_.contactMessageValid === null || this_.contactMessageValid === true)) {

			this_.hideErrorMessage();

		} else if (this_.contactEmailValid && this_.contactNameValid === false) {

			this_.validateContactName();

		} else if (this_.contactEmailValid && this_.contactMessageValid === false) {

			this_.validateContactMessage();
		}

	}, this.VALIDATION_DELAY);
};

/*
* Formal validation on the message
* It should not be empty as it is mandatory
*/
puppParadiseApp.validateContactMessage = function() {

	var textInput = document.contactForm.text;
	var text = textInput.value;

	if (text == "" || text == undefined || text == null) {

		this.displayErrorMessage("Entering message is mandatory");
		this.addInputErrorStyle(textInput);
		return false;

	} else {

		this.removeInputErrorStyle(textInput);
		return true;
	}
};

puppParadiseApp.formReqMessageValidation = function() {

	var this_ = this;
	clearTimeout(this.contactMessageTimeout);

	this.contactMessageTimeout = setTimeout(function() {

	this_.contactMessageValid = this_.validateContactMessage();

		if (this_.contactMessageValid && (this_.contactNameValid === null || this_.contactNameValid === true)
			&& (this_.contactEmailValid === null || this_.contactEmailValid === true)) {

			this_.hideErrorMessage();

		} else if (this_.contactMessageValid && this_.contactNameValid === false) {

			this_.validateContactName();

		} else if (this_.contactMessageValid && this_.contactEmailValid === false) {

			this_.validateContactEmail();
		}
	}, this.VALIDATION_DELAY);
};

puppParadiseApp.displayErrorMessage = function(message) {

	var errorMessageDiv = this.findErrorMessageDiv();
	errorMessageDiv.style.display = 'block';
	setTimeout(function() {
		errorMessageDiv.style.opacity = 1;
	}, this.DISPLAY_DELAY_MILLISEC);
	errorMessageDiv.innerHTML = message;
};

puppParadiseApp.hideErrorMessage = function() {

	var errorMessageDiv = this.findErrorMessageDiv();
	errorMessageDiv.style.opacity = 0;
	setTimeout(function() {
		errorMessageDiv.innerHTML = "";
		errorMessageDiv.style.display = 'none';
	}, this.TRANSITION_MILLISEC);
};

puppParadiseApp.displaySuccessMessage = function(message) {

	var successMessageDiv = this.findSuccessMessageDiv();
	successMessageDiv.style.display = 'block';
	successMessageDiv.innerHTML = message;
	setTimeout(function() {
		successMessageDiv.style.opacity = 1;
	}, this.DISPLAY_DELAY_MILLISEC);

	/*
	* Javascript engine will create a new Execution context
	* when we call the setTimeout below, so we need to pass
	* a reference to this.
	*/
	var this_ = this;
	setTimeout(function() {
		this_.hideSuccessMessage();
	}, this.SUCCESS_MESSAGE_HIDE_MILLISEC);
};

puppParadiseApp.hideSuccessMessage = function() {

	var successMessageDiv = this.findSuccessMessageDiv();
	successMessageDiv.style.opacity = 0;
	setTimeout(function() {
		successMessageDiv.innerHTML = "";
		successMessageDiv.style.display = 'none';
	}, this.TRANSITION_MILLISEC);
};

puppParadiseApp.findErrorMessageDiv = function() {
	return document.getElementById(this.CONTACT_ERROR_DIV_ID);
};

puppParadiseApp.findSuccessMessageDiv = function() {
	return document.getElementById(this.CONTACT_SUCCESS_DIV_ID);
};

puppParadiseApp.clearContactForm = function() {

	document.contactForm.name.value = "";
	document.contactForm.email.value = "";
	document.contactForm.text.value = "";
};
