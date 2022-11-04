import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("pokemon");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchUrl = `https://pokeapi.co/api/v2/pokemon`;

  const fetchPokemon = () => {
    axios
      .get(fetchUrl, {
        headers: {},
      })
      .then((response) => {
        setData([...data, ...response.data.results]);
      })
      .catch((error) => {
        console.log(error);
      });
    setPage(page + 1);
  };
  const searchPokemon = (e) => {
    if (e.keyCode === 13) {
      setQuery(e.target.value);
      // setData([]);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [query]);

  return (
    <div className="App flex">
      {/* <input
        type="text"
        onKeyDown={(e) => searchPokemon(e)}
        placeholder="Search For Pokemon 🔎"
      /> */}
      <h1>PokeDex (with infinite scroll obvo)</h1>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchPokemon}
        hasMore={hasMore}
        loader={<p>Load more...</p>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="main flex">
          {data.map((data, key) => (
            <div className="container" key={key}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${key + 1}.png`}
                className="image"
                alt={data.alt_description}
              />
              <h4><a href="https://emoji.gg/emoji/pokeball"><img src="https://cdn3.emoji.gg/emojis/pokeball.png" width="15px" height="15px" alt="pokeball" /></a> {data.name}</h4>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default App;