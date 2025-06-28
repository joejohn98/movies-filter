export interface moviesData {
  title: string;
  year: number;
  rating: number;
}

interface ApiResponse {
  status: number;
  message: string;
  data: moviesData[];
}

export const dummyFetch = (url: string): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/movies") {
        resolve({
          status: 200,
          message: "Success",
          data: [
            { title: "The Dark Knight", year: 2008, rating: 9.0 },
            { title: "Inception", year: 2009, rating: 8.8 },
            { title: "Interstellar", year: 2010, rating: 8.6 },
            { title: "Tenet", year: 2009, rating: 7.5 },
            { title: "Real Steal", year: 2007, rating: 7.5 },
            { title: "Memento", year: 2000, rating: 8.4 },
            { title: "Dunkirk", year: 2017, rating: 7.9 },
            { title: "The Prestige", year: 2006, rating: 8.5 },
            { title: "Batman Begins", year: 2005, rating: 8.2 },
            { title: "Insomnia", year: 2002, rating: 7.2 },
          ],
        });
      } else {
        reject({
          status: 404,
          message: "Movies list not found.",
        });
      }
    }, 2000);
  });
};
