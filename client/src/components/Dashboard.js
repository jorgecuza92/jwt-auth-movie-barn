import { useEffect } from 'react';
import { useState } from 'react';

function Dashboard() {

  const [movies, setMovies] = useState([])

  useEffect(() => {

    fetchAllMovies()

  }, [])

  const fetchAllMovies = () => {
    const token = localStorage.getItem('jsonwebtoken')
    const username = localStorage.getItem('username')
    
    fetch(`http://localhost:8080/movies/${username}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(movies => {
      setMovies(movies)
    })
  }

  const movieItems = movies.map((movie) => {
    return <div>Title: {movie.title} --
                Year: {movie.year} --
                Director: {movie.director} --
                Genre: {movie.genre}
          </div>
  })

  return (
    <div>
      <h1>Dashboard</h1>
      {movieItems}
    </div>
  )
}

export default Dashboard;