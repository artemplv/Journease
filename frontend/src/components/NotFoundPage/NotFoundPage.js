import { Link } from "react-router-dom";
import './NotFoundPage.css';

export default function NotFoundPage () {

    return (
        <div className="not-found-page">
            <h1>404 - Not Found</h1>
            <p>Oops! You seem to be lost</p>
            <img src="/lost.png"/>
            <Link to="/">Back to Home</Link>
        </div>
    )
}