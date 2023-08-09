import './AboutPage.css';

export default function AboutPage () {

    return (
        <div className="about-page">
            <div className="app-info">
                <h1>About the App</h1>
                <p>Inspired by our collective love of travel, organization, and all things cute we set out to create a trip planning application like no other -
                    featuring a social media-esque blend of likes, collaborators, and innovative use of the Google Maps Api, Journease can ease your travel woes!</p>
            </div>

            <div className="team-info">
                <h1>About the Team</h1>

                <div id="individual-info">
                    <img className="tim" src="/tim.png"/>
                    <p>Artem Polevoy</p>
                    <p>Team Lead 👑</p>
                    <a href="https://github.com/artemplv"><i class="fa-brands fa-github fa-xl" style={{color: "#919397"}}></i></a>
                    <a href="https://www.linkedin.com/in/artemplv/"><i class="fa-brands fa-linkedin fa-xl" style={{color: "#919397"}}></i></a>
                </div>

                <div id="individual-info">
                    <img className="ashley" src="/ashley.png"/>
                    <p>Ashley Kim</p>
                    <p>Backend Lead 👩‍💻</p>
                    <a href="https://github.com/ashleyjek"><i class="fa-brands fa-github fa-xl" style={{color: "#919397"}}></i></a>
                    <i class="fa-brands fa-linkedin fa-xl" style={{color: "#919397"}}></i>
                </div>

                <div id="individual-info">
                    <img className="michelle" src=""/>
                    <p>Michelle Li</p>
                    <p>Frontend Lead 👩‍💻</p>
                    <a href="https://github.com/michelleeli"><i class="fa-brands fa-github fa-xl" style={{color: "#919397"}}></i></a>
                    <i class="fa-brands fa-linkedin fa-xl" style={{color: "#919397"}}></i>
                </div>

                <div id="individual-info">
                    <img className="viktoria" src="/viktoria.png"/>
                    <p>Viktoria Czaran</p>
                    <p>Flex Lead 👩‍💻</p>
                    <a href="https://github.com/vczaran"><i class="fa-brands fa-github fa-xl" style={{color: "#919397"}}></i></a>
                    <a href="https://www.linkedin.com/in/viktoria-czaran-4688ab284/"><i class="fa-brands fa-linkedin fa-xl" style={{color: "#919397"}}></i></a>
                </div>

            </div>
        </div>
    )

}