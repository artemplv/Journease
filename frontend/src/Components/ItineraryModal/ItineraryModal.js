import { useDispatch } from "react-redux"
import { Modal } from "../../context/Modal";
import { DateRange } from 'react-date-range';
import { useState } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './ItineraryModal.css'

export default function ItineraryModal() {
    const dispatch = useDispatch();
    const [openDate, setOpenDate] = useState(false)

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

    return(
        <form className="itinerary-form">
            <div>
                Image Upload
            </div>
            <div id="inputs">
                <div>Title</div>
                    <input type="text"/>
                <div>Description</div>
                    <textarea/>
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