import React from 'react';
import { SelectedCardContext } from '../contexts/SelectedCardContext';

function ImagePopup(props) {
  const selectedCard = React.useContext(SelectedCardContext);

  function handlePopupMouseDown(event) {
    if (event.target === event.currentTarget || event.target.classList.contains('popup__close')) {
      props.onClose();
    }
  }

  return (
    <div className={`popup popup_type_image popup_background_dark-light ${(Object.entries(selectedCard).length) ? 'popup_opened' : ''}`} onMouseDown={handlePopupMouseDown}>
      <div className="popup__container-img">
        <button className="popup__close link" type="button"></button>
        <img className="popup__img" src={selectedCard.link} alt="Изображение из карточки" />
        <h3 className="popup__title-img">{selectedCard.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
