import axios from 'axios';
const Access_Key = 'kcbG2Jgq2oXSu1iIa5Mf1PUXvAgyf4nTnbStAzDMij0';
const baseApiUrl = 'https://api.unsplash.com/search/photos';

export const fetchPhotosByQuery = async (query, page) => {
  const apiQuery = `${baseApiUrl}?page=${page}&query=${query}&client_id=${Access_Key}`;
  
  const response = await axios.get(apiQuery);

  
  return response.data;
};