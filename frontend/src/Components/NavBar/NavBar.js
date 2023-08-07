
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useState } from 'react';
import './NavBar.css';
import LoginForm from '../SessionForms/LoginForm';
import SignupForm from '../SessionForms/SignupForm';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const [modalType, setModalType] = useState("")

  const signup = () => {
    setModalType("signup")
  }

  const login = () => {
    setModalType("login")
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <ProfileButton/>
      );
    } else {
      return (
        <div className="links-auth">
          <button onClick={signup}>Sign Up</button>
          <button onClick={login}>Log In</button>
        </div>
      );
    }
  }

  return (
    <div className='nav-bar'>
      <h1>Journease</h1>
      { getLinks() }
      {(modalType === "signup") && (
        <SignupForm/>
      )}
      {(modalType === "login") && (
        <LoginForm/>
      )}
    </div>
  );
}

export default NavBar;