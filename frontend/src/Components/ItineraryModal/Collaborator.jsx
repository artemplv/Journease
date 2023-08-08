import {
  useEffect,
} from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';

import { fetchUser } from '../../store/users';

function Collaborator(props) {
  const {
    userId,
  } = props;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users[userId]);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser(userId));
    }
  }, [user]);

  return (
    <p className='collaborator-username'>{user.username}</p>
  );
};

export default Collaborator;
