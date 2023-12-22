import { Link } from "react-router-dom";
import "./Homepage.css";

function Homepage() {
    return <div class="home-title-big">
        <h1>Flashcardia</h1>
        {/* <br /> */}
        <h2>Learn material, FAST!</h2>
        <div>
            <Link to="/editor"><div>Editor</div></Link>
            <Link to="viewer"><div>Viewer</div></Link>
        </div>
    </div>
}

export default Homepage;