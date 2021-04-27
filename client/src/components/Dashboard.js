import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import { setAuthenticationHeader } from '../utils/authenticate';

function Dashboard(props) {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetchAllMovies()
  }, [])

  const fetchMyMovies = () => {

    axios.get('http://localhost:8080/my-movies')
    .then(response => {
      if(response.data.error) {
        console.log(response.data.error)
      } else {
          setMovies(response.data)
      }
    })
  }

  const signOut = () => {
    // remove token from local storage
    localStorage.removeItem('jsonwebtoken')
    localStorage.removeItem('username')

    // clear up auth headers
    setAuthenticationHeader(null)
    // perform a dispatch and set the isAuthenticated global state to false
    // props.onSignOut()
    props.history.push('/')
  }

  const fetchAllMovies = () => {

    const username = localStorage.getItem('username')

    axios.get(`http://localhost:8080/movies/${username}`)
    .then(response => {
      setMovies(response.data)
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
      <button onClick={fetchMyMovies}>Get My Movies!</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}

export default Dashboard;