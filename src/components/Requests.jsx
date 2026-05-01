import { useState } from 'react';
import '../components/Requests.css';

const Requests = ({ addMessageToConversation }) => {
  const [requests, setRequests] = useState([
    { id: 1, title: 'Aide pour les courses', location: 'Puits-Salée', priority: 'urgent', author: 'Meri', hasNewMessage: true, notifications: 2 },
    { id: 2, title: 'Soutien scolaire', location: 'Mexi', priority: 'moderate', author: 'Sami', hasNewMessage: false, notifications: 0 },
    { id: 3, title: 'Jardinage', location: 'La Haute Jolibois', priority: 'urgent', author: 'Jean', hasNewMessage: true, notifications: 1 },
  ]);

  const [newRequest, setNewRequest] = useState({ title: '', location: '', priority: 'moderate' });
  const [messageModal, setMessageModal] = useState({ isOpen: false, requestId: null, recipient: '' });
  const [messageText, setMessageText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newRequest.title && newRequest.location) {
      setRequests([
        ...requests,
        {
          id: requests.length + 1,
          title: newRequest.title,
          location: newRequest.location,
          priority: newRequest.priority,
          author: 'Vous',
          hasNewMessage: false,
          notifications: 0,
        },
      ]);
      setNewRequest({ title: '', location: '', priority: 'moderate' });
    }
  };

  const handleViewDetails = (requestId) => {
    // Simuler l'ouverture des détails
    alert(`Détails de la demande #${requestId} - Fonctionnalité à implémenter`);
  };

  const handleSendMessage = (requestId) => {
    const request = requests.find(req => req.id === requestId);
    if (request) {
      setMessageModal({ isOpen: true, requestId, recipient: request.author });
      setMessageText('');
    }
  };

  const handleSendMessageSubmit = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      // Ajouter le message à la conversation dans Messages
      addMessageToConversation(messageModal.recipient, messageText);

      // Marquer les notifications comme lues
      setRequests(requests.map(req =>
        req.id === messageModal.requestId
          ? { ...req, hasNewMessage: false, notifications: 0 }
          : req
      ));

      alert(`Message envoyé à ${messageModal.recipient} et ajouté aux conversations !`);
      setMessageModal({ isOpen: false, requestId: null, recipient: '' });
      setMessageText('');
    }
  };

  const handleCloseModal = () => {
    setMessageModal({ isOpen: false, requestId: null, recipient: '' });
    setMessageText('');
  };

  const handleNotificationClick = (requestId) => {
    // Marquer les notifications comme lues
    setRequests(requests.map(req =>
      req.id === requestId
        ? { ...req, notifications: 0 }
        : req
    ));
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Demandes</h1>
          <p>Gérez les demandes d'aide des étudiants de votre université.</p>
        </div>
        <div className="page-toolbar">
          <button type="button">Rechercher</button>
          <button type="button">Notifications</button>
        </div>
      </div>

      <div className="requests-grid">
        {requests.map((request) => (
          <div className="request-card" key={request.id}>
            <div className="request-main">
              <h2>{request.title}</h2>
              <div className="request-details">
                <span className="request-pill">📍 {request.location}</span>
                <span className={`request-pill ${request.priority === 'urgent' ? 'urgent' : 'moderate'}`}>
                  {request.priority === 'urgent' ? 'Urgent' : 'Modéré'}
                </span>
                {request.notifications > 0 && (
                  <span className="request-pill notification" onClick={() => handleNotificationClick(request.id)}>
                    🔔 {request.notifications} notification{request.notifications > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <small>Publié par {request.author}</small>
            </div>
            <div className="request-actions">
              <button type="button" onClick={() => handleViewDetails(request.id)}>Voir détail</button>
              <button
                type="button"
                className="secondary"
                onClick={() => handleSendMessage(request.id)}
              >
                {request.hasNewMessage ? '💬 Répondre' : '💬 Message'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal pour envoyer un message */}
      {messageModal.isOpen && (
        <div className="message-modal-overlay" onClick={handleCloseModal}>
          <div className="message-modal" onClick={(e) => e.stopPropagation()}>
            <div className="message-modal-header">
              <h3>Envoyer un message à {messageModal.recipient}</h3>
              <button type="button" className="close-button" onClick={handleCloseModal}>×</button>
            </div>
            <form onSubmit={handleSendMessageSubmit}>
              <textarea
                placeholder="Tapez votre message ici..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows="4"
                required
              />
              <div className="message-modal-actions">
                <button type="button" onClick={handleCloseModal}>Annuler</button>
                <button type="submit" className="send-button">Envoyer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="add-request-card">
        <h2>Ajouter une nouvelle demande</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Titre de la demande"
            value={newRequest.title}
            onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Lieu"
            value={newRequest.location}
            onChange={(e) => setNewRequest({ ...newRequest, location: e.target.value })}
          />
          <select
            value={newRequest.priority}
            onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value })}
          >
            <option value="moderate">Modéré</option>
            <option value="urgent">Urgent</option>
          </select>
          <button type="submit">Publier la demande</button>
        </form>
      </div>
    </div>
  );
};

export default Requests;