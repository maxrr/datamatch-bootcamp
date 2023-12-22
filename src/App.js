// import logo from './logo.svg';

import { useState } from 'react';
import Homepage from './Homepage';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import { Route, Routes } from "react-router-dom";

function App() {
  const [cards, setCards] = useState([{ front: "front1", back: "back1" }, { front: "front2", back: "back2" }]);

  function addCard(card) {
    setCards(o => [...o, card]);
  }

  function deleteCard(ix) {
    setCards(o => [...o.slice(0, ix), ...o.slice(ix + 1)]);
  }

  return <Routes>
    <Route path="/" element={<Homepage />} />
    <Route exact path="/editor" element={<CardEditor cards={cards} addCard={addCard} deleteCard={deleteCard} />} />
    <Route exact path="/viewer" element={<CardViewer cards={cards} />} />
  </Routes>
}

export default App;
