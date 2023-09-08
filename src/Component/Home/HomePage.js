import videoHomepage from "../../assets/video-homepage.webm";
import './HomePage.scss'

const HomePage = () => {
    return (
        <div className="homepage-container">
            <video loop autoPlay muted>
                <source
                    src={videoHomepage}
                    type="video/mp4"
                />
            </video>
            <div className="homepage-content">
                <div className="title-content">There's a better way to ask</div>
                <div className="body-content">You don't want to make a boring form. And your audience
                    won't answer one. Create a typeform instead-and make everyone happy.</div>
                <button className="btn-content btn btn-dark">Get started - it's free</button>
            </div>
        </div>
    );
}

export default HomePage;