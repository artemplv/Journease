
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';

import { login, clearSessionErrors } from '../../store/session';

import InputField from '../InputField/InputField';

function LoginForm(props) {
  const {
    openSignUpForm,
    closeModal,
  } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login({ email, password }));
    if (res.ok) {
      closeModal();
    }
  }

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login({email: 'marco@email.com', password: 'password'}));
    closeModal();
  }
    
  return (
      <form className="session-form" id="login" onSubmit={handleSubmit}>
        <h2>Log In </h2>

        <InputField
          type="email"
          value={email}
          onChange={update('email')}
          placeholder="Email"
          error={errors?.email}
        />

        <InputField
          type="password"
          value={password}
          onChange={update('password')}
          placeholder="Password"
          error={errors?.password}
        />

        <input
          type="submit"
          value="Log In"
          disabled={!email || !password}
        />

        <button 
          id="demo-button" 
          onClick={handleDemoLogin}>
          Demo Login
        </button>

        <p className="auth-change-message">
          Don't have an account?
          <button onClick={openSignUpForm}>
            Sign Up
          </button>
        </p>
      </form>
  );
}

export default LoginForm;