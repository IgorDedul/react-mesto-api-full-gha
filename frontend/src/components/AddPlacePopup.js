import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      title,
      link,
    });
  }

  return (
    <PopupWithForm title="Новое место" name="card" buttonText="Создать" onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit} >
      <input onChange={handleTitleChange} value={title} id="title-input" className="popup__input popup__input_type_title" type="text" name="title" placeholder="Название" minLength="2" maxLength="30" required />
      <span className="popup__input-error title-input-error"></span>
      <input onChange={handleLinkChange} value={link} id="link-input" className="popup__input popup__input_type_link" type="url" name="link" placeholder="Ссылка на картинку" required />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup ;
