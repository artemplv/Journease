import {
  useState,
  useRef,
} from 'react';

import {
  useDispatch,
} from 'react-redux';

import { searchUsersDebounced } from '../../store/users';

import SearchResultItem from './SearchResultItem';
import InputField from '../InputField/InputField';

import './SearchUserInput.css';

function SearchUserInput(props) {
  const {
    onChange,
  } = props;

  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [inputValue, setInputValue] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [userIds, setUserIds] = useState([]);

  const handleFocus = () => {
    setInputFocused(true);
  };

  const handleBlur = () => {
    setInputFocused(false);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.trim()) {
      dispatch(searchUsersDebounced(e.target.value, 5, setUserIds));
    }
  }

  const handleSelect = (userId) => {
    onChange(userId);
    setInputValue('');
    setUserIds([]);

    // TODO: fix this workaround for restoring input focus after blur event
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  }

  return (
    <div className="users-search">
      <InputField
        type="text"
        placeholder="Search for users by username"
        value={inputValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        ref={inputRef}
      />
      {
        (inputFocused && inputValue) && (
          <div className="users-search-dropdown">
            {
              userIds.length > 0 ? (
                <ul>
                  {
                    userIds.map((id) => (
                      <li key={id}>
                        <SearchResultItem
                          userId={id}
                          onSelect={handleSelect}
                        />
                      </li>
                    ))
                  }
                </ul>
              ) : (
                <span>No results</span>
              )
            }
          </div>
        )
      }
    </div>
  );
};

export default SearchUserInput;
