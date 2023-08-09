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
                    <div id="show-page-daily-heading">
                        Day {i + 1} : {date}
                    </div>
                    <ActivityDay itinerary={itinerary} date={date}/>
                </div>
            )))}
        </>
    )
}