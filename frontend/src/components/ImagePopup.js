import React from "react";

const ImagePopup = ({ card, onClose }) => {
  return (
    <div className={`popup popup_image ${card.link ? "popup_opened" : ""}`}>
      <div className="popup__content-image">
        <button type="button" className="popup__close-button popup__close-image-button" onClick={onClose}></button>
        <figure className="popup__figure">
          <img className="popup__link-image" src={card.link} alt={card.name}/>
          <figcaption className="popup__name-image">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default ImagePopup;