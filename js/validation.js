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

function defaultCheckElement (event) {
  this.value = this.value.trim();
  if (!this.checkValidity()) {
    showFeedBack($(this), false);
  } else {
    showFeedBack($(this), true);
  }
}

// Validación del formulario de creación de productos
function newProductValidation(handler) {

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

    if (!ncUrl.checkValidity()){
      isValid = false;
      showFeedBack($(ncUrl), false);
      firstInvalidElement = ncUrl;
    } else {
      showFeedBack($(ncUrl), true);
    }

    if (!ncTitle.checkValidity()){
      isValid = false;
      showFeedBack($(ncTitle), false);
      firstInvalidElement = ncTitle;
    } else {
      showFeedBack($(ncTitle), true);
    }

    if (!isValid){
      firstInvalidElement.focus();
    } else {
      handler(ncTitle.value, ncUrl.value, ncDescription.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener('reset', (function(event){
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

    if (!ncCif.checkValidity()){
      isValid = false;
      showFeedBack($(ncCif), false);
      firstInvalidElement = ncCif;
    } else {
      showFeedBack($(ncCif), true);
    }

    if (!ncName.checkValidity()){
      isValid = false;
      showFeedBack($(ncName), false);
      firstInvalidElement = ncName;
    } else {
      showFeedBack($(ncName), true);
    }

		ncAddress.value = ncAddress.value.trim();
    showFeedBack($(ncAddress), true);

		if (!ncPhone.checkValidity()){
      isValid = false;
      showFeedBack($(ncPhone), false);
      firstInvalidElement = ncPhone;
    } else {
      showFeedBack($(ncPhone), true);
    }

		ncCoords.value = ncCoords.value.trim();
    showFeedBack($(ncCoords), true);

    if (!isValid){
      firstInvalidElement.focus();
    } else {
      handler(ncCif.value, ncName.value, ncAddress.value, ncPhone.value, ncCoords.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener('reset', (function(event){
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
