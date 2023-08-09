
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';

import { login, clearSessionErrors } from '../../store/session';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }))
  }
    
  return (
      <form className="session-form" id="login" onSubmit={handleSubmit}>
        <h2>Log In </h2>
        <label>
          <div className='label'>Email</div>
          <input type="text"
            value={email}
            onChange={update('email')}
            placeholder="Email"
          />
        <div className="errors">{errors?.email}</div>
        </label>
        <div className="errors">{errors?.password}</div>
        <label>
          <div className='label'>Password</div>
          <input type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
          />
        </label>
        <br/>
        <input
          type="submit"
          value="Log In"
          disabled={!email || !password}
        />
      </form>
  );
}

export default LoginForm;