import axios, { AxiosResponse } from 'axios';

interface Photo {
  id: string;
  urls: {
    regular: string;
    thumb: string;
  };
}

interface ServerResponse {
  total: number;
  results: Photo[];
}

export const fetchPhotosByQuery = async (query: string, page: number): Promise<ServerResponse> => {
  const Access_Key: string = 'kcbG2Jgq2oXSu1iIa5Mf1PUXvAgyf4nTnbStAzDMij0';
  const baseApiUrl: string = 'https://api.unsplash.com/search/photos';
  const apiQuery: string = `${baseApiUrl}?page=${page}&query=${query}&client_id=${Access_Key}`;

  try {
    const response: AxiosResponse<ServerResponse> = await axios.get(apiQuery);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch photos');
  }
};
