import { useDispatch } from "react-redux";
import { logout } from '../../store/session';
import { useHistory } from "react-router-dom";

export default function ProfileButton() {
    const dispatch = useDispatch();
    const history = useHistory();

    const showPage =() => {
        history.push('/profile')
    }

    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
    }
    return (
        <div className="links-nav">
            <button onClick={showPage}>My Profile</button>
            <button onClick={logoutUser}>Logout</button>
        </div>
    )
}

