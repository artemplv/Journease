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
    <div id='nav-bar'>
      <h1 onClick={redirectHome}>
        <img id="logo" src="https://journease-artemplv.s3.amazonaws.com/public/favicon.png"/></h1>
      { getLinks() }
      {(modalType === "signup") && (
        <Modal onClose={()=> setModalType("")}>
          <SignupForm
            openSignInForm={login}
            closeModal={()=> setModalType("")}
          />
        </Modal>
      )}
      {(modalType === "login") && (
        <Modal onClose={()=> setModalType("")}>
            <LoginForm
              openSignUpForm={signup}
              closeModal={()=> setModalType("")}
            />
        </Modal>
      )}
    </div>
  );
}

export default NavBar