import React from 'react';
import checkMark from '../images/black-check-mark-in-circle.svg';
import cross from '../images/red-cross-in-circle.svg';

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  function handleMouseDown(event) {
    if (event.target === event.currentTarget || event.target.classList.contains('popup__close')) {
      onClose();
    }
  }

  return (
    <div onMouseDown={handleMouseDown} className={`popup popup_type_info-tooltip popup_background_dark-light ${(isOpen) ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_info-tooltip">
        <button className="popup__close link" type="button" />
        <img className="popup__icon" src={isSuccess ? checkMark : cross} alt="Иконка подсказки" />
        <h3 className="popup__title popup__title_type_info-tooltip">
          {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
