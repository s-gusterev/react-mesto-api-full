import React, { useState } from 'react';
import '../index.css';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLInk(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      title='Новое место'
      name='card-add'
      btnText='Создать'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className='popup__label' htmlFor='input-place'>
        <input
          className='popup__input '
          type='text'
          name='place'
          id='input-place'
          required
          placeholder='Название'
          minLength='2'
          maxLength='30'
          value={name}
          onChange={handleChangeName}
        />
        <span className='popup__input-error input-place-error'></span>
      </label>
      <label className='popup__label' htmlFor='input-image'>
        <input
          className='popup__input'
          type='url'
          name='image'
          id='input-image'
          required
          placeholder='Ссылка на картинку'
          value={link}
          onChange={handleChangeLInk}
        />
        <span className='popup__input-error input-image-error'></span>
      </label>
      "
    </PopupWithForm>
  );
}

export default AddPlacePopup;
