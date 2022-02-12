import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import cookSvg from '../images/undraw_cooking_lyxy.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [button, setButton] = useState(true);

  const inputValidation = () => {
    // ref: https://stackoverflow.com/questions/35788383/regex-validation-in-javascript-email
    const EMAIL_REGEX = /\S+@\S+\.\S+/;
    const EMAIL_VALIDATE = EMAIL_REGEX.test(email);
    const MIN_PASSWORD_LENGTH = 6;
    const PASSWORD_VALIDATE = password.length >= MIN_PASSWORD_LENGTH;
    if (EMAIL_VALIDATE && PASSWORD_VALIDATE) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const handleEmailChange = ({ target }) => {
    setEmail(target.value);
    inputValidation();
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
    inputValidation();
  };

  const history = useHistory();
  const handleSubmitClick = () => {
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/comidas');
  };

  return (
    <form className="login-form">
      <img src={ cookSvg } alt="" width="150px" height="150px" />
      <h1>Login</h1>
      <input
        data-testid="email-input"
        name="email"
        type="text"
        onChange={ handleEmailChange }
        value={ email }
        placeholder="email"
        className="email-input"
      />
      <input
        data-testid="password-input"
        name="password"
        type="password"
        onChange={ handlePasswordChange }
        value={ password }
        placeholder="senha"
        className="senha-input"
      />
      <button
        data-testid="login-submit-btn"
        type="submit"
        disabled={ button }
        onClick={ handleSubmitClick }
      >
        Entrar
      </button>
    </form>
  );
}
