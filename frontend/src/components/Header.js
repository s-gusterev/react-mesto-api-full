import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import '../index.css';

function Header(props) {
  const { email } = props.userData || {};
  return (
    <header className='header root__header'>
      <Link to='/' className='logo header__logo'>
        <img src={logo} alt='Логотип' className='logo__img' />
      </Link>
      <div className='header__login'>
        <Switch>
          <Route exact path='/'>
            <p className='header__login-info'>{email}</p>
            <Link
              onClick={props.handleSignOut}
              className='header__login-link header__login-link_type_true'
              to='/'
            >
              Выйти
            </Link>
          </Route>
          <Route path='/sign-up'>
            <Link
              className='header__login-link header__login-link_type_false'
              to='/sign-in'
            >
              Войти
            </Link>
          </Route>
          <Route path='/sign-in'>
            <Link
              className='header__login-link header__login-link_type_false'
              to='/sign-up'
            >
              Регистрация
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
