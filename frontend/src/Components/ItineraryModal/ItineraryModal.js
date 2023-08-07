import { useDispatch, useSelector } from "react-redux"
import { DateRange } from 'react-date-range';
import { useState } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './ItineraryModal.css'
import { createItinerary, editItinerary } from "../../store/itineraries";
import { useEffect } from "react";

export default function ItineraryModal({itinerary}) {
    const dispatch = useDispatch();
    const [openDate, setOpenDate] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const owner = useSelector(state => state.session.user)
    const [type, setType] = useState('Create')

    useEffect(()=> {
        if (itinerary) {
            setType('Edit')
            setTitle(itinerary.title)
            setDescription(itinerary.description)
            setDates([{startDate: new Date(itinerary.dateStart), endDate: new Date(itinerary.dateEnd), key: 'selection'}])
        }
    }, [])

    const [dates, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
    ]);

    const dateConvert = (date) => {
        let [m, d, y] = date.split('/')
        if (m.length <2) {
          m = "0" + m
        }
        if (d.length < 2) {
          d = "0" + d
        }
        return [y ,m ,d].join("-")
      }    

    const toggleOpenDate = () => {
        setOpenDate(!openDate)
    }

    const handleSubmit = (e) => {
        if (type === "Create") {
            dispatch(createItinerary({owner: owner.username, ownerId: owner._id, title: title, description: description, dateStart: dates[0].startDate, dateEnd: dates[0].endDate}))
        } else {
            dispatch(editItinerary({id: itinerary._id, owner: owner.username, ownerId: owner._id, title: title, description: description, dateStart: dates[0].startDate, dateEnd: dates[0].endDate}))
        }
    }

    return(
        <form className="itinerary-form" onSubmit={handleSubmit}>
            <div>
                Image Upload
            </div>
            <div id="inputs">
                <div>Title</div>
                    <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
                <div>Description</div>
                    <textarea value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                <div id="dates" onClick={toggleOpenDate}>Dates
                    <br/>
                    <input type="text" value={dateConvert(dates[0].startDate.toLocaleDateString())}/>
                    <label> → 
                        <input type="text" value={dateConvert(dates[0].endDate.toLocaleDateString())}/>
                    </label>
                </div>
                {openDate && 
                    <div id="calendar">
                        <div id="calendarDone" onClick={toggleOpenDate}>Close</div>
                        <DateRange months={2} direction="horizontal" color="#D33756" minDate={new Date()} editableDateInputs={true} onChange={item => setDates([item.selection])} moveRangeOnFirstSelection={false} ranges={dates}/> 
                    </div>
                }
                <div>Collaborators
                    <br/>
                    <input type="text"/>
                </div>
                <input type="submit" value="Create"/>
            </div>
        </form>
    )
}