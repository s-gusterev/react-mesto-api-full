import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
function Card({ card, onCardLike, onCardClick, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const cardDeleteButtonClassName = `card__del ${
    isOwn ? 'card__del_visible' : 'card__del_hidden'
  }`;

  const isLiked = card.likes.some((i) => i === currentUser._id);
  

  const cardLikeButtonClassName = `card__like ${
    isLiked ? 'card__like_active' : ''
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className='card'>
      <div className='card__text'>
        <h2 className='card__title'>{card.name}</h2>
        <div className='card__like-section'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            onClick={handleLikeClick}
          ></button>
          <span className='card__like-info'>{card.likes.length}</span>
        </div>
      </div>
      <div
        className='card__img'
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick}
      ></div>
      <button
        className={cardDeleteButtonClassName}
        type='button'
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}

export default Card;
