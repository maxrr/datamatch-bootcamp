import React, { useState } from "react";
import { Link } from "react-router-dom";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { withRouter } from "./WithRouter";
import "./CardEditor.css";
import "./Globals.css";

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
    setCards((o) => o.slice().concat(newCard));

    setCardFront("");
    setCardBack("");
  }

  function handleDeleteCard(ix) {
    if (cards.length <= 1)
      return alert("You must have at least one flashcard!");

    setCards((o) => [...o.slice(0, ix), ...o.slice(ix + 1, o.length)]);
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
      <h2>Card Editor</h2>
      <div className="container-input">
        <p>Deck name</p>
        <input
          name="deckName"
          placeholder="Super cool flashcards"
          value={name}
          onChange={(n) => setName(n.target.value)}
        />
      </div>
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
      <hr />
      <h4>New card</h4>
      <div className="container-input">
        <p>Front of card</p>
        <input
          name="cardFront"
          placeholder="Term"
          value={cardFront}
          onChange={(n) => setCardFront(n.target.value)}
        />
      </div>
      <div className="container-input">
        <p>Back of card</p>
        <input
          name="cardBack"
          placeholder="Definition"
          value={cardBack}
          onChange={(n) => setCardBack(n.target.value)}
        />
      </div>
      <div className="editor-container-btns">
        <button
          onClick={handleAddCard}
          disabled={
            cardFront.trim().length === 0 || cardBack.trim().length === 0
          }
        >
          Add card
        </button>
        <button
          onClick={handleCreateDeck}
          disabled={cards.length === 0 || name.trim().length === 0}
        >
          Create deck
        </button>
      </div>
    </div>
  );
}
export default compose(withRouter, firebaseConnect())(CardEditor);
