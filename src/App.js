import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./About";
import Home from "./Home";

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .then((data) => {
        const results = data.results.map((pokemon, idx) => {
          return { ...pokemon, idx: idx + 1 };
        });
        setPokemon({ ...data, results });
      });
  });

  useMemo(() => {
    if (text.length === 0) {
      setFilteredPokemon([]);
      return;
    }
    setFilteredPokemon(() =>
      pokemon.results?.filter((pokemon) => pokemon.name.includes(text))
    );
  }, [pokemon.results, text]);

  return (
    <Router>
      <div className="p-14">
        <div className="flex flex-col items-center">
          <Link to="/">
            <header className="text-10xl text-yellow-700">
              POKEMON PICKER
            </header>
          </Link>
        </div>
      </div>
      <Switch>
        <Route path="/About/:slug">
          <About />
        </Route>
        <Route path="/">
          <div className="w-full flex justify-center">
            <input
              type="text"
              placeholder="Enter Name"
              className="mt-10 p-2 border-blue-500 border-2"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          {pokemon && <Home pokemon={filteredPokemon} />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
