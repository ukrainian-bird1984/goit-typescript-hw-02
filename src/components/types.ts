export interface Photo {
    id: string;
    description: string;
    alt_description: string;
    urls: {
      small: string;
      regular: string;
    };
    likes: number;
    user: {
      name: string;
    };
  }

  export interface ApiResponse {
  results: Photo[];
  total_pages: number;
}