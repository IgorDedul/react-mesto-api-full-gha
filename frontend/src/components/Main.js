import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import backgroundPath from '../images/Black-Background.jpg';


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container-avatar">
          <img className="profile__avatar" src={currentUser.avatar || backgroundPath} alt="Фотография профиля" />
          <button className="profile__avatar-edit-button link" onClick={props.onEditAvatar} type="button" name="avatar-edit-button"></button>
          <div className="profile__info">
            <div className="profile__container-name">
              <h1 className="profile__name">{currentUser.name || 'Имя'}</h1>
              <button className="profile__edit-button link" onClick={props.onEditProfile} type="button" name="edit-button"></button>
            </div>
            <p className="profile__work">{currentUser.about || 'О себе'}</p>
          </div>
        </div>
        <button className="profile__add-button link" onClick={props.onAddPlace} type="button"></button>
      </section>
      <section className="places" aria-label="Места">
        <ul className="cards">
          {props.cards.map((cardData) => {
            return (
              <Card key={cardData._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} {...cardData} />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
