import React, { useState, useEffect } from 'react';
import '../index.css';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function editProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeNDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='profile'
      btnText='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className='popup__label' htmlFor='input-name'>
        <input
          className='popup__input'
          type='text'
          name='name'
          id='input-name'
          required
          placeholder='Имя'
          minLength='2'
          maxLength='40'
          value={name || ''}
          onChange={handleChangeName}
        />
        <span className='popup__input-error input-name-error'></span>
      </label>
      <label className='popup__label' htmlFor='input-about'>
        <input
          className='popup__input'
          type='text'
          name='about'
          id='input-about'
          required
          placeholder='Род деятельности'
          minLength='2'
          maxLength='200'
          value={description || ''}
          onChange={handleChangeNDescription}
        />
        <span className='popup__input-error input-about-error'></span>
      </label>
    </PopupWithForm>
  );
}

export default editProfilePopup;
