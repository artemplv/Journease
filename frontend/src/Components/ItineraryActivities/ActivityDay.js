import ActivityModal from "../ActivityModal/ActivityModal"
import { useEffect, useState } from "react";
import { Modal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "../../store/activities";
import ActivityItem from "./ActivityItem";

export default function ActivityDay({itinerary, date}) {
    const [modalType, setModalType] = useState("");
    const dispatch = useDispatch()
    const activities = useSelector(state => Object.values(state.activities).filter(activity => new Date(activity.date).toString() === new Date(date).toString()))
    const currentUser = useSelector(state => state.session.user)
    const [canEdit, setCanEdit] = useState(false)
    useEffect(()=> {
        if (currentUser) {
            if (currentUser._id === itinerary.ownerId) {
                setCanEdit(true)
            }
        }
    }, [])
    
    useEffect(()=> {
        dispatch(fetchActivities(itinerary._id))
    }, [itinerary.activities])

    const createActivity = () => {
        setModalType("create-activity")
    }

    return (
        <div>
            {activities && activities.map(activity => 
                <ActivityItem activity={activity}/>
            )}
            {canEdit && 
                    <div>
                    <button id="create-activity-button" onClick={createActivity}> 
                        <i className="fa-solid fa-plus" style={{color: "#FFA9A3",}}/>
                    </button>
                    Create Activity
                </div>
            }
            {modalType === "create-activity" && 
            <Modal onClose={()=> setModalType("")}>
                <ActivityModal itineraryId={itinerary._id} date={date}/>
            </Modal>}
        </div>
    )
}