import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some((id) => id === currentUser._id);


  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card, isLiked);
  }
  const cardDeleteButtonClassName = (
    `cards__delete-button ${isOwn ? 'cards__delete-button_visible' : 'cards__delete-button_hidden'}`
  );

  const cardLikeButtonClassName = `cards__like ${isLiked ? 'cards__like_active' : 'cards__like'}`;

  return (

    <li className="cards__list-item">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} aria-label="Удалить карточку"></button>
      <img className="cards__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="cards__caption">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards-like-container">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Поставить лайк"></button>
          <p className="cards__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;