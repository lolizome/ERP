function showFeedBack(input, valid, message) {
	let validClass = (valid) ? 'is-valid' : 'is-invalid';
	let div = (valid) ? input.nextAll("div.valid-feedback") : input.nextAll("div.invalid-feedback");
	input.nextAll('div').removeClass('d-block');
	div.removeClass('d-none').addClass('d-block');
	input.removeClass('is-valid is-invalid').addClass(validClass);
	if (message) {
		div.empty();
		div.append(message);
	}
}

function defaultCheckElement(event) {
	this.value = this.value.trim();
	if (!this.checkValidity()) {
		showFeedBack($(this), false);
	} else {
		showFeedBack($(this), true);
	}
}

// Validación del formulario de creación de productos
function newProductValidation(handler) {
	let form = document.forms.fNewProduct;
	$(form).attr('novalidate', true);

	$(form).submit(function (event) {
		let isValid = true;
		let firstInvalidElement = null;

		this.npDescription.value = this.npDescription.value.trim();
		showFeedBack($(this.npDescription), true);

		if (!this.npUrl.checkValidity()) {
			isValid = false;
			showFeedBack($(this.npUrl), false);
			firstInvalidElement = this.npUrl;
		} else {
			showFeedBack($(this.npUrl), true);
		}

		if (!this.npTax.checkValidity()) {
			isValid = false;
			showFeedBack($(this.npTax), false);
			firstInvalidElement = this.npTax;
		} else {
			showFeedBack($(this.npTax), true);
		}

		if (!this.npPrice.checkValidity()) {
			isValid = false;
			showFeedBack($(this.npPrice), false);
			firstInvalidElement = this.npPrice;
		} else {
			showFeedBack($(this.npPrice), true);
		}

		if (!this.npType[0].checkValidity()) {
			isValid = false;
			let container = $('#cType');
			let div = container.find('div.invalid-feedback');
			container.last().find('div').removeClass('d-block');
			div.removeClass('d-none').addClass('d-block');
			$(this).find('input[type="radio"').parent().parent().next().removeClass('is-valid is-invalid').addClass('is-invalid');;
			firstInvalidElement = this.npType[0];
		} else {
			let container = $('#cType');
			let div = container.find('div.valid-feedback');
			container.last().find('div').removeClass('d-block');
			div.removeClass('d-none').addClass('d-block');
			$(this).find('input[type="radio"]').parent().parent().next().removeClass('is-valid is-invalid');
			$(this).find('input[type="radio"]:checked').parent().parent().next().addClass('is-valid');
		}

		if (!this.npBrand.checkValidity()) {
			isValid = false;
			showFeedBack($(this.npBrand), false);
			firstInvalidElement = this.npBrand;
		} else {
			showFeedBack($(this.npBrand), true);
		}

		if (!this.npSerial.checkValidity()) {
			isValid = false;
			showFeedBack($(this.npSerial), false);
			firstInvalidElement = this.npSerial;
		} else {
			showFeedBack($(this.npSerial), true);
		}

		if (!isValid) {
			firstInvalidElement.focus();
		} else {
			handler(this.npSerial.value, this.npBrand.value, this.npDescription.value,
				this.npPrice.value, this.npTax.value, this.npUrl.value);
		}

		event.preventDefault();
		event.stopPropagation();
	});

	form.addEventListener('reset', (function (event) {
		let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
		feedDivs.removeClass('d-block').addClass('d-none');
		let inputs = $(this).find('input, textarea, select, label');
		inputs.removeClass('is-valid is-invalid');
	}));

	$(form.ncTitle).change(defaultCheckElement);
	$(form.ncUrl).change(defaultCheckElement);
}

// Validación del formulario de creación de categorías
function newCategoryValidation(handler) {
	let form = document.forms.fNewCategory;
	$(form).attr('novalidate', true);

	$("#btnEnviar").click((event) => {
		let isValid = true;
		let firstInvalidElement = null;

		ncDescription.value = ncDescription.value.trim();
		showFeedBack($(ncDescription), true);

		if (!ncUrl.checkValidity()) {
			isValid = false;
			showFeedBack($(ncUrl), false);
			firstInvalidElement = ncUrl;
		} else {
			showFeedBack($(ncUrl), true);
		}

		if (!ncTitle.checkValidity()) {
			isValid = false;
			showFeedBack($(ncTitle), false);
			firstInvalidElement = ncTitle;
		} else {
			showFeedBack($(ncTitle), true);
		}

		if (!isValid) {
			firstInvalidElement.focus();
		} else {
			handler(ncTitle.value, ncUrl.value, ncDescription.value);
		}
		event.preventDefault();
		event.stopPropagation();
	});

	form.addEventListener('reset', (function (event) {
		let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
		feedDivs.removeClass('d-block').addClass('d-none');
		let inputs = $(this).find('input');
		inputs.removeClass('is-valid is-invalid');
	}));

	$(form.ncTitle).change(defaultCheckElement);
	$(form.ncUrl).change(defaultCheckElement);
}

// Validación del formulario de creación de tiendas
function newStoreValidation(handler) {
	let form = document.forms.fNewStore;
	$(form).attr('novalidate', true);

	$("#btnEnviar").click((event) => {
		let isValid = true;
		let firstInvalidElement = null;

		if (!ncCif.checkValidity()) {
			isValid = false;
			showFeedBack($(ncCif), false);
			firstInvalidElement = ncCif;
		} else {
			showFeedBack($(ncCif), true);
		}

		if (!ncName.checkValidity()) {
			isValid = false;
			showFeedBack($(ncName), false);
			firstInvalidElement = ncName;
		} else {
			showFeedBack($(ncName), true);
		}

		ncAddress.value = ncAddress.value.trim();
		showFeedBack($(ncAddress), true);

		if (!ncPhone.checkValidity()) {
			isValid = false;
			showFeedBack($(ncPhone), false);
			firstInvalidElement = ncPhone;
		} else {
			showFeedBack($(ncPhone), true);
		}

		ncCoords.value = ncCoords.value.trim();
		showFeedBack($(ncCoords), true);

		if (!isValid) {
			firstInvalidElement.focus();
		} else {
			handler(ncCif.value, ncName.value, ncAddress.value, ncPhone.value, ncCoords.value);
		}
		event.preventDefault();
		event.stopPropagation();
	});

	form.addEventListener('reset', (function (event) {
		let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
		feedDivs.removeClass('d-block').addClass('d-none');
		let inputs = $(this).find('input');
		inputs.removeClass('is-valid is-invalid');
	}));

	$(form.ncTitle).change(defaultCheckElement);
	$(form.ncUrl).change(defaultCheckElement);
}

export {
	showFeedBack,
	defaultCheckElement,
	newProductValidation,
	newCategoryValidation,
	newStoreValidation
};
