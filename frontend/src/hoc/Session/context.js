import React, { useContext } from 'react';

export const useAuthUserContext = () => useContext(AuthUserContext);

const AuthUserContext = React.createContext(null);

export default AuthUserContext;