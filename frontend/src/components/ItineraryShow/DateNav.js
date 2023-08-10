import './ItineraryShow.css'

export default function DateNav({itinerary}) {

    const getNumDays = () => {
        const start = new Date(itinerary.dateStart)
        const end = new Date(itinerary.dateEnd)
        let diffTime = end.getTime() - start.getTime();
        let diffDays = diffTime / (1000 * 3600 * 24);
        if (diffDays > 1) {
            return Math.round(diffDays) + 1
        } else {
            return 1
        }
    }

    const numDays = getNumDays()

    const jumpToDay = (dayNum) => {
        document.getElementById(`day${dayNum}`).scrollIntoView(
            { behavior: 'smooth', block: 'center'}
        );
    }

    return (
        <>
        {itinerary && 
            <div className="itinerary-show-dates-container">
                <div id="dates-nav">
                    Scroll To
                    {[...Array(numDays)].map((item, i) => 
                        <div id="date-nav-h2-container" onClick={()=>jumpToDay(i+1)}>
                            <h2>Day {i+1}</h2>
                        </div>
                    )}
                </div>
            </div>
        }
        </>
    )
}

