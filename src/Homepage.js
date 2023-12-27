import { Link } from "react-router-dom";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "./WithRouter";
import "./Globals.css";
import "./Homepage.css";

function Homepage({ decks }) {
  let deckElements = isLoaded(decks) ? (
    isEmpty(decks) ? (
      <p>No saved decks</p>
    ) : (
      Object.keys(decks).map((key) => (
        <Link className="home-deck-card" to={`/viewer/${key}`}>
          <p>{decks[key].name}</p>
        </Link>
      ))
    )
  ) : (
    <p>Loading...</p>
  );

  return (
    <div className="main-container">
      <h1>Flashcardia</h1>
      <h3>Learn content, intuitively.</h3>
      <div className="home-blocks-container">
        <Link className="home-blocks-segment" to="/editor">
          <h2>Editor</h2>
          <p style={{ marginTop: "-0.5rem" }}>Create a new deck</p>
        </Link>
        <div className="home-blocks-segment">
          <h2>Decks</h2>
          <p style={{ marginTop: "-0.5rem", marginBottom: "0.5rem" }}>Study known material</p>
          {deckElements}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const homepage = state?.firebase?.data.homepage;
  return { decks: homepage };
}

export default compose(
  withRouter,
  firebaseConnect(["/homepage"]),
  connect(mapStateToProps)
)(Homepage);
