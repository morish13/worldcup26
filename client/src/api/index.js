import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

export const getFixtures = (params = {}) =>
  api.get('/fixtures', { params }).then(r => r.data);

export const getLiveFixtures = () =>
  api.get('/fixtures/live').then(r => r.data);

export const getStandings = () =>
  api.get('/fixtures/standings').then(r => r.data);

export const getTeams = () =>
  api.get('/teams').then(r => r.data);

export const getGroups = () =>
  api.get('/teams/groups').then(r => r.data);

export const getScorers = () =>
  api.get('/stats/scorers').then(r => r.data);

export const getTournamentStats = () =>
  api.get('/stats/tournament').then(r => r.data);
