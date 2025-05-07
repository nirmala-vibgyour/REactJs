import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css"
import {searchMovies, getPopularMovies} from "../services/api";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    // const movies = [
    //     {id:1, title: "John Nightmare", release_date: "2029"},
    //     {id:2, title: "Stuart Little", release_date: "2002"},
    //     {id:3, title: "Little Women", release_date: "2016"},
    //     {id:4, title: "Ghost Rider", release_date: "2010"},
    // ]
    // To run something only once.
    useEffect (() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            }
            finally {
                setLoading(false);
            }
        }
        loadPopularMovies();
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return
        // alert(searchQuery)
        if(loading) return
        
        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults)
            setError(null);
        }catch (err) {
            console.log(err)
            setError("Failed to search movies...")
        }
        finally {
            setLoading(false)
        }
        setSearchQuery("");
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for movies..." 
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? 
            (<div className="loading">Loading...</div>) : (<div className="movies-grid">{movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>)}
        </div>
    );
}

export default Home;