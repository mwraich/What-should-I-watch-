"use client"
import { useState } from "react"

export function SelectGenre() {
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [movieRecommendation, setMovieRecommendation] = useState<Movie>({ title: "", synopsis: "" })
  const genres = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Documentary"]

  type Movie = {
    title: string
    synopsis: string
  }

  const getRandomMovie = async (genre:string) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ genre })
    })

    const data = await response.json()
    
    const movieList = data.movieList.movies
    const randomIndex = Math.floor(Math.random() * movieList.length)
    return movieList[randomIndex]
  }
  const handleGenreClick = async (genre:string) => {
    setSelectedGenre(genre)
    const randomMovie = await getRandomMovie(genre)
    setMovieRecommendation(randomMovie)
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#1a1a1a] to-[#333333] text-white">
      <div className="max-w-md w-full p-6 bg-[#222222] rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold tracking-wider">What Should I Watch Next?</h1>
          <p className="text-gray-400 mt-2">Discover your next cinematic adventure.</p>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                selectedGenre === genre ? "bg-[#444444] hover:bg-[#555555]" : "bg-[#333333] hover:bg-[#444444]"
              }`}
              onClick={() => handleGenreClick(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
        {movieRecommendation && (
          <div className="bg-[#333333] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">{movieRecommendation.title}</h2>
            <p className="text-gray-400 mb-4">{movieRecommendation.description}</p>
            <button className="bg-[#e50914] hover:bg-[#c40812] text-white font-bold py-2 px-4 rounded transition-colors duration-300">
              Watch Now
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
