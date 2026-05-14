import { useState, useEffect } from 'react';
import { getVolunteers, getProjects, getImpacts, createVolunteer, createProject, createImpact, getStats } from './services/api';
import Chatbot from './components/Chatbot';
import { FaUsers, FaProjectDiagram, FaStar, FaSearch, FaPlus, FaTrophy, FaClock, FaChartBar } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import './App.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function App() {
  const [volunteers, setVolunteers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [impacts, setImpacts] = useState([]);
  const [stats, setStats] = useState({});
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newVolunteer, setNewVolunteer] = useState({ name: '', email: '' });
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [logWork, setLogWork] = useState({ volunteer: '', project: '', hoursSpent: '', description: '' });
  const [showChat, setShowChat] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [v, p, i, s] = await Promise.all([getVolunteers(), getProjects(), getImpacts(), getStats()]);
      setVolunteers(v.data);
      setProjects(p.data);
      setImpacts(i.data);
      setStats(s.data);
      setError(null);
    } catch (err) {
      setError('Server is offline. Start the backend first.');
    } finally { setLoading(false); }
  };

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleCreateVolunteer = async () => {
    if (!newVolunteer.name || !newVolunteer.email) return;
    try {
      await createVolunteer(newVolunteer);
      setNewVolunteer({ name: '', email: '' });
      fetchData();
      showSuccess('Volunteer added successfully!');
    } catch (err) { setError('Failed to create volunteer.'); }
  };

  const handleCreateProject = async () => {
    if (!newProject.title) return;
    try {
      await createProject(newProject);
      setNewProject({ title: '', description: '' });
      fetchData();
      showSuccess('Project created successfully!');
    } catch (err) { setError('Failed to create project.'); }
  };

  const handleLogWork = async () => {
    if (!logWork.volunteer || !logWork.project || !logWork.hoursSpent) {
      setError('Please fill all required fields.');
      return;
    }
    try {
      await createImpact({ ...logWork, hoursSpent: Number(logWork.hoursSpent) });
      setLogWork({ volunteer: '', project: '', hoursSpent: '', description: '' });
      fetchData();
      showSuccess('Work logged successfully! Social score updated.');
    } catch (err) { setError('Failed to log work.'); }
  };

  const filteredVolunteers = volunteers.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.email.toLowerCase().includes(search.toLowerCase())
  );

  const leaderboard = [...volunteers].sort((a, b) => (b.totalHours || 0) - (a.totalHours || 0)).slice(0, 5);

  const chartData = {
    labels: ['Volunteers', 'Projects', 'Impacts'],
    datasets: [{ data: [volunteers.length, projects.length, impacts.length], backgroundColor: ['#667eea', '#764ba2', '#2ecc71'], borderWidth: 0 }]
  };

  const barData = {
    labels: volunteers.slice(0, 5).map(v => v.name || 'Unknown'),
    datasets: [{ label: 'Hours', data: volunteers.slice(0, 5).map(v => v.totalHours || 0), backgroundColor: '#667eea', borderRadius: 8 }]
  };

  return (
    <div className='app'>
      <header className='header'>
        <div className='header-content'>
          <div>
            <h1>Volunteer Impact Tracker</h1>
            <p>Track hours, measure social impact</p>
          </div>
          <button className='chat-toggle' onClick={() => setShowChat(!showChat)}>
            {showChat ? 'Close Assistant' : 'Ask AI Assistant'}
          </button>
        </div>
      </header>

      {showChat && <Chatbot />}

      <div className='stats'>
        <div className='stat-card'>
          <FaUsers className='stat-icon' />
          <h3>{volunteers.length}</h3>
          <p>Volunteers</p>
        </div>
        <div className='stat-card'>
          <FaProjectDiagram className='stat-icon' />
          <h3>{projects.length}</h3>
          <p>Projects</p>
        </div>
        <div className='stat-card'>
          <FaClock className='stat-icon' />
          <h3>{stats.totalHours || 0}</h3>
          <p>Total Hours</p>
        </div>
        <div className='stat-card'>
          <FaStar className='stat-icon' />
          <h3>{stats.totalSocialScore || 0}</h3>
          <p>Social Score</p>
        </div>
      </div>

      <nav className='tabs'>
        <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}><FaChartBar /> Dashboard</button>
        <button className={activeTab === 'volunteers' ? 'active' : ''} onClick={() => setActiveTab('volunteers')}><FaUsers /> Volunteers</button>
        <button className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}><FaProjectDiagram /> Projects</button>
        <button className={activeTab === 'leaderboard' ? 'active' : ''} onClick={() => setActiveTab('leaderboard')}><FaTrophy /> Leaderboard</button>
        <button className={activeTab === 'logwork' ? 'active' : ''} onClick={() => setActiveTab('logwork')}><FaClock /> Log Work</button>
      </nav>

      {loading && <div className='loading'>Loading...</div>}
      {error && <div className='error' onClick={() => setError(null)}>{error} ✕</div>}
      {success && <div className='success'>{success} ✓</div>}

      <main className='content'>
        {activeTab === 'dashboard' && (
          <div>
            <h2>Overview</h2>
            <div className='charts'>
              <div className='chart-card'>
                <h3>Distribution</h3>
                {volunteers.length + projects.length + impacts.length > 0
                  ? <Doughnut data={chartData} options={{ plugins: { legend: { position: 'bottom' } } }} />
                  : <p className='no-data'>No data yet. Add volunteers and projects!</p>}
              </div>
              <div className='chart-card'>
                <h3>Top Volunteers by Hours</h3>
                {volunteers.length > 0
                  ? <Bar data={barData} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />
                  : <p className='no-data'>No volunteers yet.</p>}
              </div>
            </div>
            <div className='recent'>
              <h3>Recent Volunteers</h3>
              {volunteers.slice(0, 3).map(v => (
                <div key={v._id} className='card'>
                  <div className='card-row'>
                    <FaUsers className='card-icon' />
                    <div><h4>{v.name}</h4><p>{v.email}</p></div>
                    <span className='badge'>{v.totalHours || 0}h</span>
                  </div>
                </div>
              ))}
              {volunteers.length === 0 && <p>No volunteers yet.</p>}
            </div>
          </div>
        )}

        {activeTab === 'volunteers' && (
          <div>
            <div className='form'>
              <h3><FaPlus /> Add Volunteer</h3>
              <input placeholder='Full Name' value={newVolunteer.name} onChange={e => setNewVolunteer({...newVolunteer, name: e.target.value})} />
              <input placeholder='Email Address' value={newVolunteer.email} onChange={e => setNewVolunteer({...newVolunteer, email: e.target.value})} />
              <button onClick={handleCreateVolunteer}>Add Volunteer</button>
            </div>
            <div className='search-bar'>
              <FaSearch className='search-icon' />
              <input placeholder='Search volunteers by name or email...' value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <h2>Volunteers ({filteredVolunteers.length})</h2>
            {filteredVolunteers.length === 0 ? <p>No volunteers found.</p> : filteredVolunteers.map(v => (
              <div key={v._id} className='card'>
                <div className='card-row'>
                  <FaUsers className='card-icon' />
                  <div><h4>{v.name}</h4><p>{v.email}</p></div>
                  <span className='badge'>{v.totalHours || 0}h</span>
                </div>
                <div className='progress-bar'>
                  <div className='progress-fill' style={{ width: Math.min((v.totalHours || 0) * 2, 100) + '%' }}></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'projects' && (
          <div>
            <div className='form'>
              <h3><FaPlus /> Add Project</h3>
              <input placeholder='Project Title' value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} />
              <input placeholder='Description' value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />
              <button onClick={handleCreateProject}>Create Project</button>
            </div>
            <h2>Projects ({projects.length})</h2>
            {projects.length === 0 ? <p>No projects yet.</p> : projects.map(p => (
              <div key={p._id} className='card'>
                <div className='card-row'>
                  <FaProjectDiagram className='card-icon' />
                  <div><h4>{p.title}</h4><p>{p.description || 'No description'}</p></div>
                  <span className={'badge ' + p.status}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div>
            <h2><FaTrophy /> Leaderboard</h2>
            <p className='subtitle'>Top volunteers ranked by hours contributed</p>
            {leaderboard.length === 0 ? <p>No volunteers yet.</p> : leaderboard.map((v, index) => (
              <div key={v._id} className={'card ' + (index < 3 ? 'leaderboard-card' : '')}>
                <div className='card-row'>
                  <span className='rank'>{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '#' + (index + 1)}</span>
                  <div><h4>{v.name}</h4><p>{v.email}</p></div>
                  <div className='score-block'>
                    <span className='badge'>{v.totalHours || 0}h</span>
                    <p className='score-text'>Score: {(v.totalHours || 0) * 10}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'logwork' && (
          <div>
            <h2><FaClock /> Log Work</h2>
            <p className='subtitle'>Record volunteer hours — social score updates automatically</p>
            <div className='form'>
              <h3>Log Hours</h3>
              <select value={logWork.volunteer} onChange={e => setLogWork({...logWork, volunteer: e.target.value})}>
                <option value=''>Select Volunteer</option>
                {volunteers.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
              </select>
              <select value={logWork.project} onChange={e => setLogWork({...logWork, project: e.target.value})}>
                <option value=''>Select Project</option>
                {projects.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
              </select>
              <input type='number' placeholder='Hours spent (e.g. 3)' min='1' value={logWork.hoursSpent} onChange={e => setLogWork({...logWork, hoursSpent: e.target.value})} />
              <input placeholder='Description (optional)' value={logWork.description} onChange={e => setLogWork({...logWork, description: e.target.value})} />
              <button onClick={handleLogWork}>Log Work</button>
            </div>
            <h3>Recent Impact Records ({impacts.length})</h3>
            {impacts.length === 0 ? <p>No impact records yet.</p> : impacts.map(i => (
              <div key={i._id} className='card'>
                <div className='card-row'>
                  <FaClock className='card-icon' />
                  <div>
                    <h4>{i.volunteer?.name || 'Volunteer'} on {i.project?.title || 'Project'}</h4>
                    <p>{i.description || 'No description'}</p>
                  </div>
                  <div className='score-block'>
                    <span className='badge'>{i.hoursSpent}h</span>
                    <p className='score-text'>Score: {i.socialScore}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
