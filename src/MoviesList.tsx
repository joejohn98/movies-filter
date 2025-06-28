import { useEffect, useState } from "react";
import { dummyFetch, type moviesData } from "./data/dummyFetch";

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<moviesData[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const years = Array.from(new Set(movies.map((movie) => movie.year))).sort(
    (a, b) => a - b
  );
  const rating = Array.from(new Set(movies.map((movie) => movie.rating))).sort(
    (a, b) => a - b
  );

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await dummyFetch("https://example.com/api/movies");
        if (response.status === 200) {
          setMovies(response.data);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError("Failed to fetch movies. Please try again later.");
        } else {
          setError("Failed to fetch movies. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const filteredMovies = selectedYear
    ? movies.filter((movie) => movie.year === selectedYear)
    : movies;

  const handleSelectedYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    setSelectedYear(year ? Number(year) : null);
  };

  if (isLoading) {
    return <p style={styles.loading}>Loading Movies List...</p>;
  }

  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Movies List</h2>
      <div>
        <label style={styles.label}>Filter by Year:</label>
        <select
          style={styles.select}
          value={selectedYear !== null ? selectedYear : ""}
          onChange={(e) => handleSelectedYear(e)}
        >
          <option value="">All</option>
          {years.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label style={styles.label}>Filter by Rating:</label>
        <select
          value={""}
          onChange={(e) => console.log(e.target.value)}
          style={styles.select}
        >
          <option value="">All</option>
          {rating.map((rate) => (
            <option value={rate} key={rate}>
              {rate}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const styles = {
  loading: {
    color: "blue",
    fontSize: "20px",
  },
  error: {
    color: "red",
    fontSize: "20px",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  label: {
    marginRight: "10px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  select: {
    width: "40%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
};

export default MoviesList;
