import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import '../index.css';
import iconOk from '../images/icon-ok.svg';
import iconError from '../images/icon-error.svg';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    name: '',
    link: '',
  });

  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
    _id: '',
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const [tooltip, setTooltip] = useState({
    isOpen: false,
    message: null,
    image: null,
  });

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
      api
        .getProfile()
        .then((res) => {
          setCurrentUser({
            name: res.data.name,
            about: res.data.about,
            avatar: res.data.avatar,
            _id: res.data._id,
          });
        })
        .catch((err) => {
          console.log(err);
        });

      api
        .getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    tokenCheck();
  }, [loggedIn]);

  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      name: card.name,
      link: card.link,
    });
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({
      ...selectedCard,
      isOpen: false,
    });
    setTooltip({
      ...tooltip,
      isOpen: false,
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .delCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(user) {
    const { name, about } = user;

    api
      .editProfile(name, about)
      .then((res) => {
        setCurrentUser({
          name: res.data.name,
          about: res.data.about,
          avatar: res.data.avatar,
          _id: res.data._id,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(user) {
    const { avatar } = user;
    api
      .updateAvatar(avatar)
      .then((res) => {
        setCurrentUser({
          avatar: res.data.avatar,
          name: res.data.name,
          about: res.data.about,
          _id: res.data._id,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    const { name, link } = card;

    api
      .addCard(name, link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister({ password, email }) {
     api
      .register(password, email)
      .then((res) => {
        console.log(res)
        history.push('/sign-in');
        setTooltip({
          isOpen: true,
          message: 'Вы успешно зарегистрировались!',
          image: iconOk,
        });
      })

      .catch((err) => {
        setTooltip({
          isOpen: true,
          message: 'Что-то пошло не так! Попробуйте ещё раз.',
          image: iconError,
        });
        console.log(err);
      });
  }

  function handleLogin({ password, email }) {
    api
      .authorize(password, email)
      .then((data) => {
        if (data) {
          localStorage.setItem('jwt', data.token);
          tokenCheck();
        }
      })

      .catch((err) => {
        setTooltip({
          isOpen: true,
          message: 'Что-то пошло не так! Попробуйте ещё раз',
          image: iconError,
        });
        console.log(err);
      });
  }

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
        api.getContent(jwt)
        .then((res) => {
          if (res) {
            let userData = {
              email: res.data.email,
            };
            setLoggedIn(true);
            setUserData(userData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserData(null);
    history.push('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root__container'>
        <Header
          loggedIn={loggedIn}
          userData={userData}
          handleSignOut={signOut}
        />
        <Switch>
          <ProtectedRoute
            exact
            path='/'
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={setEditProfilePopupOpen}
            onAddPlace={setAddPlacePopupOpen}
            onEditAvatar={setEditAvatarPopupOpen}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path='/sign-up'>
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path='/sign-in'>
            <Login handleLogin={handleLogin} />
          </Route>
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
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <InfoTooltip
          onClose={closeAllPopups}
          message={tooltip.message}
          isOpen={tooltip.isOpen}
          image={tooltip.image}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
