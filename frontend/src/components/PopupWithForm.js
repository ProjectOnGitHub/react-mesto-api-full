function PopupWithForm(props) {

  return (
    <section className={`popup popup_type-${props.name} ${props.isOpen && 'popup_opened'}`}>
      <form className="popup__container" name={props.name} noValidate onSubmit={props.onSubmit}>
        <h2 className="popup__title">{props.title}</h2>
        <fieldset className="popup__fieldset">
          {props.children}
          <button type="submit" className="popup__submit-button">{props.buttonText}</button>
        </fieldset>
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={props.onClose}></button>
      </form>
    </section>
  );
}

export default PopupWithForm;