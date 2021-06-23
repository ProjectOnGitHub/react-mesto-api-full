import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import * as auth from "../utils/auth";


function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }


  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(false);
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (loggedIn) {
      Promise.all([
        api.getUserInfo(token),
        api.getInitialCards(token)
      ])
        .then(([userInfo, cardsData]) => {
          setCurrentUser(userInfo);
          setCards(cardsData.reverse());
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    }
  }, [loggedIn]);


  function handleCardLike(card, isLiked) {
    (!isLiked ? api.setLikeCardStatus(card._id) : api.setDislikeCardStatus(card._id))
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => console.log(`Ошибка удаление карточки ${err}`));
  }

  function handleUpdateUser(info) {
    api.changeUserInfo(info)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка загрузки информации о пользователе: ${err}`));
  }

  function handleUpdateAvatar(info) {
    api.changeUserAvatar(info)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка аватара ${err}`));
  }

  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка добавления места ${err}`));

  }

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(`${err} — Токен не передан или передан не в том формате `);
          setLoggedIn(false);
          setEmail('');
        })
    }
  }, [history]);

  function handleLoginSubmit(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          setEmail(email);
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token)
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);

      })
  }

  function handleRegisterSubmit(email, password) {
    console.log('1');
    auth.register(email, password)
      .then(() => {
        setIsRegisterSuccess(true);
        history.push('/signin');
      })
      .catch((err) => {
        console.log(err);
        setIsRegisterSuccess(false);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      })
  }

  function handleSignOut() {
    setEmail(null);
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/signin');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header
          loggedIn={loggedIn}
          onSignOut={handleSignOut}
          email={email}
        />
        <Switch>
          <Route path="/signin">
            <Login
              onLogin={handleLoginSubmit}
            />
          </Route>
          <Route path="/signup">
            <Register
              onRegister={handleRegisterSubmit}
            />
          </Route>
          <ProtectedRoute exact path="*"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
          />
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          buttonText="Да"
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isRegisterSuccess={isRegisterSuccess}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups} />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
