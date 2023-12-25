import React, { useState } from "react";
import "./CardEditor.css";
import { Link } from "react-router-dom";
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from "redux";
import { withRouter } from "./WithRouter";

function CardEditor({ firebase, router }) {
  const [cards, setCards] = useState([
    { front: "front1", back: "back1" },
    { front: "front2", back: "back2" },
    { front: "front3", back: "back3" },
    { front: "front4", back: "back4" },
    { front: "front5", back: "back5" },
    { front: "front6", back: "back6" },
  ]);
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const [name, setName] = useState("");

  function handleAddCard() {
    if (cardFront.trim().length === 0 || cardBack.trim().length === 0) return;

    // addCard({
    //   front: cardFront,
    //   back: cardBack,
    // });

    const newCard = { front: cardFront, back: cardBack };
    setCards(o => o.slice().concat(newCard));
    
    setCardFront("");
    setCardBack("");
  }

  function handleDeleteCard(ix) {
    if (cards.length <= 1)
      return alert("You must have at least one flashcard!");

    setCards(o => [...o.slice(0, ix), ...o.slice(ix + 1, o.length)]);
    // deleteCard(ix);
  }

  async function handleCreateDeck() {
    if (cards.length <= 1)
      return alert("You must have at least one flashcard!");

    if (name.trim().length <= 0)
      return alert("You must specify a valid deck name!");

    const deckId = firebase.push("/flashcards").key;
    let updates = {};
    updates[`/flashcards/${deckId}`] = { cards: cards, name: name };
    updates[`/homepage/${deckId}`] = { name: name };

    try {
      await firebase.update("/", updates);
      alert("New deck added!");
      router.navigate(`/viewer/${deckId}`);
    } catch (err) {
      console.error(err);
      alert("Sorry, an error has occurred. Please try again later.");
    }
    
  }

  return (
    <div className="container">
      <h2>Card Editor</h2>
      <p>Deck name</p>
      <input
        name="deckName"
        placeholder="Super cool flashcards"
        value={name}
        onChange={(n) => setName(n.target.value)}
      />
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>Front</th>
            <th>Back</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((c, ix) => (
            <tr key={c.front + c.back}>
              <td>{c.front ?? "Front of card"}</td>
              <td>{c.back ?? "Back of card"}</td>
              <td>
                <button onClick={() => handleDeleteCard(ix)}>
                  Delete card
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <input
        name="cardFront"
        placeholder="Front of card"
        value={cardFront}
        onChange={(n) => setCardFront(n.target.value)}
      />
      <input
        name="cardBack"
        placeholder="Back of card"
        value={cardBack}
        onChange={(n) => setCardBack(n.target.value)}
      />
      <button
        onClick={handleAddCard}
        disabled={cardFront.trim().length === 0 || cardBack.trim().length === 0}
      >
        Add card
      </button>
      <br />
      <hr />
      <button
        onClick={handleCreateDeck}
        disabled={cards.length === 0 || name.trim().length === 0}
      >
        Create deck
      </button>
      <br />
      <br />
      <Link to="/">Home</Link>
    </div>
  );
}
export default compose(
  withRouter, 
  firebaseConnect(),
)(CardEditor);
