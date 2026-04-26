import React, { useState, useEffect } from 'react';
import API from './api';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', description: '', category: '', quantity: 1, isPacked: false });

  const fetchItems = async () => {
    try {
      const res = await API.get('/items');
      setItems(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/items/add', formData);
      setFormData({ name: '', description: '', category: '', quantity: 1, isPacked: false });
      fetchItems();
    } catch (err) { alert('Error adding item'); }
  };

  const deleteItem = async (id) => {
    await API.delete(`/items/${id}`);
    fetchItems();
  };

  // Filter and Sort Logic
  const filteredItems = items
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b.quantity - a.quantity);

  return (
    <div className="container">
      <header>
        <h1>📦 Inventory Dash</h1>
        <input 
          className="search-bar" 
          placeholder="Search items..." 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </header>

      <section className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input name="name" placeholder="Item Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            <input name="category" placeholder="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required />
          </div>
          <textarea name="description" placeholder="Notes/Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          <div className="form-footer">
            <input type="number" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
            <button type="submit">Add to List</button>
          </div>
        </form>
      </section>

      <div className="grid">
        {filteredItems.map(item => (
          <div key={item._id} className={`card ${item.category.toLowerCase()}`}>
            <div className="card-header">
              <span className="badge">{item.category}</span>
              <button className="del-btn" onClick={() => deleteItem(item._id)}>×</button>
            </div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="card-footer">
               <strong>Qty: {item.quantity}</strong>
               <label>
                 <input type="checkbox" checked={item.isPacked} readOnly /> Done
               </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;