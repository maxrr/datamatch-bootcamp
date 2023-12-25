// import logo from './logo.svg';

// import { useState } from 'react';
import Homepage from './Homepage';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
// import TestHOC from "./TestHOC";
import { Route, Routes } from "react-router-dom";

function App() {
  return <Routes>
    <Route path="/" element={<Homepage />} />
    <Route exact path="/editor" element={<CardEditor />} />
    <Route path="/viewer/:deckid" element={<CardViewer />} />
    {/* <Route path="/test/:id" element={<TestHOC />} /> */}
  </Routes>
}

export default App;
