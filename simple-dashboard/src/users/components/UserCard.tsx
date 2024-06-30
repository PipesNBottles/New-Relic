
import { User } from '../types';

type Prop = {
  user: User
  key: User['id'],
}

export default function UserCard(props: Prop) {
  const { user } = props;
  return (
    <div className="card">
      <div className="card-header">
        Person Data
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item"> {user.first_name} </li>
        <li className="list-group-item">{user.last_name}</li>
        <li className="list-group-item">{user.company}</li>
      </ul>
    </div>
  );
}
