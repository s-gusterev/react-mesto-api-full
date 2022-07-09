import React, { useRef } from 'react';
import '../index.css';
import PopupWithForm from './PopupWithForm';

function editAvatarPopup(props) {
  const valueRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: valueRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='edit-avatar'
      btnText='Обновить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className='popup__label' htmlFor='input-avatar'>
        <input
          ref={valueRef}
          className='popup__input'
          type='url'
          name='avatar'
          id='input-avatar'
          required
          placeholder='Ссылка на аватар'
        />
        <span className='popup__input-error input-avatar-error'></span>
      </label>
    </PopupWithForm>
  );
}

export default editAvatarPopup;
