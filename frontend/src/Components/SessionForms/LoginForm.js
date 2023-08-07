
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';

import { login, clearSessionErrors } from '../../store/session';
import { Modal } from '../../context/Modal';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(true)

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
    setOpenModal(false)
    dispatch(login({ email, password })); 
  }

  const closeModal = () => {
    setOpenModal(false)
  }
  
  return (
    <>
    {openModal && 
      <Modal onClose={closeModal}>
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
    </Modal>
    }
    </>
  );
}

export default LoginForm;