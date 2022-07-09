import React from 'react';
import '../index.css';

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`${
        card.isOpen ? 'popup_opened' : ''
      } popup popup_background_dark popup_type_picture root__popup`}
    >
      <div className='popup__container'>
        <img src={card.link} alt={card.name} className='popup__img' />
        <p className='popup__img-description'>{card.name}</p>
        <button
          className='popup__close'
          type='button'
          aria-label='Закрыть'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
