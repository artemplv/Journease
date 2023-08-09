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
    onRemove,
  } = props;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users[userId]);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser(userId));
    }
  }, [user]);

  const handleRemove = () => {
    onRemove(userId);
  }

  return (
    <div className="collaborator-item">
      <p className="collaborator-username">{user?.username || ''}</p>
      <button
        className="remove-collaborator-button"
        onClick={handleRemove}
      >
        X
      </button>
    </div>
  );
};

export default Collaborator;
