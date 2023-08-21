import ActivityModal from "../ActivityModal/ActivityModal"
import { useEffect, useState } from "react";
import { Modal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "../../store/activities";
import ActivityItem from "./ActivityItem";

export default function ActivityDay({itinerary, date}) {
    const [modalType, setModalType] = useState("");
    const dispatch = useDispatch()
    const activities = useSelector(state => Object.values(state.activities).filter(activity => (new Date(activity.date.replace(/-/g, '\/').replace(/T.+/, '')).toString() === new Date(date).toString() && activity.itineraryId === itinerary._id)))
    const currentUser = useSelector(state => state.session.user)
    const [canEdit, setCanEdit] = useState(false)

    useEffect(()=> {
        if (currentUser) {
            if (currentUser._id === itinerary.ownerId || itinerary.collaborators.includes(currentUser._id)) {
                setCanEdit(true)
            }
        } else {
            setCanEdit(false)
        }
    }, [currentUser])
    
    useEffect(()=> {
        dispatch(fetchActivities(itinerary._id))
    }, [itinerary.activities])

    const createActivity = () => {
        setModalType("create-activity")
    }

    debugger

    return (
        <div>
            {activities && activities.map(activity => 
                <ActivityItem
                    key={activity?._id}
                    activity={activity}
                    ownerId={itinerary.ownerId}
                />
            )}
            {canEdit && 
                <div id="create-activity-button-container" onClick={createActivity}>
                    <button id="create-activity-button"> 
                        <i className="fa-solid fa-plus" style={{color: "#FFA9A3" }}/>
                    </button>
                    <span id="create-activity-label">Create Activity</span>
                </div>
            }
            {modalType === "create-activity" && 
            <Modal onClose={()=> setModalType("")}>
                <ActivityModal
                    itineraryId={itinerary._id}
                    date={date}
                    closeModal={()=> setModalType("")}
                />
            </Modal>}
        </div>
    )
}