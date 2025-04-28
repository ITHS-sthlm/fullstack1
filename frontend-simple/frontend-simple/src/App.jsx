import { useEffect, useState } from 'react';
import axios from 'axios'; // Vi använder axios för API-anrop

function App() {
  const [items, setItems] = useState([]); // Lista av items
  const [newItem, setNewItem] = useState(''); // Input för nytt item
  const apiUrl = 'http://localhost:3000/items'; // Din backend-URL

  // Hämta alla items
  const fetchItems = async () => {
    try {
      const response = await axios.get(apiUrl);
      setItems(response.data);
    } catch (error) {
      console.error('Fel vid hämtning', error);
    }
  };

  // Lägg till nytt item
  const addItem = async () => {
    if (!newItem.trim()) return;

    try {
      await axios.post(apiUrl, { name: newItem });
      setNewItem('');
      fetchItems();
    } catch (error) {
      console.error('Fel vid tillägg', error);
    }
  };

  // Uppdatera ett item
  const updateItem = async (id) => {
    const newName = prompt('Ange nytt namn:');
    if (!newName) return;

    try {
      await axios.put(`${apiUrl}/${id}`, { name: newName });
      fetchItems();
    } catch (error) {
      console.error('Fel vid uppdatering', error);
    }
  };

  // Ta bort ett item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Fel vid borttagning', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Fullstack App (React + Node.js + SQLite)</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Nytt item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={addItem} style={{ marginLeft: '0.5rem' }}>Lägg till</button>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} {' '}
            <button onClick={() => updateItem(item.id)}>Uppdatera</button>{' '}
            <button onClick={() => deleteItem(item.id)}>Ta bort</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
