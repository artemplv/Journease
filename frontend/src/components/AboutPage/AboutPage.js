import './AboutPage.css';

export default function AboutPage () {

    return (
        <div className="about-page">
            <div className="app-info">
                <h1>About the App</h1>
                <p>Inspired by our team's collective love of travel and organization we set out to create a trip planning application like no other. With Journease, users can create detailed travel itineraries for various destinations and occasions with ease. 
                    The platform promotes collaborative planning, allowing multiple users to contribute and refine trip plans together. Furthermore, users can openly share their curated itineraries, providing insights and inspiration to the Journease community.</p>
            </div>

            <h1>About the Team</h1>

            <div className="team-info">

                <div id="individual-info">
                    <img className="tim" src="/tim.png"/>
                    <div id="individual-subinfo">
                        <h2>Artem Polevoy</h2>
                        <p>Team Lead 👨‍💻</p>
                        <div id="social-links">
                            <a href="https://github.com/artemplv"><i class="fa-brands fa-github fa-2xl" style={{color: "#919397"}}></i></a>
                            <a href="https://www.linkedin.com/in/artemplv/"><i class="fa-brands fa-linkedin fa-2xl" style={{color: "#919397"}}></i></a>
                        </div>
                    </div>
                </div>

                <div id="individual-info">
                    <img className="ashley" src="/ashley.png"/>
                    <div id="individual-subinfo">
                        <h2>Ashley Kim</h2>
                        <p>Backend Lead 👩‍💻</p>
                        <div id="social-links">
                            <a href="https://github.com/ashleyjek"><i class="fa-brands fa-github fa-2xl" style={{color: "#919397"}}></i></a>
                            <a href=""><i class="fa-brands fa-linkedin fa-2xl" style={{color: "#919397"}}></i></a>
                        </div>
                    </div>
                </div>

                <div id="individual-info">
                    <img className="michelle" src="/michelle.png"/>
                    <div id="individual-subinfo">
                        <h2>Michelle Li</h2>
                        <p>Frontend Lead 👩‍💻</p>
                        <div id="social-links">
                            <a href="https://github.com/michelleeli"><i class="fa-brands fa-github fa-2xl" style={{color: "#919397"}}></i></a>
                            <a href=""><i class="fa-brands fa-linkedin fa-2xl" style={{color: "#919397"}}></i></a>
                        </div>
                    </div>
                </div>

                <div id="individual-info">
                    <img className="viktoria" src="/viktoria.png"/>
                    <div id="individual-subinfo">
                        <h2>Viktoria Czaran</h2>
                        <p>Flex Lead 👩‍💻</p>
                        <div id="social-links">
                            <a href="https://github.com/vczaran"><i class="fa-brands fa-github fa-2xl" style={{color: "#919397"}}></i></a>
                            <a href="https://www.linkedin.com/in/viktoria-czaran-4688ab284/"><i class="fa-brands fa-linkedin fa-2xl" style={{color: "#919397"}}></i></a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}
