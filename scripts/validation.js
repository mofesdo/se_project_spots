export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const showInputError = (formEL, inputEL, errorMsg, config) => {
  const errorMsgEl = formEL.querySelector(`#${inputEL.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEL.classList.add(config.inputErrorClass);
};
const hideInputError = (formEL, inputEL, config) => {
  const errorMsgEl = formEL.querySelector(`#${inputEL.id}-error`);
  errorMsgEl.textContent = "";
  inputEL.classList.remove(config.inputErrorClass);
};
const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl, config);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(config.inactiveButtonClass);
  }
};

export const disableButton = (button, config) => {
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
};

//optional
export const resetValidation = (formEl, inputList, config) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input, config);
  });
};
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

export const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(settings);
