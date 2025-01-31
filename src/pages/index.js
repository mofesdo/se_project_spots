//138fe482-aa90-46db-b20b-613bcdba9e47
import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

// Import the image
import logo from "../images/logo.svg";
import avatar from "../images/avatar.jpg";

// Select the element and set the src
const headerLogo = document.getElementById("header__logo");
headerLogo.src = logo;

const profileAvatar = document.getElementById("profile__avatar");
let selectedCard;
let selectedCardId;

// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "138fe482-aa90-46db-b20b-613bcdba9e47",
    "Content-Type": "application/json",
  },
});
//destructure the second item in the callback of the .then()
  api
    .getAppInfo()
    .then(([cards, users]) =>{
      console.log(cards);
      console.log(users);
      cards.forEach((item) => {
        const cardElement = getCardElement(item);
        cardsList.prepend(cardElement);
      });

      //handle the users information
      //set the src of avatar img
      profileAvatar.src = users.avatar;
      //set textContent of both the text elements
      document.querySelector(".profile__name").textContent = users.name;
      document.querySelector(".profile__description").textContent = users.about;
      
    })

//Profile Elements
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const cardModalBtn = document.querySelector(".profile__add-btn");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");

//Avatar Modal
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

//Delete Form Elements
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");


//Edit Profile Modal
const editModal = document.querySelector("#edit-profile-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

//Add Card Modal
const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardSubmitBtn = cardModal.querySelector(".modal__submit-btn");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");

//Preview Card Modal
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalTitleEl = previewModal.querySelector(".modal__title");
const previewModalCloseEl = previewModal.querySelector(".modal__close-btn");

const cardTemplate = document.querySelector("#card__template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  //TODO if the card is liked. set the active class on the card;
  if(data.isLiked == true){
    cardLikeBtn.classList.add("card__like-btn_liked");
  }

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLikeBtn.addEventListener("click", (evt) => handleLike(evt, data._id));
  cardDeleteBtn.addEventListener("click", (evt)=> handleDeleteCard(cardElement, data._id));
  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalTitleEl.textContent = data.name;
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
  });

  return cardElement;
}
function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("click", closeModalByOverlay);
  document.addEventListener("keydown", closeModalByEsc);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", closeModalByOverlay);
  document.removeEventListener("keydown", closeModalByEsc);
}
function closeModalByOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}
function closeModalByEsc(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closeModal(modalOpened);
  }
}
function handleEditFormSubmit(evt) {
  // Prevent default browser behavior
  evt.preventDefault();
  api
    .editUserInfo({name: editModalNameInput.value, about: editModalDescriptionInput.value})
    .then((data)=>{
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editModal);
    })
    .catch((err)=> console.log(err));
}
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  api
    .addCard({name: cardNameInput.value, link: cardLinkInput.value})
    .then((data)=>{
      const cardEl = getCardElement(data);
      //prepend or append? Personally i like append but I'll keep as is
      cardsList.prepend(cardEl);
      evt.target.reset();
      disableButton(cardSubmitBtn, settings);
      closeModal(cardModal);
    })
    .catch((err)=> console.log(err));
}
function handleDeleteCard(cardElement, cardId){
    selectedCard = cardElement;
    selectedCardId = cardId;
    openModal(deleteModal);
}
function handleLike(evt, cardId){
  const isLiked = evt.target.classList.contains("card__like-btn_liked");
  api
    .toggleLike(cardId, isLiked)
    .then((data)=>{
      evt.target.classList.toggle("card__like-btn_liked");
    })
    .catch((err)=> console.log(err));
}

// The submission handler makes use of the selectedCard and selectedCardId
// variables to target the correct card.
function handleDeleteSubmit(evt){
  evt.preventDefault();
  api
    .deleteCard(selectedCardId) // pass the ID the the api function
    .then(() => {
      // remove the card from the DOM and then close modal
      selectedCard.remove();
      closeModal(deleteModal);
      
    })
    .catch(console.error);
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  api.editAvatarInfo(avatarInput.value)
    .then((data)=>{
      profileAvatar.src = data.avatar;
    })
    .catch((err)=> console.log(err));
}

profileEditBtn.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(
    editFormElement,
    [editModalNameInput, editModalDescriptionInput],
    settings
  );
  openModal(editModal);
});
editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});
cardModalBtn.addEventListener("click", () => {
  openModal(cardModal);
});
cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});
previewModalCloseEl.addEventListener("click", () => {
  closeModal(previewModal);
});

avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});
avatarModalCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);
avatarForm.addEventListener("submit", handleAvatarSubmit);
deleteForm.addEventListener("submit", handleDeleteSubmit);

enableValidation(settings);
