import { useState, useRef } from 'react';
import './App.css';

import SearchForm from './SearchForm';
import useFetch from './hooks/useFetch';

const App = () => {
  const [search, setSearch] = useState('movie');
  const [searchInput, setSearchInput] = useState('');

  const inputRef = useRef();

  const API_KEY = process.env.REACT_APP_API_KEY;
  const url = `https://api.themoviedb.org/3/search/movie/?api_key=${API_KEY}&query=${search}`;
  console.log(url);

  const submitHandler = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setSearchInput('');
    inputRef.current.focus();
  };

  const { results, loading, error } = useFetch(url);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const movieList = results.results.map((movie) => (
    <>
      <p>{movie.title}</p>
      <img
        key={movie.id}
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
      />
    </>
  ));

  return (
    <main>
      <h1>Welcome to {search}</h1>
      <SearchForm
        inputRef={inputRef}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        submitHandler={submitHandler}
      />
      {results && movieList}
    </main>
  );
};

export default App;
