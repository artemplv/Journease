import './SplashPage.css';
import ItineraryIndex from '../ItineraryIndex/ItineraryIndex';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import ItineraryModal from '../ItineraryModal/ItineraryModal';
import LoginForm from '../SessionForms/LoginForm';
import SearchItinerariesInput from '../SearchItineraries/SearchItinerariesInput';

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

    const handleRedirect = () => {
        var el = document.getElementById('itinerary-index-page-title');
        el.scrollIntoView({behavior: 'smooth'});
    }

    // const navBar = document.getElementById('nav-bar');
    // useEffect(() => {
    //   if (navBar) {
    //     window.onscroll = function () {
    //       const scroll = window.scrollY;
    //       if (scroll < 10) {
    //         navBar.style.backgroundColor = 'transparent';
    //       } else if (scroll > 30) {
    //         navBar.style.backgroundColor = "rgb(110, 110, 110, 0.5)"
    //         // "rgb(250, 176, 146, 0.7)";
    //       }
    //     }
    //   };
    // });
    
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
                    <img 
                        src="https://journease-artemplv.s3.amazonaws.com/public/vv-final-logo.png"/>
                        <SearchItinerariesInput/>
                    <button 
                        onClick={handleClick}
                        className="splash-create">
                            Create an Itinerary</button>
                    <button 
                        className="splash-browse"
                        onClick={handleRedirect}>
                            or Browse All</button>
                </div>
                <div className="splash-img-container">
                    <img 
                        src='https://journease-artemplv.s3.amazonaws.com/public/splash-image.jpg'/>
                </div>
            </div>
                <ItineraryIndex/>
        </>
    )
}



export default SplashPage;