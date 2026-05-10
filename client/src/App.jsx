import { useState, useEffect } from 'react';
import { getVolunteers, getProjects, getImpacts } from './services/api';
import './App.css';

function App() {
  const [volunteers, setVolunteers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [impacts, setImpacts] = useState([]);
  const [activeTab, setActiveTab] = useState('volunteers');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [v, p, i] = await Promise.all([
        getVolunteers(),
        getProjects(),
        getImpacts()
      ]);
      setVolunteers(v.data);
      setProjects(p.data);
      setImpacts(i.data);
      setError(null);
    } catch (err) {
      setError('Server is offline. Start the backend first.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='app'>
      <header className='header'>
        <h1>Volunteer Impact Tracker</h1>
        <p>Track hours, measure social impact</p>
      </header>

      <div className='stats'>
        <div className='stat-card'>
          <h3>{volunteers.length}</h3>
          <p>Volunteers</p>
        </div>
        <div className='stat-card'>
          <h3>{projects.length}</h3>
          <p>Projects</p>
        </div>
        <div className='stat-card'>
          <h3>{impacts.length}</h3>
          <p>Impact Records</p>
        </div>
      </div>

      <nav className='tabs'>
        <button
          className={activeTab === 'volunteers' ? 'active' : ''}
          onClick={() => setActiveTab('volunteers')}>
          Volunteers
        </button>
        <button
          className={activeTab === 'projects' ? 'active' : ''}
          onClick={() => setActiveTab('projects')}>
          Projects
        </button>
        <button
          className={activeTab === 'impacts' ? 'active' : ''}
          onClick={() => setActiveTab('impacts')}>
          Impacts
        </button>
      </nav>

      {loading && <p className='loading'>Loading...</p>}
      {error && <p className='error'>{error}</p>}

      <main className='content'>
        {activeTab === 'volunteers' && (
          <div>
            <h2>Volunteers ({volunteers.length})</h2>
            {volunteers.length === 0 ? (
              <p>No volunteers yet.</p>
            ) : (
              volunteers.map(v => (
                <div key={v._id} className='card'>
                  <h4>{v.name}</h4>
                  <p>{v.email}</p>
                  <p>Hours: {v.totalHours}</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'projects' && (
          <div>
            <h2>Projects ({projects.length})</h2>
            {projects.length === 0 ? (
              <p>No projects yet.</p>
            ) : (
              projects.map(p => (
                <div key={p._id} className='card'>
                  <h4>{p.title}</h4>
                  <p>{p.description}</p>
                  <p>Status: {p.status}</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'impacts' && (
          <div>
            <h2>Impact Records ({impacts.length})</h2>
            {impacts.length === 0 ? (
              <p>No impact records yet.</p>
            ) : (
              impacts.map(i => (
                <div key={i._id} className='card'>
                  <p>Hours: {i.hoursSpent}</p>
                  <p>Score: {i.socialScore}</p>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
