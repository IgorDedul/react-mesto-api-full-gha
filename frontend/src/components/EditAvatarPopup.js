import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarInputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  }

  return (
    <PopupWithForm title="Обновить аватар" name="avatar" buttonText="Сохранить" onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit}>
      <input ref={avatarInputRef} id="avatar-link-input" className="popup__input popup__input_type_link" type="url" name="avatar" placeholder="Ссылка на аватар" required />
      <span className="popup__input-error avatar-link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
