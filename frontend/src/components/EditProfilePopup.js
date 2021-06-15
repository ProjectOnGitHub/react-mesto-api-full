import React, { useContext, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          name="userName"
          type="text"
          placeholder="Имя"
          className="popup__input popup__input_name"
          required minLength="2"
          maxLength="40"
          id="name-input"
          autoComplete="off"
          onChange={handleNameChange}
          value={name || ''}
        />
        <span className="popup__input-error" id="name-input-error"></span>
      </label>
      <label className="popup__label">
        <input
          name="userJob"
          type="text"
          placeholder="Профессия"
          className="popup__input popup__input_job"
          required minLength="2"
          maxLength="200"
          id="job-input" autoComplete="off"
          onChange={handleDescriptionChange}
          value={description || ''}
        />
        <span className="popup__input-error" id="job-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
