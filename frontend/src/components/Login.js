import useFormValidation from '../hooks/useFormValidation';

const Login = ({ onLogin }) => {
  const { enteredValues, errors, handleChange } = useFormValidation({});

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!enteredValues.email || !enteredValues.password) {
      return;
    }
    onLogin(enteredValues);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="popup__input-list auth__form" onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          autoComplete="email"
          value={enteredValues.email || ''}
          onChange={handleChange}
          required
        />
        <span className="popup__input-error auth__error">{errors.email}</span>
        <input
          type="password"
          minLength="8"
          name="password"
          id="password"
          placeholder="Пароль"
          autoComplete="password"
          value={enteredValues.password || ''}
          onChange={handleChange}
          required
        />
        <span className="auth__error">{errors.password}</span>
        <button type="submit">Войти</button>
        <span className="auth__login-hint"></span>
      </form>
    </div>
  );
};

export default Login;