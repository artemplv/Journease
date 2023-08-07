
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';
import { Modal } from '../../context/Modal';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(true)

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      password
    };

    dispatch(signup(user)); 
    setOpenModal(false)
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  return (      
    <>
    {openModal &&
      <Modal onClose={closeModal}>
          <form className="session-form" id="signup" onSubmit={handleSubmit}>
            <h2>Sign Up </h2>
            <label>
              <div className='label'>Email</div>
              <input type="text"
                value={email}
                onChange={update('email')}
                placeholder="Email"
              />
              <div className="errors">{errors?.email}</div>
            </label>
            <label>
              <div className='label'>Username</div>
              <input type="text"
                value={username}
                onChange={update('username')}
                placeholder="Username"
              />
              <div className="errors">{errors?.username}</div>
            </label>
            <label>
              <div className='label'>Password</div>
              <input type="password"
                value={password}
                onChange={update('password')}
                placeholder="Password"
              />
              <div className="errors">{errors?.password}</div>
            </label>
            <label>
              <div className='label'>Confirm Password</div>
              <input type="password"
                value={password2}
                onChange={update('password2')}
                placeholder="Confirm Password"
              />
            <div className="errors">
              {password !== password2 && 'Confirm Password field must match'}
            </div>
            </label>
            <br/>
            <input
              type="submit"
              value="Sign Up"
              disabled={!email || !username || !password || password !== password2}
            />
          </form>
        </Modal>
        
    }
    </>  
  );
}

export default SignupForm;