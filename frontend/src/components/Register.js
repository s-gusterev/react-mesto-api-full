import React, { useState } from 'react';

import { Link } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    props.handleRegister({
      password,
      email,
    });
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <main className='main'>
      <section className='auth root__auth'>
        <h1 className='auth__title'>Регистрация</h1>
        <form name='login' className='auth__form' onSubmit={handleSubmit}>
          <input
            className='auth__input auth__input_type_email'
            type='email'
            name='email'
            placeholder='Email'
            required
            value={email}
            onChange={handleChangeEmail}
          />
          <input
            className='auth__input auth__input_type_password'
            type='password'
            name='password'
            placeholder='Пароль'
            required
            value={password}
            onChange={handleChangePassword}
          />
          <button className='auth__button' type='submit'>
            Зарегистрироваться
          </button>
          <p className='auth__text'>
            Уже зарегистрированы?{' '}
            <Link className='auth__link' to='/sign-in'>
              Войти
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;
