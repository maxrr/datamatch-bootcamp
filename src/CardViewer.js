import React, { useState } from 'react';
import "./CardViewer.css";
import { Link } from "react-router-dom";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "./WithRouter";

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

    return <div className="container">
        <h2>Card Viewer</h2>
        <h3>{name}</h3>
        <p>Card {pos + 1} of {cards.length}</p>
        <button className="flashcard" onClick={() => setFront(o => !o)}><div>{front ? cards[pos].front : cards[pos].back}</div></button>
        <br />
        <br />
        <button disabled={pos <= 0} onClick={handlePreviousCard}>Previous card</button>
        <button disabled={pos >= cards.length - 1} onClick={handleNextCard}>Next card</button>
        <br />
        <br />
        <Link to="/">Home</Link>
    </div>
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