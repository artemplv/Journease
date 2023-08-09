
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useState } from 'react';
import './NavBar.css';
import LoginForm from '../SessionForms/LoginForm';
import SignupForm from '../SessionForms/SignupForm';
import { Modal } from '../../context/Modal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const [modalType, setModalType] = useState("")
  const history = useHistory();

  const signup = () => {
    setModalType("signup")
  }

  const login = () => {
    setModalType("login")
  }

   const aboutPage = () => {
        history.push('/about')
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
          <button onClick={aboutPage}>About</button>
        </div>
      );
    }
  }

  const redirectHome = () => {
    history.push('/')
  }

  return (
    <div className='nav-bar'>
      <h1><img id="logo" src="https://coffeebook-dev.s3.amazonaws.com/travel_4040290.png"/></h1>
      <h1 onClick={redirectHome}>Journease</h1>
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