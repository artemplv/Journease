import ActivityDay from "./ActivityDay";
import './ActivityIndex.css'

export default function ActivityIndex({itinerary}) {
    let start = new Date(itinerary?.dateStart)
    let end = new Date(itinerary?.dateEnd)

    const datesArray = () => {
        let array = []
        let startDate = start
        while (startDate <= end)  {
            array.push(startDate.toDateString().slice(4))
            startDate.setDate(startDate.getDate() + 1)
        }
        return array
    }

    return(
        <>
            {itinerary && (datesArray().map((date, i) => (
                <div className="show-page-day">
                    <div class="show-page-daily-heading" id={`day${i+1}`}>
                        <div id="day-num-container">
                            <div id="day-num">DAY <br/>{i + 1}</div>
                        
                        </div>
                        <div id="date-heading">{date}</div>
                    </div>
                    <ActivityDay itinerary={itinerary} date={date}/>
                </div>
            )))}
        </>
    )
}