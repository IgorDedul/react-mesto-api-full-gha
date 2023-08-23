import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, onLoading}) => {
  
    const name = React.useRef('');
    const link = React.useRef('');

    const handleSubmit = (event) => {
        event.preventDefault();

        onAddPlace({
            name: name.current.value,
            link: link.current.value
        });   
    };


    return (
        <PopupWithForm name="add-element" title="Новое место" buttonText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={onLoading}>
        <label className="popup__field">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            className="popup__input popup__place-input"
            ref={name}
            required
          />
        <span id="title-error" className="popup__input-error"></span>
        </label>
        <label className="popup__field">  
          <input
            type="url"
            name="link"
            id="link"
            placeholder="Ссылка на картинку"
            className="popup__input popup__url-input"
            ref={link}
            required
          />
        <span id="link-error" className="popup__input-error"></span>
        </label>
      </PopupWithForm>
    )
};

export default AddPlacePopup;