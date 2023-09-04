import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import mestoLogoPath from '../images/logo.svg';

function Header({ onLogout, currentEmail }) {
  const location = useLocation();

  function handleLogoutClick() {
    onLogout();
  }

  return (
    <header className="header" id="main">
      <a className="link" href="#main">
        <img className="header__logo" src={mestoLogoPath} alt="Логотип Mesto" />
      </a>
      {location.pathname === '/' && (
        <nav className="header__menu">
          <p className="header__email">{currentEmail}</p>
          <Link onClick={handleLogoutClick} to="/sign-in" className="header__link link">Выйти</Link>
        </nav>
      )}

      {location.pathname === '/sign-in' && (
        <nav className="header__menu">
          <Link to="/sign-up" className="header__link link">Регистрация</Link>
        </nav>
      )}

      {location.pathname === '/sign-up' && (
        <nav className="header__menu">
          <Link to="/sign-in" className="header__link link">Войти</Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
