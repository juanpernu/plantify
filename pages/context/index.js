import React, { createContext, useState } from 'react';

export const Context = createContext();
Context.displayName = 'UserContext';

export default ({ children }) => {
  const defaultContext = {
    user: {},
    setUserData: data => userData(data),
  };

  const [state, setState] = useState(defaultContext);
  const userData = data => {
    const { email, name, userName, _id } = data;
    setState((prevState) => ({
      ...prevState,
      user: {
        id: _id,
        userName,
        name,
        email,
      },
    }));
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
};
