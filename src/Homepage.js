import "./Homepage.css";
import { Link } from "react-router-dom";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "./WithRouter";

function Homepage({ firebase, router, decks }) {
    return (
      <div className="home-title-big">
        <h1>Flashcardia</h1>
        <div>
          <h2>Editor</h2>
          <Link to="/editor">
            <div>Go to deck editor</div>
          </Link>
          {/* <Link to="viewer"><div>Viewer</div></Link> */}
          <br />
          <h2>Decks</h2>
          <ul className="home-decks-list">
            {isLoaded(decks) ? isEmpty(decks) ? <p>No saved decks</p> : (
              Object.keys(decks).map((key) => (
                <li className="home-deck-link" key={key}>
                  <Link to={`/viewer/${key}`}>
                    <p>{decks[key].name}</p>
                  </Link>
                </li>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </ul>
        </div>
      </div>
    );
}

function mapStateToProps(state, props) {
  const homepage = state?.firebase?.data.homepage;
  return { decks: homepage };
}

export default compose(
    withRouter,
    firebaseConnect(['/homepage']),
    connect(mapStateToProps),
)(Homepage);