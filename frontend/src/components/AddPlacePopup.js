import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          name="name"
          type="text"
          placeholder="Название"
          className="popup__input popup__input_place"
          required minLength="2"
          maxLength="30"
          id="place-input"
          autoComplete="off"
          value={name || ''}
          onChange={handleChangeName}
        />
        <span className="popup__input-error" id="place-input-error"></span>
      </label>
      <label className="popup__label">
        <input
          name="link"
          type="url"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_url"
          id="url-input"
          required
          autoComplete="off"
          value={link || ''}
          onChange={handleChangeLink}
        />
        <span className="popup__input-error" id="url-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;