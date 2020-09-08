import React, { useContext } from 'react';

export const useUsersContext = () => useContext(UsersContext);

const UsersContext = React.createContext(null);

export default UsersContext;