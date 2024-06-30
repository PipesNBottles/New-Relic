import axios from 'axios';

const getURL = () => {
  return `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`;
};

export const getCompanies = async () => {
  const baseURL = getURL();
  const response = await axios.get(`http://${baseURL}/v1/users/company`);
  return response;
};

export const getUsers = async (params: any) => {
  const baseURL = getURL();
  const response = await axios.get(`http://${baseURL}/v1/users/`, { params: params });
  return response;
};
