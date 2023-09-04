import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description , setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm title="Редактировать профиль" name="profile" buttonText="Сохранить" onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit}>
      <input onChange={handleNameChange} value={name} id="name-input" className="popup__input popup__input_type_name" type="text" name="name" placeholder="Имя" minLength="2" maxLength="40" required />
      <span className="popup__input-error name-input-error"></span>
      <input onChange={handleDescriptionChange} value={description} id="work-input" className="popup__input popup__input_type_work" type="text" name="about" placeholder="Род деятельности" minLength="2" maxLength="200" required />
      <span className="popup__input-error work-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
