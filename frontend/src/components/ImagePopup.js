function ImagePopup({ card, onClose }) {

  return (
    <section className={`popup popup_type-view-image ${card ? 'popup_opened' : ""}`}>
      <div className="popup__container-image">
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={onClose}></button>
        <figure className="popup__figure">
          <img src={card?.link} alt={card?.name} className="popup__image" />
          <figcaption className="popup__caption">{card?.name}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;