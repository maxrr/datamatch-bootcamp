import React, { useState } from "react";
import './CardEditor.css';

function CardEditor({ cards, addCard, deleteCard }) {
    const [cardFront, setCardFront] = useState("");
    const [cardBack, setCardBack] = useState("");

    function handleAddCard() {
        if (cardFront.trim().length === 0 || cardBack.trim().length === 0)
            return;

        addCard({
            front: cardFront,
            back: cardBack,
        });
        setCardFront("");
        setCardBack("");
    }

    function handleDeleteCard(ix) {
        if (cards.length === 1)
            return alert("You must have at least one flashcard!");

        deleteCard(ix);
    }

    return <div>
        <h2>Card Editor</h2>
        <table>
            <thead>
                <tr>
                    <th>Front</th>
                    <th>Back</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    cards.map((c, ix) => <tr key={c.front + c.back}>
                        <td>{c.front ?? "Front of card"}</td>
                        <td>{c.back ?? "Back of card"}</td>
                        <td><button onClick={() => handleDeleteCard(ix)}>Delete card</button></td>
                    </tr>)
                }
            </tbody>
        </table>
        <br />
        <input name="cardFront" placeholder="Front of card" value={cardFront} onChange={n => setCardFront(n.target.value)}/>
        <input name="cardBack" placeholder="Back of card" value={cardBack} onChange={n => setCardBack(n.target.value)}/>
        <button onClick={handleAddCard}>Add card</button>
    </div>
}
export default CardEditor;