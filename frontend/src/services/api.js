// services/api.js
import axios from 'axios';

// Récupération de l'URL de base de manière sécurisée
const getBaseURL = () => {
  if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // Pour Vite
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getBaseURL();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Routes publiques (pas de token)
const publicRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/contact',
  '/quote-requests',
  '/audit-requests',
  '/newsletter/subscribe',
  '/newsletter/unsubscribe',
];

api.interceptors.request.use(
  (config) => {
    const isPublic = publicRoutes.some(route => config.url.includes(route));
    if (!isPublic) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// ==================== DASHBOARD ADMIN ====================
export const adminDashboard = {
  getStats: () => api.get('/dashboard/admin/stats'),
  getRevenue: (year) => api.get(`/dashboard/admin/revenue?year=${year || new Date().getFullYear()}`),
  getActivities: () => api.get('/dashboard/admin/activities'),
  getAlerts: () => api.get('/dashboard/admin/alerts'),
};

// ==================== DASHBOARD CLIENT ====================
export const clientDashboard = {
  getStats: () => api.get('/dashboard/client/stats'),
  getRecentDemands: () => api.get('/dashboard/client/recent-demands'),
  getActiveProjects: () => api.get('/dashboard/client/active-projects'),
};

// ==================== DEVIS ====================
export const devis = {
  create: (data) => api.post('/devis', data),
  getMyDevis: () => api.get('/devis/my-devis'),
  getAll: () => api.get('/devis'),
  getById: (id) => api.get(`/devis/${id}`),
  updateStatus: (id, statusData) => api.put(`/devis/${id}/status`, statusData),
  markReminderSent: (id) => api.put(`/devis/${id}/reminder`),
  downloadPDF: (id) => api.get(`/devis/${id}/pdf`, { responseType: 'blob' }),
};

// ==================== PROJETS ====================
export const projects = {
  create: (data) => api.post('/projects', data),
  getMyProjects: () => api.get('/projects/my-projects'),
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
  addTask: (id, taskName) => api.post(`/projects/${id}/tasks`, { name: taskName }),
  toggleTask: (projectId, taskId) => api.put(`/projects/${projectId}/tasks/${taskId}`),
};

// ==================== SERVICES (catalogue) ====================
export const services = {
  getAll: () => api.get('/services'),
  getAllAdmin: () => api.get('/services/admin/all'),
  getById: (id) => api.get(`/services/${id}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
  reorder: (servicesOrder) => api.put('/services/reorder', { services: servicesOrder }),
};

// ==================== BLOG ====================
export const blog = {
  getPublished: (page = 1, limit = 9, category, search) => {
    let url = `/blog?page=${page}&limit=${limit}`;
    if (category && category !== 'Tous') url += `&category=${category}`;
    if (search) url += `&search=${search}`;
    return api.get(url);
  },
  getBySlug: (slug) => api.get(`/blog/${slug}`),
  getAll: () => api.get('/blog/admin/all'),
  getById: (id) => api.get(`/blog/admin/${id}`),
  create: (data) => api.post('/blog', data),
  update: (id, data) => api.put(`/blog/${id}`, data),
  delete: (id) => api.delete(`/blog/${id}`),
};

// ==================== CRM (PROSPECTS) ====================
export const crm = {
  getAll: () => api.get('/crm'),
  getByStage: () => api.get('/crm/by-stage'),
  getStats: () => api.get('/crm/stats'),
  getPipeline: () => api.get('/crm/pipeline'),
  getUpcomingReminders: () => api.get('/crm/reminders/upcoming'),
  create: (data) => api.post('/crm', data),
  getById: (id) => api.get(`/crm/${id}`),
  update: (id, data) => api.put(`/crm/${id}`, data),
  addInteraction: (id, interaction) => api.post(`/crm/${id}/interactions`, interaction),
  move: (id, stage) => api.put(`/crm/${id}/move`, { stage }),
  scheduleReminder: (id, reminderData) => api.post(`/crm/${id}/reminder`, reminderData),
  delete: (id) => api.delete(`/crm/${id}`),
};

// ==================== TICKETS SUPPORT ====================
export const tickets = {
  create: (data) => api.post('/tickets', data),
  getMyTickets: () => api.get('/tickets/my-tickets'),
  getMyTicketById: (id) => api.get(`/tickets/my-tickets/${id}`),
  addMessage: (id, message, file = null) => {
    const formData = new FormData();
    formData.append('message', message);
    if (file) formData.append('attachment', file);
    return api.post(`/tickets/${id}/messages`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getUnreadCount: () => api.get('/tickets/unread-count'),
  markMessageAsRead: (ticketId, messageId) => api.put(`/tickets/${ticketId}/messages/${messageId}/read`),
  // Admin
  getAll: (params) => api.get('/tickets', { params }),
  getStats: () => api.get('/tickets/stats'),
  getById: (id) => api.get(`/tickets/${id}`),
  updateStatus: (id, statusData) => api.put(`/tickets/${id}/status`, statusData),
  assign: (id, assignData) => api.put(`/tickets/${id}/assign`, assignData),
  addNote: (id, note) => api.post(`/tickets/${id}/notes`, { note }),
  delete: (id) => api.delete(`/tickets/${id}`),
  exportCSV: (params) => api.get('/tickets/export/csv', { params, responseType: 'blob' }),
};

// ==================== DEMANDES DE DEVIS (formulaire rapide) ====================
export const quoteRequests = {
  create: (data) => api.post('/quote-requests', data),
  track: (requestNumber) => api.get(`/quote-requests/track/${requestNumber}`),
  getMyRequests: () => api.get('/quote-requests/my-requests'),
  getAll: () => api.get('/quote-requests'),
  getStats: () => api.get('/quote-requests/stats'),
  getById: (id) => api.get(`/quote-requests/${id}`),
  updateStatus: (id, statusData) => api.put(`/quote-requests/${id}/status`, statusData),
  addNote: (id, note) => api.post(`/quote-requests/${id}/notes`, { note }),
  delete: (id) => api.delete(`/quote-requests/${id}`),
  exportCSV: (params) => api.get('/quote-requests/export/csv', { params, responseType: 'blob' }),
};

// ==================== AUDITS GRATUITS ====================
export const audits = {
  create: (data) => api.post('/audit-requests', data),
  getMyAudits: () => api.get('/audit-requests/my-audits'),
  track: (requestNumber) => api.get(`/audit-requests/track/${requestNumber}`),
  getAll: () => api.get('/audit-requests'),
  getStats: () => api.get('/audit-requests/stats'),
  getById: (id) => api.get(`/audit-requests/${id}`),
  updateStatus: (id, status) => api.put(`/audit-requests/${id}/status`, { status }),
  downloadPDF: (id) => api.get(`/audit-requests/${id}/pdf`, { responseType: 'blob' }),
  updatePdfUrl: (id, pdfReportUrl) => api.put(`/audit-requests/${id}/pdf`, { pdfReportUrl }),
  delete: (id) => api.delete(`/audit-requests/${id}`),
};

// ==================== CONTACT ====================
export const contact = {
  sendMessage: (data) => api.post('/contact', data),
  // Admin
  getStats: () => api.get('/contact/stats'),
  getAllMessages: (params) => api.get('/contact', { params }),
  getMessageById: (id) => api.get(`/contact/${id}`),
  markAsRead: (id) => api.put(`/contact/${id}/read`),
  deleteMessage: (id) => api.delete(`/contact/${id}`),
};

// ==================== NEWSLETTER ====================
export const newsletter = {
  subscribe: (data) => api.post('/newsletter/subscribe', data),
  unsubscribe: (token) => api.get(`/newsletter/unsubscribe/${token}`),
  // Admin
  getSubscribers: (params) => api.get('/newsletter/subscribers', { params }),
  getStats: () => api.get('/newsletter/stats'),
  deleteSubscriber: (id) => api.delete(`/newsletter/subscribers/${id}`),
};

// ==================== ASSISTANT IA ====================
export const assistant = {
  chat: (message, sessionId) => api.post('/assistant/chat', { message, sessionId }),
  clearSession: (sessionId) => api.delete(`/assistant/session/${sessionId}`),
};

// ==================== FERRONNERIE PROJETS ====================
export const ferronnerieProjects = {
  getPublic: (category) => api.get('/ferronnerie-projects', { params: category && category !== 'Tous' ? { category } : {} }),
  getById: (id) => api.get(`/ferronnerie-projects/${id}`),
  getAll: () => api.get('/ferronnerie-projects/admin/all'),
  create: (data) => api.post('/ferronnerie-projects', data),
  update: (id, data) => api.put(`/ferronnerie-projects/${id}`, data),
  delete: (id) => api.delete(`/ferronnerie-projects/${id}`),
  togglePublish: (id) => api.put(`/ferronnerie-projects/${id}/publish`),
};

// ==================== HISTORIQUE CLIENT ====================
export const history = {
  getMyHistory: () => api.get('/history/my-history'),
};

// ==================== NOTIFICATIONS ====================
export const notifications = {
  getMyNotifications: () => api.get('/notifications/my'),
};

// ==================== UTILISATEURS (ADMIN) ====================
export const users = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
  toggleStatus: (id) => api.put(`/users/${id}/toggle-status`),
};

// ==================== UPLOADS (fichiers) ====================
export const upload = {
  uploadFile: (file, type = 'ticket') => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/upload/${type}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default api;