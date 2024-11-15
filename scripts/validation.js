const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}

const showInputError = (formEL, inputEL, errorMsg) => {
    const errorMsgEl = formEL.querySelector(`#${inputEL.id}-error`);
    errorMsgEl.textContent = errorMsg;
    inputEL.classList.add("modal__input_type_error");
};
const hideInputError = (formEL, inputEL) => {
    const errorMsgEl = formEL.querySelector(`#${inputEL.id}-error`);
    errorMsgEl.textContent = "";
    inputEL.classList.remove("modal__input_type_error");
};
const checkInputValidity = (formEl, inputEl) => {
    if (!inputEl.validity.valid) {
        showInputError(formEl, inputEl, inputEl.validationMessage);
      } else {
        hideInputError(formEl, inputEl);
      }
}
const hasInvalidInput = (inputList) => {
  return inputList.some((input) =>{
    return !input.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonEl) => {
  if(hasInvalidInput(inputList)){
    disableButton(buttonEl);
    //add a modifier class to the buttonEl to make it grey
    //dont forget the css
  }
  else{
    buttonEl.disabled = false;
    //remove the disabled class
  }
};

const disableButton = (button) => {
  button.disabled = true;
};

//optional
const resetValidation = (formEl, inputList) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input);
  })
};
//todo use the settings object in all functions instead of hard-coded strings
const setEventListeners = (formEl, config) => {
    const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
    const buttonElement = formEl.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formEl, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(settings);
