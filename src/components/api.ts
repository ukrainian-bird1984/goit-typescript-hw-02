import axios, { AxiosResponse } from 'axios';

export const fetchPhotosByQuery = async <T>(query: string, page: number): Promise<T> => {
  const Access_Key: string = 'kcbG2Jgq2oXSu1iIa5Mf1PUXvAgyf4nTnbStAzDMij0';
  const baseApiUrl: string = 'https://api.unsplash.com/search/photos';
  const apiQuery: string = `${baseApiUrl}?page=${page}&query=${query}&client_id=${Access_Key}`;
  const {data}= await axios.get(apiQuery);
  return data;
};
