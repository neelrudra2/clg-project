const API_URL = 'https://clg-project-xkya.onrender.com/api/analytics';

export const getDashboardStats = async () => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};
