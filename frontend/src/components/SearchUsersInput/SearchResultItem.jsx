import {
  useEffect,
} from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';

import { fetchUser } from '../../store/users';

function SearchResultItem(props) {
  const {
    userId,
    onSelect,
  } = props;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users[userId]);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser(userId));
    }
  }, [user]);

  const handleClick = () => {
    onSelect(userId);
  }

  return (
    <button
      type="button"
      onMouseDown={handleClick}
    >
      <span>{user?.username}</span>
    </button>
  );
};

export default SearchResultItem;
