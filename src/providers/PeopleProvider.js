import React, { createContext, useContext } from 'react';
import { useApiData } from '../hooks/useApiData';
import { useFilteringUsers } from '../hooks/useFilteringUsers';
import { useFanManagement } from '../hooks/useFanManagment';

const PeopleContext = createContext(null);

export const usePeopleContext = () => {
  return useContext(PeopleContext);
};

export const PeopleProvider = ({ children }) => {
  const {
    apiUrl,
    data,
    loading,
    setApiUrl,
    setIsLoading,
    setData,
    saveNamed,
    setSavedName,
  } = useApiData();

  const { text, onChangeText, filteredUsers } = useFilteringUsers(data);
  const { fans, setFans, clearFans } = useFanManagement(setSavedName, setData);
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
