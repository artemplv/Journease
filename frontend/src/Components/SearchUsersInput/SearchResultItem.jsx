import {
  useEffect,
} from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';

function SearchResultItem(props) {
  const {
    userId,
  } = props;

  const user = useSelector((state) => /*state.users[userId]*/ ({}));

  useEffect(() => {
    if (!user) {
      // useDispatch(getUsesr(userId));
    }
  }, [user]);

  return (
    <div>
      <span>Hello im user</span>
    </div>
  );
};

export default SearchResultItem;
