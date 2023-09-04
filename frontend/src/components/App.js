import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import { authorize, register, checkToken } from '../utils/auth';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { SelectedCardContext } from '../contexts/SelectedCardContext';
import { LoggedInContext } from '../contexts/LoggedInContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentEmail, setCurrentEmail] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccessInfoTooltip, setIsSuccessInfoTooltip] = React.useState(false);
  const history = useHistory();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(userInfo) {
    api.saveUserInfo(userInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });
  }

  function handleUpdateAvatar(avatarInfo) {
    api.saveAvatar(avatarInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });
  }

  function handleAddPlaceSubmit(cardInfo) {
    api.addNewCard(cardInfo)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });
  }

  function handleLoginSubmit({ password, email }) {
    authorize(password, email)
      .then((data) => {
        if (data.token) {
          setCurrentEmail(email);
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {
        setIsSuccessInfoTooltip(false);
        setIsInfoTooltipOpen(true);
        console.log(`Ошибка: ${err.status}`);
      });
  }

  function handleRegisterSubmit({ password, email }) {
    register(password, email)
      .then((res) => {
        if (res) {
          setIsSuccessInfoTooltip(true);
          setIsInfoTooltipOpen(true);
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        setIsSuccessInfoTooltip(false);
        setIsInfoTooltipOpen(true);
        console.log(`Ошибка: ${err.status}`);
      });
  }

  function handleLogout() {
    setCurrentEmail('');
    setLoggedIn(false);
    localStorage.removeItem('token');
  }

  function handleTokenCheck() {
    const token = localStorage.getItem('token');

    if (token) {
      checkToken(token)
        .then((res) => {
          if (res.data) {
            setCurrentEmail(res.data.email);
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err.status}`);
        });
    }
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err.status}`);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((data) => {
          setCards(data.reverse());
        })
        .catch((err) => {
          console.log(`Ошибка: ${err.status}`);
        });
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <SelectedCardContext.Provider value={selectedCard}>
    <LoggedInContext.Provider value={loggedIn}>
      <div className="page__content">
        <Header
          onLogout={handleLogout}
          currentEmail={currentEmail}
        />

        <Switch>
          <ProtectedRoute
            exact path="/"
            component={Main}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
          />

          <Route exact path="/sign-in">
            <Login onSubmit={handleLoginSubmit}></Login>
          </Route>

          <Route exact path="/sign-up">
            <Register onSubmit={handleRegisterSubmit}></Register>
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccessInfoTooltip}
        />
      </div>
    </LoggedInContext.Provider>
    </SelectedCardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
