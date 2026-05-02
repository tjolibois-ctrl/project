import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Bienvenue sur Entraide</h1>
        <p>Une plateforme d'entraide mutuelle pour la communauté universitaire.</p>
      </div>
      <div className="home-features">
        <div className="feature-card">
          <div className="feature-card-icon">📋</div>
          <h2>Demandes</h2>
          <p>Publiez vos demandes d'aide et trouvez des personnes pour vous assister.</p>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">💬</div>
          <h2>Messages</h2>
          <p>Communiquez directement avec les membres de la communauté.</p>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">🤝</div>
          <h2>Entraide</h2>
          <p>Échangez des services et de l'aide mutuelle entre étudiants.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;