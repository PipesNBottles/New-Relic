import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AllUsers from '.';
import { getCompanies, getUsers } from '../shared/api';
import userEvent from '@testing-library/user-event';

jest.mock('../shared/api');

describe('App', () => {
  const mockCompanyData = ['Apple', 'Amazon', 'New Relic'];
  const mockUserData = [
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
  ];
  test('renders AllUsers with no data', async () => {
    (getCompanies as jest.Mock).mockResolvedValue({ data: mockCompanyData });
    (getUsers as jest.Mock).mockResolvedValue({ data: mockUserData });
    render(<AllUsers />, { wrapper: BrowserRouter });
    await waitFor(() => {
      const selectElement = screen.getAllByRole('option');
      expect(selectElement).toHaveLength(4);
    });
  });

  test('renders all users whose name starts with Khalid', async () => {
    (getCompanies as jest.Mock).mockResolvedValue({ data: mockCompanyData });
    (getUsers as jest.Mock).mockResolvedValue({ data: mockUserData });
    render(<AllUsers />, { wrapper: BrowserRouter });
    userEvent.type(screen.getByRole('textbox'), 'Khalid');
    await waitFor(() => {
      expect(screen.getByText('Khalid')).toBeVisible();
      expect(screen.queryByText('Bob')).toBeNull();
    });
  });
});


