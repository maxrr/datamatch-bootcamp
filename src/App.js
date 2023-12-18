// import logo from './logo.svg';

import { useState } from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';

function App() {
  const [cards, setCards] = useState([{ front: "front1", back: "back1" }, { front: "front2", back: "back2" }]);
  const [editor, setEditor] = useState(true);

  function addCard(card) {
    setCards(o => [...o, card]);
  }

  function deleteCard(ix) {
    setCards(o => [...o.slice(0, ix), ...o.slice(ix + 1)]);
  }

  function switchModes() {
    console.log('called');
    setEditor(e => !e);
  }

  return <div>
    {
      editor ? <CardEditor cards={cards} addCard={addCard} deleteCard={deleteCard} /> : <CardViewer cards={cards} />
    }
    <br />
    <button onClick={switchModes}>Go to card {editor ? "viewer" : "editor"}</button>
  </div>
}

export default App;
