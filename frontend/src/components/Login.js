import { useState } from 'react';

function Login({ onSubmit }) {
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

    setEmail('');
    setPassword('');
    onSubmit({ password, email });
  }

  return (
    <section className="login">
      <div className="login__container">
        <h1 className="login__title">Вход</h1>
        <form onSubmit={handleSubmit} className="login__form" name="login">
          <input onChange={handleEmailChange} value={email} id="login-email-input" className="login__input login__input_type_email" type="email" name="login-email" placeholder="Email" required />
          <span className="login__input-error login-email-input-error"></span>
          <input onChange={handlePasswordChange} value={password} id="login-password-input" className="login__input login__input_type_password" type="password" name="login-password" placeholder="Пароль" required />
          <span className="login__input-error login-password-input-error"></span>
          <button className="login__submit" type="submit">Войти</button>
        </form>
      </div>
    </section>
  );
}

export default Login;
