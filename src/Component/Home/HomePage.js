// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import videoHomepage from "../../assets/video-homepage.webm";
import './HomePage.scss'

const HomePage = () => {
    // const account = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate()
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
                {isAuthenticated && isAuthenticated === false ?
                    <button className="btn-content btn btn-dark" onClick={() => navigate("/login")}>Get started - it's free</button>
                    :
                    <button className="btn-content btn btn-dark" onClick={() => navigate("/user")} > Doing quiz now</button>
                }
            </div>
        </div >
    );
}

export default HomePage;