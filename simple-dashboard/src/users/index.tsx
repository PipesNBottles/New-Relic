import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from './types';
import UserCard from './components/UserCard';
import { useSearchParams } from 'react-router-dom';
import { getCompanies, getUsers } from '../shared/api';

type Inputs = {
  search_by: string
  company: string
}

export default function AllUsers() {
  const [companyData, setCompanyData] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchUsers, setSearchUsers] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const params: { [key: string]: string | null; } = {
    company: null,
    search_by: null,
  };
  useEffect(() => {
    getCompanies()
      .then((response) => setCompanyData(response.data))
      .catch((error) => console.log(error));

    if (searchParams.get('search_by')) {
      params.search_by = searchParams.get('search_by');
    }
    if (searchParams.get('company')) {
      params.search_by = searchParams.get('search_by');
    }
    getUsers(params)
      .then((resp) => {
        setUsers(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const {
    register,
    handleSubmit,
  } = useForm<Inputs>();

  const getAllCompanies = () => {
    if (!companyData) {
      return [
        <option key={-1} value="">
          All Companies
        </option>,
      ];
    }
    const companySelect = companyData.map((company, index) => {
      return (
        <option key={index} value={company}>
          { company }
        </option>
      );
    });
    companySelect.unshift(<option key={-1} value="">All Companies</option>);
    return companySelect;
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.company.length > 0) {
      params.company = data.company;
    }
    if (data.search_by.length > 0) {
      params.search_by = data.search_by;
    }
    getUsers(params)
      .then((resp) => {
        setUsers(resp.data);
      })
      .catch((err) => console.log(err));

    setSearchParams({ 'search_by': data.search_by, 'company': data.company });
  };

  return (
    <div className="container">
      <form id='new-relic-form'
        className="row g-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-md-6">
          <label htmlFor="search-name" className='form-label'>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="John Doe"
            aria-label="search-name"
            value={searchUsers}
            {...register('search_by') }
            onChange={(e) => setSearchUsers(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="company-select" className='form-label'>Company</label>
          <select {...register('company')}
            id='company-select'
            className='form-select'
            aria-label='company-select'
          >
            { getAllCompanies() }
          </select>
        </div>
        <div className="col-md-6">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
      <div className="row">
        <div className="col">
          {users && users.filter((user) => {
            if (!user) {
              return true;
            }
            if (user.first_name.includes(searchUsers) ||
                user.last_name.includes(searchUsers)) {
              return true;
            }
            return false;
          }).map((user) => <UserCard key={user.id} user={user} />)}
        </div>
      </div>
    </div>
  );
}
