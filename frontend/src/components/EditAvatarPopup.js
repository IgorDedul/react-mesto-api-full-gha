import React from "react";
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, onLoading}) => {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      } 

    return (
        <PopupWithForm name="form-avatar" title="Обновить аватар" buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={onLoading}>
            <label className="popup__field">
                <input 
                id="avatar-input"
                autoComplete="off"
                type="url"
                name="avatarLink"
                className="popup__input popup__url-input-avatar"
                placeholder="Ссылка на картинку"
                ref={avatarRef}
                required
                />
                <span id="avatar-input-error" className="popup__input-error"/>
            </label>
        </PopupWithForm>
    )
};

export default EditAvatarPopup;