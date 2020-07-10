import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Setting up our Initial State
const initialState = {
  url: [],
};

// Setting up Context
export const AppContext = createContext(initialState);

// Setting up App Provider Component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const generateUrl = async (longUrl) => {
    const res = await axios.post('api/genurl', { longUrl });

    // console.log('test', res.data);

    dispatch({
      type: 'GEN_URL',
      payload: res.data,
    });
  };

  const updateUrlCode = async (newcode, oldcode) => {
    const res = await axios.put(`api/url/${oldcode}`, { newcode });
    // console.log('newcode:', newcode);
    // console.log('oldcode:', oldcode);
    dispatch({
      type: 'GEN_URL',
      payload: res.data,
    });
  };

  return (
    <AppContext.Provider
      value={{
        url: state.url,
        generateUrl,
        updateUrlCode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
