const API_URL = 'http://localhost:5000/api/applications';

export const applyToCompany = async (companyId) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/apply/${companyId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const getMyApplications = async () => {
  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:5000/api/applications/my', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const getCompanyApplicants = async (companyId) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`http://localhost:5000/api/applications/company/${companyId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};
