import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';
import { User } from '../types';

const testUser: User = {
  id: 1,
  first_name: 'Khalid',
  last_name: 'Al-Awady',
  company: 'New Relic',
};

test('renders UserCard with prop data', () => {
  render(<UserCard key={testUser.id} user={ testUser }/>);
  const personData = screen.getByText('Person Data');
  expect(personData).toBeInTheDocument();
});

test('renders UserCard to render prop data', () => {
  render(<UserCard key={testUser.id} user={ testUser }/>);
  const personData = screen.getByText('Khalid');
  expect(personData).toBeInTheDocument();
});
