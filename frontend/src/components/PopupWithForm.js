import React from 'react';
import '../index.css';

function PopupWithForm(props) {
  return (
    <div
      className={`${
        props.isOpen ? 'popup_opened' : ''
      } popup popup_background_light popup_type_${props.name} root__popup`}
    >
      <form
        className='popup__container popup__container_type_form'
        name={props.name}
        // noValidate
        onSubmit={props.onSubmit}
      >
        <h2 className='popup__title'>{props.title}</h2>

        {props.children}

        <button className='popup__btn root__btn' type='submit'>
          {props.btnText}
        </button>
        <button
          className='popup__close'
          type='button'
          aria-label='Закрыть'
          onClick={props.onClose}
        ></button>
      </form>
    </div>
  );
}

export default PopupWithForm;
