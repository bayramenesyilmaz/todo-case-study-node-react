import axios from "axios";

export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

axios.interceptors.request.use((config) => {
  const authState = JSON.parse(localStorage.getItem("authState") || "{}");
  const token = authState.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.withCredentials = false; // Vercel deployment için false yapıldı
  config.headers["Content-Type"] = "application/json";

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token geçersiz veya eksik
      localStorage.removeItem("authState");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export const authApis = {
  // Kullanıcı kaydı
  register: async (data) => {
    return await axios.post(`${API_URL}/auth/register`, data);
  },

  // Kullanıcı girişi
  login: async (data) => {
    return await axios.post(`${API_URL}/auth/login`, data);
  },

  // Kullanıcı bilgilerini al
  getMe: async (token) => {
    return await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export const todoApis = {
  getAll: async (params) => {
    const { page, per_page, sort, order, status, priority } = params;

    //sadece değer olanları al
    const filteredParams = Object.fromEntries(
      Object.entries({
        page,
        limit: per_page,
        sort,
        order,
        status,
        priority,
      }).filter(([_, v]) => v != "" && v != null)
    );

    const queryParams = new URLSearchParams(filteredParams).toString();

    return await axios.get(`${API_URL}/todos?${queryParams}`);
  },

  getById: async (id) => {
    return await axios.get(`${API_URL}/todos/${id}`);
  },

  create: async (data) => {
    return await axios.post(`${API_URL}/todos`, data);
  },

  update: async (id, data) => {
    return await axios.put(`${API_URL}/todos/${id}`, data);
  },

  updateStatus: async (id, status) => {
    return await axios.patch(`${API_URL}/todos/${id}/status`, { status });
  },

  deleteTodo: async (id) => {
    return await axios.delete(`${API_URL}/todos/${id}`);
  },

  search: async (params) => {
    const queryParams = new URLSearchParams(params).toString();

    return await axios.get(`${API_URL}/todos/search?${queryParams}`);
  },

  getStats: async () => {
    return await axios.get(`${API_URL}/stats/todos`);
  },

  getPriorityStats: async () => {
    return await axios.get(`${API_URL}/stats/todos/priorities`);
  },
};

export const categoryApis = {
  // Tüm kategorileri getir
  getAll: async () => {
    return await axios.get(`${API_URL}/categories`);
  },

  // ID'ye göre kategori getir
  getById: async (id) => {
    return await axios.get(`${API_URL}/categories/${id}`);
  },

  // Yeni kategori oluştur
  create: async (data) => {
    return await axios.post(`${API_URL}/categories`, data);
  },

  // Kategori güncelle
  update: async (id, data) => {
    return await axios.put(`${API_URL}/categories/${id}`, data);
  },

  // Kategori sil
  delete: async (id) => {
    return await axios.delete(`${API_URL}/categories/${id}`);
  },

  // Kategoriye ait todoları getir
  getTodos: async (id) => {
    return await axios.get(`${API_URL}/categories/${id}/todos`);
  },
};
