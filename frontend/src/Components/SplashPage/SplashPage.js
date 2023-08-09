import './SplashPage.css';
import ItineraryIndex from '../ItineraryIndex/ItineraryIndex';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Modal } from '../../context/Modal';
import ItineraryModal from '../ItineraryModal/ItineraryModal';
import LoginForm from '../SessionForms/LoginForm';

const SplashPage = () => {
    const currentUser = useSelector(state => state.session.user);
    const [modalType, setModalType] = useState("")

    const handleClick = (e) => {
        e.preventDefault();
        if (!currentUser) {
            setModalType("login")
        } else {
            setModalType("itinerary")
        }
    };
    
    return (
        <>
            {(modalType === "login") && (
            <Modal onClose={()=> setModalType("")}>
                <LoginForm/>
            </Modal>
            )}
            {(modalType === "itinerary") && 
                <Modal onClose={()=> setModalType("")}>
                    <ItineraryModal/>
                </Modal>
            }
            <div className="entire-splash-container">
                <div className="splash-search-container">
                    <img src="https://coffeebook-dev.s3.amazonaws.com/logo2.png"/>
                    {/* <img src="https://coffeebook-dev.s3.amazonaws.com/Logo.png"/> */}
                    <h1 id="search-label">Type to search for itineraries</h1>
                    <input className="splash-search"/>
                    <button 
                        onClick={handleClick}
                        className="splash-browse-all">or create your own</button>
                </div>
                <div className="splash-img-container">
                    <img src='https://coffeebook-dev.s3.amazonaws.com/cristina-gottardi-9TaYFMMapbA-unsplash.jpg'/>
                </div>
            </div>
                <ItineraryIndex/>
        </>
    )
}



export default SplashPage;