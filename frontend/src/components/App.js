import React from "react";
//Работа выполнена на 5.3.0 роуте, т.к. 6-ой постоянно выдавал ошибки по дочернему useNavigate вне Route
import { Route, Switch, useHistory } from 'react-router-dom';

import * as auth from "../utils/auth";
import api from "../utils/Api";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = React.useState(false);
  const [authorizationEmail, setAuthorizationEmail] = React.useState('');

  const history = useHistory();

  //Получение данных данных пользователя и карточек
  React.useEffect(() => {
    if (isLoggedIn) {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, userData]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch(console.error);
}}, [isLoggedIn]);
  
 /** 
  React.useEffect(() => {
    if (isLoggedIn) {
      api.getUserInfo()
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err.status}`);
        });
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn) {
      api.getInitialCards()
        .then((data) => {
          setCards(data.reverse());
        })
        .catch((err) => {
          console.log(`Ошибка: ${err.status}`);
        });
    }
  }, [isLoggedIn]);

  **/

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const openInfoTooltip = () => {
    setIsInfoTooltipOpen(true);
  };

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateUser (newUserInfo) {
    setIsLoading(true);
    api
      .setUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleUpdateAvatar (newData) {
    setIsLoading(true);
    api
      .setUserAvatar(newData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleAddPlaceSubmit (newData) {
    setIsLoading(true);
    api
      .addCard(newData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  };

   // Регистрация профиля
   const handleRegistration = (data) => {
    return auth
      .register(data)
      .then((data) => {
        setIsRegistrationSuccessful(true);
        openInfoTooltip();
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccessful(false);
        openInfoTooltip();
      });
  };

  // Авторизация профиля
  const handleAuthorization = (authData) => {
    return auth
      .authorize(authData)
        .then((data) => {
          if (data.token) {
            setIsLoggedIn(true);
            localStorage.setItem('token', data.token);
            handleTokenCheck();
            history.push('/');
          }
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
        openInfoTooltip();
      });
  };

  // Выход
  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/sign-in');
  };

  // Проверка токена
  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');

    if (token) {
      auth
        .getContent(token)
          .then((res) => {
            if (res.data) {
              setAuthorizationEmail(res.data.email); // (data.data.email)
              setIsLoggedIn(true);
              history.push('/');
            }
          })
          .catch((err) => {
            console.log(`Ошибка: ${err.status}`);
          });
    }
  };

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header 
            loggedIn={isLoggedIn}
            userEmail={authorizationEmail}
            onSignOut={handleSignOut}
          />
          
          <Switch>
          <Route path="/sign-in">
            <Login onLogin={handleAuthorization} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegistration} />
          </Route>
          <ProtectedRoute
            path="/"
            component={Main}
            loggedIn={isLoggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDeleteClick={handleCardDelete}
          />
        </Switch>

         <Footer />

          <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />
          
          <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />
          
          <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
        />

          <div className={`popup popup_delete-card ${isConfirmationPopupOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
              <button type="button" className="popup__close-button popup__close-delete-card" onClick={closeAllPopups}></button>
              <h3 className="popup__title">Вы уверены?</h3>
              <form
                name="delete-form"
                action="#"
                className="popup__input-list popup__element-delete-card"
              >
                <button type="submit" className="popup__save-button">
                </button>
              </form>
            </div>
          </div>
          
          <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          isSuccess={isRegistrationSuccessful}
        />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>    
  );
}

export default App;