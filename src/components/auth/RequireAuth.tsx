import { useIsAuth } from '../../hooks/firebase/useFirebaseStore';
import { Navigate, useLocation } from 'react-router-dom';

type Props = {
  children: JSX.Element;
};

const RequireAuth = (props: Props) => {
  const { children } = props;
  const auth = useIsAuth();
  const location = useLocation();

  if (!auth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
