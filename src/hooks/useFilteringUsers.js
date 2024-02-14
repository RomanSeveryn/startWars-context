import { useState } from 'react';

export const useFilteringUsers = (data) => {
  const [text, onChangeText] = useState('');

  const filteredUsers = data?.results?.filter((user) =>
    user?.name?.toLowerCase().includes(text?.toLowerCase()),
  );

  return { text, onChangeText, filteredUsers };
};
