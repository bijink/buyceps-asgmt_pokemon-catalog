import { gql, useLazyQuery } from "@apollo/client";
import client from "../apollo-client";
import { useState } from "react";
import PokeCard from "@/components/pokeCard";

const QUERY_POKEMON_LIST = gql`
  query GetPokemonList($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      image
      types
    }
  }
`;

export default function Home({ pokemonList }) {
  const [getPokemonList, { loading, data, error }] = useLazyQuery(QUERY_POKEMON_LIST);
  // console.log(data, loading, error); // !:log

  const [pokemons, setPokemons] = useState(pokemonList?.slice(0, 20));

  const handlePage = async () => {
    if (pokemons.length < 20 * 3) {
      setPokemons(pokemonList.slice(0, pokemons.length + 20));
    }
    if (pokemons.length >= 20 * 3) {
      await getPokemonList({ variables: { first: pokemons.length + 20 } }).then(res => {
        setPokemons([
          ...pokemons,
          ...res?.data?.pokemons?.slice(pokemons.length, pokemons.length + 20),
        ]);
      });
    }
  };

  return (
    <main className='container m-auto'>
      <div className='flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 p-3'>
          {pokemons?.map(item => (
            <PokeCard key={item.id} data={item} />
          ))}
        </div>
      </div>
      <div className='flex justify-center mt-[50px] mb-[80px]'>
        {/* Here, for hidding the load button;
        Manually using length of total pokemon data available in api.
        Because total number of data is not included in api response.
        Not ideal for real applications. */}
        {pokemons.length < 151 ? (
          <button
            className={`btn ${loading ? "btn-blue-loading" : "btn-blue "} `}
            disabled={loading}
            onClick={handlePage}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        ) : (
          <p className='text-xl underline underline-offset-2'>End of List</p>
        )}
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query GetPokemonList {
        pokemons(first: 60) {
          id
          number
          name
          image
          types
        }
      }
    `,
  });

  return {
    props: {
      pokemonList: data.pokemons,
    },
  };
}
