const showInputError = (formEL, inputEL, errorMsg) => {
    const errorMsgEl = document.querySelector(`#${inputEL.id}-error`);
    errorMsgEl.textContent = errorMsg;
};
const hideInputError = (formEL, inputEL) => {
    const errorMsgEl = document.querySelector(`#${inputEL.id}-error`);
    errorMsgEl.textContent = "";
};
const checkInputValidity = (formEl, inputEl) => {
    if (!inputEl.validity.valid) {
        showInputError(formEl, inputEl, inputEl.validationMessage);
      } else {
        hideInputError(formEl, inputEl);
      }
}
const setEventListeners = (formEl) => {
    const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
    const buttonElement = formEl.querySelector(".modal__button");

    // todo handle initial states
    //toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formEl, inputElement);
        //toggleButtonState(inputList, buttonElement);
      });
    });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formEl) => {
    setEventListeners(formEl);
  });
};

enableValidation();
