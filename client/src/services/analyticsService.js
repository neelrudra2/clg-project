const API_URL = 'http://localhost:5000/api/analytics';

export const getDashboardStats = async () => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};
