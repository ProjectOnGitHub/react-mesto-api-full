
import React, { useState } from "react";

function Login(props) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(data.email, data.password);
    setData({ email: "", password: "" });
  }

  return (
    <section className="popup popup_type-sign-in popup_theme_dark">
      <form className="popup__container popup__container_theme_dark" onSubmit={handleSubmit} name="signin" noValidate>
        <h2 className="popup__title popup__title_theme_dark">Вход</h2>
        <fieldset className="popup__fieldset">
          <label className="popup__label">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="popup__input popup__input_theme_dark popup__input_email"
              required minLength="6"
              maxLength="40"
              id="email-input"
              autoComplete="on"
              onChange={handleChange}
              value={data.email}
            />
            <span className="popup__input-error" id="email-input-error"></span>
          </label>
          <label className="popup__label">
            <input
              name="password"
              type="password"
              placeholder="Пароль"
              className="popup__input popup__input_theme_dark popup__input_password"
              required minLength="6"
              maxLength="16"
              id="password-input"
              autoComplete="current-password"
              onChange={handleChange}
              value={data.password}
            />
            <span className="popup__input-error" id="password-input-error"></span>
          </label>
          <button type="submit" className="popup__submit-button popup__submit-button_theme_dark">Войти</button>
        </fieldset>
      </form>
    </section>
  );
}

export default Login;