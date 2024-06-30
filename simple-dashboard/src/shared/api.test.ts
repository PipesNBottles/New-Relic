import axios from 'axios';
import { getCompanies, getUsers } from './api';

jest.mock('axios');

it('Should return a simple array of companies', async () => {
  const mockData = {
    data: ['Apple', 'Amazon', 'New Relic'],
  };

  axios.get = jest.fn().mockResolvedValue(mockData);
  const companyData = await getCompanies();
  expect(companyData).toEqual(mockData);
});

it('Should return a simple array of users', async () => {
  const mockData = {
    data: [
      {
        id: 1,
        first_name: 'Khalid',
        last_name: 'Al-Awady',
        company: 'New Relic',
      },
      {
        id: 2,
        first_name: 'Bob',
        last_name: 'Doles',
        company: 'Amazon',
      },
      {
        id: 3,
        first_name: 'Tim',
        last_name: 'Curry',
        company: 'Apple',
      },
    ],
  };

  axios.get = jest.fn().mockResolvedValue(mockData);
  const companyData = await getUsers({});
  expect(companyData).toEqual(mockData);
});
