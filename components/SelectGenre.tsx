"use client"

import { type } from "os"
import { useState } from "react"

export function SelectGenre() {
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [movieRecommendation, setMovieRecommendation] = useState<Movie>({ title: "", synopsis: "" })
  const genres = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Documentary"]

  type Movie = {
    title: string
    synopsis: string
  }

  const getRandomMovie = (genre:string) => {
    const movies: Record<string, Movie[]> = {
      Action: [
        {
          title: "The Matrix",
          synopsis: "A computer programmer is recruited by rebels to help overthrow a dystopian society.",
        },
        {
          title: "Mad Max: Fury Road",
          synopsis:
            "In a post-apocalyptic world, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
        },
        {
          title: "John Wick",
          synopsis: "An ex-hit-man comes out of retirement to track down the gangsters that took everything from him.",
        },
      ],
      Comedy: [
        {
          title: "The Big Lebowski",
          synopsis:
            "Jeff 'The Dude' Lebowski, mistaken for a millionaire of the same name, seeks restitution for his ruined rug and enlists his bowling buddies to help get it.",
        },
        {
          title: "Monty Python and the Holy Grail",
          synopsis:
            "King Arthur and his Knights of the Round Table embark on a surreal, low-budget search for the Holy Grail, encountering many absurd obstacles.",
        },
        {
          title: "Groundhog Day",
          synopsis: "A weatherman finds himself inexplicably living the same day over and over again.",
        },
      ],
      Drama: [
        {
          title: "The Shawshank Redemption",
          synopsis:
            "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        },
        {
          title: "Forrest Gump",
          synopsis:
            "The story of a man who witnesses and influences several major historical events in the United States from the late 1950s to the 1990s.",
        },
        {
          title: "Schindler's List",
          synopsis:
            "In German-occupied Poland during World War II, a wealthy businessman uses his factory to save hundreds of Jews from the gas chambers.",
        },
      ],
    }
    const movieList = movies[genre]
    const randomIndex = Math.floor(Math.random() * movieList.length)
    return movieList[randomIndex]
  }
  const handleGenreClick = (genre:string) => {
    setSelectedGenre(genre)
    const randomMovie = getRandomMovie(genre)
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
            <p className="text-gray-400 mb-4">{movieRecommendation.synopsis}</p>
            <button className="bg-[#e50914] hover:bg-[#c40812] text-white font-bold py-2 px-4 rounded transition-colors duration-300">
              Watch Now
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
