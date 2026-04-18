import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor para adicionar o token se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('mv_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const lotteryService = {
  getModalidades: async () => {
    const response = await api.get('/modalidades');
    return response.data;
  },
  generateGames: async (slug: string, qtd: number = 5) => {
    const response = await api.post(`/engine/${slug}/gerar`, { qtd_jogos: qtd });
    return response.data;
  },
  
  // Servio de Tickets
  getTickets: async (filters: { origem?: string, modalidade?: string } = {}) => {
    const response = await api.get('/tickets/meus', { params: filters });
    return response.data;
  },
  saveTicket: async (ticket: { modalidade: string, numeros: string[], origem: string, score?: number, extra?: any }) => {
    const response = await api.post('/tickets/salvar', ticket);
    return response.data;
  },
  deleteTicket: async (id: string) => {
    const response = await api.delete(`/tickets/${id}`);
    return response.data;
  },
  duplicateTicket: async (id: string) => {
    const response = await api.post(`/tickets/${id}/duplicar`);
    return response.data;
  }
};

export default api;
