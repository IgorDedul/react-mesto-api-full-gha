import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(card) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(user => user._id === currentUser._id);

  function handleCardClick() {
    card.onCardClick(card);
  }

  function handleLikeClick() {
    card.onCardLike(card);
  }

  function handleDeleteClick() {
    card.onCardDelete(card);
  }

  return (
    <li className="cards__card">
      <img className="cards__img link" src={card.link} alt="Изображение из карточки" onClick={handleCardClick} />
      {isOwn ? (<button className="cards__basket link" type="button" onClick={handleDeleteClick}></button>) : ''}
      <div className="cards__container">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__like-container">
          <button className={`cards__like-icon link ${isLiked ? `cards__like-icon_active` : ``}`} type="button" onClick={handleLikeClick}></button>
          <span className="cards__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
