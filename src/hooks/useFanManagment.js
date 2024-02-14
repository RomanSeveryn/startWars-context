import { useState } from 'react';

export const useFanManagement = (setSavedName, setData) => {
  const [fans, setFans] = useState([
    { id: 1, name: 'Female Fans', count: 0, gender: 'female' },
    { id: 2, name: 'Male Fans', count: 0, gender: 'male' },
    { id: 3, name: 'Others', count: 0, gender: 'n/a' },
  ]);

  const clearFans = (data) => {
    const initialValueDataFavorite = data?.results?.map((elem) => ({
      ...elem,
      favorite: false,
    }));
    const resetFans = fans.map((elem) => ({ ...elem, count: 0 }));
    setSavedName([]);
    setData((prev) => ({ ...prev, results: initialValueDataFavorite }));
    setFans(resetFans);
  };

  return { fans, setFans, clearFans };
};
