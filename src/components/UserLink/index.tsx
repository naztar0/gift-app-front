import { Link } from 'react-router-dom';


export const UserLink = ({ user, onClick }: { user: IUser, onClick?: () => void }) => (
  <Link to={`/users/${user._id}`} onClick={onClick}>
    {`${user.firstName} ${user.lastName}`}
  </Link>
);
