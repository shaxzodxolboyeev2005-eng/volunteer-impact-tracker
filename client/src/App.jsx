import { useState, useEffect } from 'react';
import { getVolunteers, getProjects, getImpacts, createImpact } from './services/api';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import './App.css';

const AVATARS = ['👨‍💻', '👩‍🎓', '🏐', '🎨', '🌿', '🦾', '🌍', '📚'];
const ADMIN_PASSWORD = "cau_admin_2026"; 

function App() {
  const [volunteers, setVolunteers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [impacts, setImpacts] = useState([]);
  const [activeTab, setActiveTab] = useState('volunteers');
  const [userRole, setUserRole] = useState('volunteer');
  const [showReg, setShowReg] = useState(false);
  
  const [newImpact, setNewImpact] = useState({ volunteerId: '', projectId: '', hoursSpent: '', description: '' });
  const [regData, setRegData] = useState({ name: '', email: '' });
  const [projectData, setProjectData] = useState({ title: '', description: '' });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [v, p, i] = await Promise.all([getVolunteers(), getProjects(), getImpacts()]);
      setVolunteers(v.data);
      setProjects(p.data);
      setImpacts(i.data.reverse());
    } catch (err) { console.error("Fetch error"); }
  };

  const checkAuth = () => {
    const pass = prompt("Enter Admin Password to proceed:");
    return pass === ADMIN_PASSWORD;
  };

  const generatePDF = (volunteer) => {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    doc.setFillColor(26, 35, 126);
    doc.rect(0, 0, 297, 20, 'F');
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("CENTRAL ASIAN UNIVERSITY", 148, 12, { align: "center" });
    doc.setTextColor(26, 35, 126);
    doc.setFontSize(40);
    doc.text("CERTIFICATE", 148, 60, { align: "center" });
    doc.setFontSize(28);
    doc.setTextColor(255, 92, 103);
    doc.text(volunteer.name.toUpperCase(), 148, 110, { align: "center" });
    doc.setFontSize(16);
    doc.setTextColor(100, 100, 100);
    doc.text(`Total Impact: ${volunteer.totalHours || 0} Hours`, 148, 130, { align: "center" });
    doc.text(`Official Record: ${new Date().toLocaleDateString()}`, 148, 140, { align: "center" });
    doc.save(`Cert_${volunteer.name}.pdf`);
  };

  const handleAction = async () => {
    if (!checkAuth()) return alert("Access Denied: Wrong Password");
    try {
      if (userRole === 'volunteer') {
        await axios.post('http://localhost:5000/api/volunteers', regData);
      } else {
        await axios.post('http://localhost:5000/api/projects', projectData);
      }
      setShowReg(false);
      setRegData({ name: '', email: '' });
      setProjectData({ title: '', description: '' });
      fetchData();
    } catch (err) { alert("Error saving data"); }
  };

  const handleLogImpact = async () => {
    if (!newImpact.volunteerId || !newImpact.projectId || !newImpact.hoursSpent) return alert("Fill all fields");
    if (!checkAuth()) return alert("Access Denied");
    try {
      await createImpact(newImpact);
      setNewImpact({ volunteerId: '', projectId: '', hoursSpent: '', description: '' });
      fetchData();
      alert("Impact Logged!");
    } catch (err) { alert("Error logging impact"); }
  };

  return (
    <div className='app'>
      {showReg && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2>{userRole === 'volunteer' ? 'Register Student' : 'New Initiative'}</h2>
            {userRole === 'volunteer' ? (
              <>
                <input placeholder="Full Name" value={regData.name} onChange={e => setRegData({...regData, name: e.target.value})} />
                <input placeholder="CAU Email" value={regData.email} onChange={e => setRegData({...regData, email: e.target.value})} />
              </>
            ) : (
              <>
                <input placeholder="Project Name" value={projectData.title} onChange={e => setProjectData({...projectData, title: e.target.value})} />
                <input placeholder="Focus Area" value={projectData.description} onChange={e => setProjectData({...projectData, description: e.target.value})} />
              </>
            )}
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px'}}>
              <button className='primary-btn' onClick={handleAction}>Submit</button>
              <button className='cancel-btn' onClick={()=>setShowReg(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <nav className='nav-bar'>
        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
          <div className='logo-circle'>CAU</div>
          <span style={{fontWeight: 800, color: '#1a237e', fontSize: '1.2rem'}}>Impact Hub</span>
        </div>
        <div className='role-switcher'>
          <button className={`role-btn ${userRole === 'volunteer' ? 'active' : ''}`} onClick={()=>setUserRole('volunteer')}>Student</button>
          <button className={`role-btn ${userRole === 'org' ? 'active' : ''}`} onClick={()=>setUserRole('org')}>Organization</button>
        </div>
      </nav>

      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'40px'}}>
        <h1 style={{margin:0, fontSize:'2.8rem', color:'#1a237e'}}>Board</h1>
        <button className='primary-btn' style={{padding:'12px 30px'}} onClick={()=>setShowReg(true)}>+ {userRole === 'volunteer' ? 'Join' : 'Post'}</button>
      </div>

      <div className='tabs'>
        <button className={activeTab === 'volunteers' ? 'active' : ''} onClick={()=>setActiveTab('volunteers')}>Community</button>
        <button className={activeTab === 'impacts' ? 'active' : ''} onClick={()=>setActiveTab('impacts')}>Log Work</button>
      </div>

      <main>
        {activeTab === 'volunteers' ? (
          <>
            <div className='grid'>
              {volunteers.map((v, idx) => (
                <div key={v._id} className='card'>
                  <div className='card-header'>
                    <div className='avatar-large'>{AVATARS[idx % AVATARS.length]}</div>
                    <span style={{background:'#f4f7fe', padding:'4px 8px', borderRadius:'6px', fontSize:'0.7rem', fontWeight:800}}>ID: {v._id.slice(-4)}</span>
                  </div>
                  <h4>{v.name}</h4>
                  <p>{v.email}</p>
                  <div style={{marginTop: '20px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <span style={{color:'#ff5c67', fontSize:'1.1rem', fontWeight:800}}>{v.totalHours || 0}h</span>
                    <button className='cert-download-btn' onClick={() => generatePDF(v)}>Certificate</button>
                  </div>
                </div>
              ))}
            </div>
            <div className='activity-feed'>
              <h3 style={{marginTop: 0, color: '#1a237e'}}>Recent Activity</h3>
              {impacts.slice(0, 5).map(imp => (
                <div key={imp._id} className='activity-item'>
                  <div className='avatar-mini'>✨</div>
                  <div>
                    <span style={{fontWeight: 700}}>{imp.volunteerId?.name || 'User'}</span>
                    <span style={{color: '#757575'}}> added </span>
                    <span style={{fontWeight: 800}}>{imp.hoursSpent}h</span>
                    <span style={{color: '#757575'}}> to </span>
                    <span style={{fontWeight: 700, color: '#ff5c67'}}>{imp.projectId?.title || 'Project'}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className='card' style={{maxWidth: '480px', margin: '0 auto'}}>
            <h3 style={{marginTop:0}}>Submit New Record</h3>
            <label style={{fontSize:'0.8rem', fontWeight:800, color:'#1a237e'}}>STUDENT</label>
            <select value={newImpact.volunteerId} onChange={e => setNewImpact({...newImpact, volunteerId: e.target.value})}>
              <option value="">Select Student...</option>
              {volunteers.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
            </select>
            <label style={{fontSize:'0.8rem', fontWeight:800, color:'#1a237e', marginTop:'15px', display:'block'}}>PROJECT</label>
            <select value={newImpact.projectId} onChange={e => setNewImpact({...newImpact, projectId: e.target.value})}>
              <option value="">Select Initiative...</option>
              {projects.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
            </select>
            <label style={{fontSize:'0.8rem', fontWeight:800, color:'#1a237e', marginTop:'15px', display:'block'}}>HOURS</label>
            <input type="number" placeholder="0" value={newImpact.hoursSpent} onChange={e => setNewImpact({...newImpact, hoursSpent: e.target.value})} />
            <button className='primary-btn' style={{width: '100%', marginTop:'10px'}} onClick={handleLogImpact}>Confirm Submission</button>
          </div>
        )}
      </main>
    </div>
  );
}
export default App;
