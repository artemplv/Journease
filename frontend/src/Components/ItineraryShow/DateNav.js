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

    return (
        <>
        {itinerary && 
            <div class="itinerary-show-dates-container">
                {/* <div id="dates-header">
                    <h2>{numDays} Days </h2>
                </div> */}
                <div id="dates-nav">
                    {[...Array(numDays)].map((item, i) => 
                        <div id="date-nav-h2-container">
                            <h2>Day {i+1}</h2>
                        </div>
                    )}
                </div>
            </div>
        }
        </>
    )
}

