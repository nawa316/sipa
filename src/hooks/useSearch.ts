import { useState, useMemo } from 'react';

export function useSearch<T>(data: T[], searchKeys: (keyof T)[]) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    
    const query = searchQuery.toLowerCase();
    return data.filter((item) => 
      searchKeys.some((key) => {
        const val = item[key];
        return String(val).toLowerCase().includes(query);
      })
    );
  }, [data, searchQuery, searchKeys]);

  return {
    searchQuery,
    setSearchQuery,
    filteredData
  };
}
