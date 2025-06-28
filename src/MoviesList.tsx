import { useEffect, useState } from "react"
import { dummyFetch, type moviesData } from "./data/dummyFetch";

const MoviesList:React.FC = () => {
    const [movies, setMovies] = useState<moviesData[]>([]);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
   
    useEffect(()=>{
        const fetchMovies = async() => {
          setIsLoading(true)
          try {
            const response = await dummyFetch("https://example.com/api/movies");
            if(response.status === 200){
                setMovies(response.data)
            }
          } catch (error) {
            if (error instanceof Error) {
              setError("Failed to fetch movies. Please try again later.");
            } else {
              setError("Failed to fetch movies. Please try again later.");
            }
          } finally {
            setIsLoading(false)
          }
        }
        fetchMovies()
    }, [])
     
  return (
    <div>
      
    </div>
  )
}

export default MoviesList
