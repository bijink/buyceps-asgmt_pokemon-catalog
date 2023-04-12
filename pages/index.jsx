import { gql } from "@apollo/client";
import client from "../apolla-client";
import { useState } from "react";
import PokeCard from "@/components/pokeCard";

export default function Home({ data }) {
  // console.log(data);

  const [pokemons, setPokemons] = useState(data?.slice(0, 20));

  const handlePage = lastPokeNumber => {
    // console.log(Number(lastPokeNumber));
    let lastPokeNum = Number(lastPokeNumber);
    setPokemons(data.slice(lastPokeNum, lastPokeNum + 20));
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
      {/* <button onClick={() => handlePage(pokemons[19].number)}>Click</button> */}
    </main>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Pokemons {
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
  // console.log(data);

  return {
    props: {
      data: data.pokemons,
    },
  };
}
