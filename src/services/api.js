const BASE_URL = 'https://openlibrary.org';

export const getTrendingBooks = async () => {
  const response = await fetch(`${BASE_URL}/trending/daily.json`);
  if (!response.ok) throw new Error('Failed to fetch trending books');
  const data = await response.json();
  return data.works || [];
};

export const getBookDetail = async (id) => {
  const response = await fetch(`${BASE_URL}${id}.json`);
  if (!response.ok) throw new Error('Failed to fetch book detail');
  return await response.json();
};

export const searchBooks = async (query) => {
  const response = await fetch(`${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=20`);
  if (!response.ok) throw new Error('Failed to search books');
  const data = await response.json();
  return data.docs || [];
};

export const getCoverUrl = (coverId, size = 'M') => {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};