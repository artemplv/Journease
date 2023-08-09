import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "../../store/users";
import { useEffect } from "react";
import './UserInfo.css';


export default function UserInfo ({userId}) {
    const dispatch = useDispatch();

    
   useEffect(() => {
    dispatch(fetchUser(userId));
   }, [userId])

    const user = useSelector(state => state.users[userId]);
   
    return (
        <div id="user-info">
            <img src={user?.profileImageUrl}/>
            <h2>{user?.username}</h2>
        </div>
    )
}