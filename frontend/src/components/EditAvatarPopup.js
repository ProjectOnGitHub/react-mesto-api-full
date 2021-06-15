import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value
    });
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          name="userAvatar"
          type="url"
          placeholder="Ссылка на новый аватар"
          className="popup__input popup__input_avatar"
          id="avatar-input"
          required autoComplete="off"
          ref={inputRef} />
        <span className="popup__input-error" id="avatar-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;