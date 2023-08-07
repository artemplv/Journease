
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useState } from 'react';
import './NavBar.css';
import LoginForm from '../SessionForms/LoginForm';
import SignupForm from '../SessionForms/SignupForm';
import { Modal } from '../../context/Modal';

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
        <Modal onClose={()=> setModalType("")}>
          <SignupForm/>
        </Modal>
      )}
      {(modalType === "login") && (
        <Modal onClose={()=> setModalType("")}>
            <LoginForm/>
        </Modal>
      )}
    </div>
  );
}

export default NavBar;