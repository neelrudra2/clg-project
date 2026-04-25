const API_URL = 'https://clg-project-xkya.onrender.com/api/companies';

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

  const response = await fetch(`https://clg-project-xkya.onrender.com/api/companies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const createCompany = async (companyData) => {
  const token = localStorage.getItem('token');

  const response = await fetch('https://clg-project-xkya.onrender.com/api/companies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(companyData),
  });

  return response.json();
};
