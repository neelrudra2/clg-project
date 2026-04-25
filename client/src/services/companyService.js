const API_URL = 'http://localhost:5000/api/companies';

export const getCompanies = async () => {
  const token = localStorage.getItem('token');

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const getCompanyById = async (id) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`http://localhost:5000/api/companies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const createCompany = async (companyData) => {
  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:5000/api/companies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(companyData),
  });

  return response.json();
};
