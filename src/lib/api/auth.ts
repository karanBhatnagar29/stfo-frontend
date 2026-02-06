import { api } from './client';
import { LoginDto, RegisterDto } from '@/types/auth'; // We'll create types next

export const authApi = {
  login: async (data: LoginDto) => {
    return api.post('/auth/login', data).then(res => res.data);
  },
  
  register: async (data: RegisterDto) => {
    return api.post('/auth/register', data).then(res => res.data);
  },
  
  getProfile: async () => {
    return api.get('/users/me').then(res => res.data);
  }
};
