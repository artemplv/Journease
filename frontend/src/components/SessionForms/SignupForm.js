
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';

import InputField from '../InputField/InputField';

function SignupForm (props) {
  const {
    openSignInForm,
    closeModal,
  } = props;

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
      image
    };

    const res = await dispatch(signup(user));
    if (res.ok) {
      closeModal();
    }
  }

  const handleFile = ({currentTarget}) => {
    const file = currentTarget.files[0];
    setImage(file);
    if (file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => 
            setImageUrl(fileReader.result);
    } else {
        setImageUrl(null);
    }
  };

  let preview = null;
  if (imageUrl) {
      preview = <img src={imageUrl}/>;
  }

  return (      
      <form className="session-form" id="signup" onSubmit={handleSubmit}>
        <h2>Sign Up </h2>
                
        <div className='photo-container'>
          {
            preview && (
              <div className="photo-preview">
                {preview}
              </div>
            )
          }
        </div>
        
        <InputField
          type="email"
          value={email}
          onChange={update('email')}
          placeholder="Email"
          error={errors?.email}
        />
        
        <InputField
          value={username}
          onChange={update('username')}
          placeholder="Username"
          error={errors?.username}
        />

        <InputField
          type="password"
          value={password}
          onChange={update('password')}
          placeholder="Password"
          error={errors?.password}
        />

        <InputField
          type="password"
          value={password2}
          onChange={update('password2')}
          placeholder="Confirm Password"
          error={password !== password2 && 'Confirm Password field must match'}
        />

        <div className="file-upload-container">
          <label className="file-upload">
            <i className="fa-solid fa-file-image file-icon" />
            Upload profile picture
            <input type="file" 
              accept=".jpg, .jpeg, .png" 
              onChange={handleFile}
            />
          </label>
        </div>

        <input
          type="submit"
          value="Sign Up"
          disabled={!email || !username || !password || password !== password2}
        />

        <p className="auth-change-message">
          Already have an account?
          <button onClick={openSignInForm}>
            Log In
          </button>
        </p>
      </form>
  );
}

export default SignupForm;