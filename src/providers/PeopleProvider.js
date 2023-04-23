import React, { createContext, useContext } from 'react';
import { UsePeople } from '../hooks/usePeople';

const PeopleContext = createContext(null);

export const usePeopleContext = () => {
  return useContext(PeopleContext);
};

export const PeopleProvider = ({ children }) => {
  const {
    data,
    setData,
    text,
    onChangeText,
    filteredUsers,
    setApiUrl,
    apiUrl,
    saveNamed,
    setSavedName,
    fans,
    setFans,
    clearFans,
    loading,
    setIsLoading,
  } = UsePeople();
  return (
    <PeopleContext.Provider
      value={{
        data,
        setData,
        text,
        onChangeText,
        filteredUsers,
        setApiUrl,
        apiUrl,
        saveNamed,
        setSavedName,
        fans,
        setFans,
        clearFans,
        loading,
        setIsLoading,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};
