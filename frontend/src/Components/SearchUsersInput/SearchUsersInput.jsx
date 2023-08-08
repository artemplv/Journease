import {
  useState,
  useEffect,
} from 'react';

import SearchResultItem from './SearchResultItem';

import './SearchUserInput.css';

function SearchUserInput(props) {
  const {
    onChange,
  } = props;

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
  }

  return (
    <div className="users-search">
      <input
        type="text"
        placeholder="Search for users by username"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
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
                        <SearchResultItem userId={id} />
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
