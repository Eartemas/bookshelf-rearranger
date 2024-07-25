// client/src/App.js

import React from 'react';
import OCRTest from './components/OCRTest'; // Import the new OCRTest component

function App() {
  return (
    <div className="App">
      <h1>Bookshelf Rearranger</h1>
      <OCRTest /> {/* Add OCRTest to your app */}
    </div>
  );
}

export default App;
