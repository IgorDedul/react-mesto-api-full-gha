import React from "react";
import { useContext } from "react";
import Card from "./Card";

import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main({onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDeleteClick}) {

  const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

    return (
      <>
         <main>
            <section className="profile">
              <div className="profile__container">
                <div className="profile__container-avatar">
                  <img 
                    src={avatar} 
                    alt="Фото-аватар" 
                    className="profile__avatar"
                  />
                  <button 
                    onClick={onEditAvatar}
                    className="profile__avatar-edit" 
                    type="button" 
                    aria-label="Редактировать аватар">
                  </button>
                </div>
                <div className="profile__describe">
                  <div className="profile__title-wrapper">
                    <h1 className="profile__title">{name}</h1>
                    <button 
                        onClick={onEditProfile}
                        className="profile__edit-button" 
                        type="button" 
                        aria-label="Редактировать профиль">
                    </button>
                  </div>
                  <p className="profile__subtitle">{about}</p>
                </div>
              </div>
              <button 
                onClick={onAddPlace}
                className="profile__add-button" 
                type="button" 
                aria-label="Добавить профиль">
              </button>
            </section>

            <section className="element">
              <div className ="element__list">
                {cards.map((card) => {
                  return (
                    <Card
                      key={card._id}
                      card={card}
                      onCardClick={onCardClick}
                      onCardLike={onCardLike}
                      onCardDeleteClick={onCardDeleteClick}
                    />
                  );
                })}
              </div>
            </section>  
        </main>
      </>
    );
  };
  
export default Main;