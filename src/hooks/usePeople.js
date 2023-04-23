import { useEffect, useState } from 'react';

export const UsePeople = () => {
  const [data, setData] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [text, onChangeText] = useState('');
  const [apiUrl, setApiUrl] = useState('https://swapi.dev/api/people/');
  const [saveNamed, setSavedName] = useState([]);
  const [fans, setFans] = useState([
    { id: 1, name: 'Female Fans', count: 0, gender: 'female' },
    { id: 2, name: 'Male Fans', count: 0, gender: 'male' },
    { id: 3, name: 'Others', count: 0, gender: 'n/a' },
  ]);

  const filteredUsers = data?.results?.filter((user) =>
    user?.name?.toLowerCase().includes(text?.toLowerCase()),
  );

  const clearFans = () => {
    const initialValueDataFavorite = data?.results?.map((elem) => ({
      ...elem,
      favorite: false,
    }));
    const resetFans = fans.map((elem) => ({ ...elem, count: 0 }));
    setSavedName([]);
    setData((prev) => ({ ...prev, results: initialValueDataFavorite }));
    setFans(resetFans);
  };

  useEffect(() => {
    setIsLoading(true);

    try {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setIsLoading(false);
          }
          const favorite = data.results.map((elem) => ({
            ...elem,
            favorite: saveNamed.includes(elem.name),
          }));
          setData({ ...data, results: favorite });
        });
    } catch (e) {
      console.log('e', e);
    }
  }, [apiUrl]);

  return {
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
  };
};
