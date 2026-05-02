import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Requests from './components/Requests';
import Messages from './components/Messages';
import './App.css';

function App() {
  const [conversations, setConversations] = useState({
    1: [
      { id: 1, text: 'Hello', type: 'received' },
      { id: 2, text: 'Hi, je peux aider avec ta demande.', type: 'sent' },
    ],
    2: [
      { id: 1, text: 'Bonjour, tu es libre ce week-end ?', type: 'received' },
    ],
    3: [
      { id: 1, text: 'Salut, j’ai besoin d’un coup de main.', type: 'received' },
    ],
    4: [
      { id: 1, text: 'Est-ce que la bibliothèque est ouverte ?', type: 'received' },
    ],
  });

  const [contacts, setContacts] = useState([
    { id: 1, name: 'Jean Donley', initials: 'JD' },
    { id: 2, name: 'Jolibois Towensia', initials: 'JT' },
    { id: 3, name: 'Ilnea Jojada', initials: 'IJ' },
    { id: 4, name: 'Jean Itoodens', initials: 'JI' },
  ]);

  const addMessageToConversation = (contactName, messageText) => {
    // Trouver ou créer un contact
    let contact = contacts.find(c => c.name === contactName);
    if (!contact) {
      const newId = Math.max(...contacts.map(c => c.id)) + 1;
      contact = { id: newId, name: contactName, initials: contactName.split(' ').map(n => n[0]).join('').toUpperCase() };
      setContacts([...contacts, contact]);
    }

    // Ajouter le message à la conversation
    const currentMessages = conversations[contact.id] || [];
    const newMessage = {
      id: currentMessages.length + 1,
      text: messageText,
      type: 'sent'
    };

    setConversations({
      ...conversations,
      [contact.id]: [...currentMessages, newMessage]
    });

    return contact.id;
  };

  return (
    <Router>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <div className="sidebar-brand-icon">📌</div>
            <div>
              <strong>Entraide</strong>
              <div>Université</div>
            </div>
          </div>

          <nav className="sidebar-nav">
            <Link to="/requests" className="sidebar-link">Demandes</Link>
            <Link to="/messages" className="sidebar-link">Messages</Link>
          </nav>
        </aside>

        <main className="page-content">
          <Routes>
            <Route path="/requests" element={<Requests addMessageToConversation={addMessageToConversation} />} />
            <Route path="/messages" element={<Messages conversations={conversations} contacts={contacts} setConversations={setConversations} />} />
            <Route path="/" element={<Requests addMessageToConversation={addMessageToConversation} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
