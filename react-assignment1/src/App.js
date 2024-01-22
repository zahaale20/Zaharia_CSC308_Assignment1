import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

function App() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const userToDelete = characters[index];
    if (userToDelete && userToDelete.id) {
      axios.delete(`http://localhost:8000/users/${userToDelete.id}`)
        .then(response => {
          if (response.status === 204) {
            const updated = characters.filter((character, i) => i !== index);
            setCharacters(updated);
          }
        })
        .catch(error => {
          console.error("There was an error deleting the user!", error);
        });
    }
  }

  function updateList(person) {
    makePostCall(person).then(result => {
      if (result && result.status === 201) {
        setCharacters([...characters, result.data]); // Updating state with the object returned from the backend
      }
    });
  }

  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:8000/users');
       return response.data.users_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
  }

  useEffect(() => {
    fetchAll().then( result => {
      if (result)
        setCharacters(result);
    });
  }, [] );

  async function makePostCall(person){
    try {
      const response = await axios.post('http://localhost:8000/users', person);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  function updateList(person) {
    makePostCall(person).then(result => {
      if (result && result.status === 201) {
        setCharacters([...characters, result.data]);
      }
    });
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );

}

export default App;