import React, { useState } from 'react';
import "./CardViewer.css";
import { Link } from "react-router-dom";

function CardViewer({ cards }) {
    const [pos, setPos] = useState(0);
    const [front, setFront] = useState(true);

    if (cards.length === 0)
    {
        return <div class="container">
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

    return <div class="container">
        <h2>Card Viewer</h2>
        <h3>Card {pos + 1} of {cards.length}</h3>
        <button class="flashcard" onClick={() => setFront(o => !o)}><div>{front ? cards[pos].front : cards[pos].back}</div></button>
        <br />
        <br />
        <button disabled={pos <= 0} onClick={handlePreviousCard}>Previous card</button>
        <button disabled={pos >= cards.length - 1} onClick={handleNextCard}>Next card</button>
        <br />
        <br />
        <Link to="/editor"><button>Go to editor</button></Link>
    </div>
}

export default CardViewer;