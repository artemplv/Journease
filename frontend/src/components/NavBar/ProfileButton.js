import { useDispatch } from "react-redux";
import { logout } from '../../store/session';
import { useHistory } from "react-router-dom";
import { useState } from "react";
import ItineraryModal from "../ItineraryModal/ItineraryModal";
import { Modal } from "../../context/Modal";

export default function ProfileButton() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [openCreate, setOpenCreate] = useState(false)

    const showPage =() => {
        history.push('/profile')
    }

    const aboutPage = () => {
        history.push('/about')
    }

    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
    }

    const openModal = () => {
        setOpenCreate(true)
    }

    return (
        <div className="links-nav">
            <button onClick={showPage}>My Profile</button>
            <button onClick={openModal}>Plan a Trip</button>
            {openCreate && 
                <Modal
                    onClose={()=> setOpenCreate(false)}
                    ignoreOverflow
                >
                    <ItineraryModal />
                </Modal>
            }
            <button onClick={logoutUser}>Logout</button>
            <button onClick={aboutPage}>About</button>
        </div>
    )
}

