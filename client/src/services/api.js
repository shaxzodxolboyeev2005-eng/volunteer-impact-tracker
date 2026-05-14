import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const getVolunteers = () => API.get('/volunteers');
export const createVolunteer = (data) => API.post('/volunteers', data);
export const getProjects = () => API.get('/projects');
export const createProject = (data) => API.post('/projects', data);
export const getImpacts = () => API.get('/impacts');
export const createImpact = (data) => API.post('/impacts', data);
export const getStats = () => API.get('/stats');

export default API;
