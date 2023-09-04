import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({ password, email });
  }

  return (
    <section className="register">
      <h1 className="register__title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="register__form" name="register">
        <input onChange={handleEmailChange} value={email} id="register-email-input" className="register__input register__input_type_email" type="email" name="register-email" placeholder="Email" required />
        <span className="register__input-error register-email-input-error"></span>
        <input onChange={handlePasswordChange} value={password} id="register-password-input" className="register__input register__input_type_password" type="password" name="register-password" placeholder="Пароль" required />
        <span className="register__input-error register-password-input-error"></span>
        <button className="register__submit" type="submit">Зарегистрироваться</button>
      </form>
      <div className="register__signin">
        <p className="register__signin-text">Уже зарегистрированы?&ensp;</p>
        <Link to="/sign-in" className="register__link">Войти</Link>
      </div>
    </section>
  );
}

export default Register;
