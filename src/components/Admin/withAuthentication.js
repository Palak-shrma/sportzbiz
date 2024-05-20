import React, { useEffect, useState } from 'react';
import { auth } from "../../firebase/config";
import { useNavigate } from 'react-router-dom';

function withAuthentication(Component) {
  return function WrappedComponent(props) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((userAuth) => {
        if (userAuth) {
          setUser(userAuth);
        } else {
          navigate('/admin/admin-login');
        }
      });

      return () => unsubscribe();
    }, [navigate]);

    return user ? <Component {...props} /> : null;
  }
}

export default withAuthentication;
