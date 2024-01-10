import React from 'react';
import Table from './Table';

const characters = [
  {
    name: 'Charlie',
    job: 'Janitor',
  },
  {
    name: 'Mac',
    job: 'Bouncer',
  },
  {
    name: 'Dee',
    job: 'Aspring actress',
  },
  {
    name: 'Dennis',
    job: 'Bartender',
  },
];

function App() {
  return (
    <div className="container">
      <Table characterData={characters} />
    </div>
  );
}

export default App;