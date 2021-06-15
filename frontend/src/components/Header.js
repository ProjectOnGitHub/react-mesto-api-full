import headerLogo from '../images/header-logo.svg';
import { Route, Switch, Link } from 'react-router-dom';

function Header({ email, onSignOut }) {

  return (
    <header className="header section">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <nav className="header__menu">
        <Switch>
          <Route exact path="/">
            <p className="header__email">{email}</p>
            <Link to="/signin" className="header__link header__link_signout" onClick={onSignOut} > Выйти</Link>
          </Route>
          <Route path="/signup">
            <Link to="/signin" className="header__link">Войти</Link>
          </Route>
          <Route path="/signin">
            <Link to="/signup" className="header__link">Регистрация</Link>
          </Route>
        </Switch>
      </nav>
    </header >
  );
}

export default Header;