import successAuth from '../images/success.svg';
import failAuth from '../images/fail.svg';


function InfoTooltip(props) {

  return (
    <section className={`popup popup_type-tooltip ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <figure className="popup__fieldset">
          <img className="popup__icon" src={props.isRegisterSuccess ? successAuth : failAuth} alt="Иконка статуса регистрации" />
          <figcaption className="popup__title">{props.isRegisterSuccess ?
            "Вы успешно зарегистрировались" :
            "Что-то пошло не так Попробуйте еще раз."}
          </figcaption>
        </figure>
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={props.onClose}></button>
      </div>
    </section>
  );
}

export default InfoTooltip;