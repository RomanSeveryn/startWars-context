import { useEffect, useState } from 'react';

export const useApiData = () => {
  const [data, setData] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState('https://swapi.dev/api/people/');
  const [saveNamed, setSavedName] = useState([]);

  useEffect(() => {
    setIsLoading(true);
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
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [apiUrl]);

  return {
    data,
    loading,
    apiUrl,
    setApiUrl,
    setIsLoading,
    setData,
    saveNamed,
    setSavedName,
  };
};
