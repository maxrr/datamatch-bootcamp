import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "./WithRouter";
import "./Globals.css";
import "./CardViewer.css";

function CardViewer({ cards, name }) {
    const [pos, setPos] = useState(0);
    const [front, setFront] = useState(true);
    
    if (!isLoaded(cards))
        return <div>Loading cards...</div>;

    if (isEmpty(cards))
        return <div>Invalid deck!</div>;

    if (cards.length === 0)
    {
        return <div className="container">
            <h2>Card Viewer</h2>
            <h3>No flashcards!</h3>
        </div>
    }

    if (cards.length > 0 && (pos >= cards.length || pos < 0))
    {
        setPos(0);
    }

    function handlePreviousCard() {
        setPos(o => Math.max(0, o - 1));
        setFront(true);
    }
    
    function handleNextCard() {
        setPos(o => Math.min(o + 1, cards.length - 1));
        setFront(true);
    }

    return (
      <div className="main-container">
        <Link to="/" className="link-return">
          <div className="link-return-inner">
          <svg
            clip-rule="evenodd"
            fill-rule="evenodd"
            stroke-linejoin="round"
            stroke-miterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="link-return-icon"
            >
            <path
              d="m10.978 14.999v3.251c0 .412-.335.75-.752.75-.188 0-.375-.071-.518-.206-1.775-1.685-4.945-4.692-6.396-6.069-.2-.189-.312-.452-.312-.725 0-.274.112-.536.312-.725 1.451-1.377 4.621-4.385 6.396-6.068.143-.136.33-.207.518-.207.417 0 .752.337.752.75v3.251h9.02c.531 0 1.002.47 1.002 1v3.998c0 .53-.471 1-1.002 1z"
              fill-rule="nonzero"
            />
          </svg>
          <p className="link-return-desc">Back to decks</p>
            </div>
        </Link>
        <h2>Deck Viewer</h2>
        <h4>{name}</h4>
        <div>
          <p className="card-place">
            Card {pos + 1} of {cards.length}
          </p>
          <button
            className={`flashcard${front ? "" : " flashcard-back"}`}
            onClick={() => setFront((o) => !o)}
          >
            <h2>{front ? cards[pos].front : cards[pos].back}</h2>
          </button>
        </div>
        <div className="viewer-btns">
          <button
            disabled={pos <= 0}
            onClick={handlePreviousCard}
            className="viewer-btn-prev"
            alt="Previous card"
          >
            <svg
              clip-rule="evenodd"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m10.978 14.999v3.251c0 .412-.335.75-.752.75-.188 0-.375-.071-.518-.206-1.775-1.685-4.945-4.692-6.396-6.069-.2-.189-.312-.452-.312-.725 0-.274.112-.536.312-.725 1.451-1.377 4.621-4.385 6.396-6.068.143-.136.33-.207.518-.207.417 0 .752.337.752.75v3.251h9.02c.531 0 1.002.47 1.002 1v3.998c0 .53-.471 1-1.002 1z"
                fill-rule="nonzero"
              />
            </svg>
          </button>
          <button
            disabled={pos >= cards.length - 1}
            onClick={handleNextCard}
            className="viewer-btn-next"
            alt="Next card"
          >
            <svg
              clip-rule="evenodd"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z"
                fill-rule="nonzero"
              />
            </svg>
          </button>
        </div>
        <br />
        <br />
      </div>
    );
}

// export default firebaseConnect()(CardViewer);

function mapStateToProps(state, props) {
    const deck = state?.firebase?.data[props.router.params.deckid];
    const name = deck?.name ?? '(no deck name)';
    const cards = deck?.cards ?? [];
    return { name: name, cards: cards };
}

export default compose(
    withRouter,
    firebaseConnect((props) => {
        const deckid = props.router.params.deckid;
        return [{ path: `/flashcards/${deckid}`, storeAs: deckid }];
    }),
    connect(mapStateToProps),
)(CardViewer);