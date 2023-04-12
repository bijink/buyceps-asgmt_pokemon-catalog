import { gql } from "@apollo/client";
import client from "../apolla-client";
import Image from "next/image";
import { useState } from "react";

export default function Home({ data }) {
  // console.log(data);
  const [pokemons, setPokemons] = useState(data?.slice(0, 20));

  const handlePage = lastPokeNumber => {
    // console.log(Number(lastPokeNumber));
    let lastPokeNum = Number(lastPokeNumber);
    setPokemons(data.slice(lastPokeNum, lastPokeNum + 20));
  };

  return (
    <main className=''>
      <div className=' w-fit'>
        {pokemons?.map(({ id, number, name, types, image }) => (
          <div key={id} className='bg-slate-300 flex items-center space-x-2 my-2'>
            <p className='text-lg'>&#35;{number}</p>
            <p className='text-2xl'>{name}</p>
            <div>
              {types.map((type, i) => (
                <p key={i}>{type}</p>
              ))}
            </div>
            <Image
              alt={name}
              src={image}
              width={10}
              height={10}
              style={{ width: "auto", height: "auto" }}
              priority
            />
            <br />
          </div>
        ))}
        <button onClick={() => handlePage(pokemons[19].number)}>Click</button>
      </div>
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
