import client from "@/apollo-client";
import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { first20PokemonNames } from "@/data/pokemonNames";
import Image from "next/image";
import ColorTag from "@/components/colorTag";
import Modal from "@/components/modal";
import { useState } from "react";
import EvolutionsPokeCard from "@/components/evolutionsPokeCard";
import Layout from "@/layout/layout";

const QUERY_POKEMON_EVOLUTIONS = gql`
  query GetPokemonEvolutions($name: String) {
    pokemon(name: $name) {
      number
      name
      types
      image
      evolutions {
        id
        number
        name
        types
        image
      }
    }
  }
`;

export default function PokemonDetails({ pokemon }) {
  const router = useRouter();
  const [getPokemonEvolutions, { data: evolutionsData }] = useLazyQuery(QUERY_POKEMON_EVOLUTIONS);

  const [showModal, setShowModal] = useState(false);

  const handleShowEvolutions = () => {
    setShowModal(true);
    getPokemonEvolutions({ variables: { name: pokemon.name } });
  };

  if (router.isFallback) {
    return (
      <div className='h-[100vh] flex justify-center items-center'>
        <p className='text-2xl font-semibold'>Loading...</p>
      </div>
    );
  }

  return (
    <Layout>
      <div className='text-lg mb-10'>
        {/* title */}
        <div className='flex justify-center space-x-5 text-4xl font-mono mt-5'>
          <p className='font-semibold text-gray-700'>{pokemon.name}</p>
          <p className='text-gray-600'>&#35;{pokemon.number}</p>
        </div>
        {/* main */}
        <div className='flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 mt-10'>
          {/* image */}
          <div className='w-full md:w-1/2 flex justify-center items-center bg-white rounded-md'>
            <div className='w-full xl:w-auto flex justify-center p-8'>
              <Image
                alt={pokemon.name}
                src={pokemon.image}
                width='0'
                height='0'
                sizes='(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 30vw'
                className='w-full h-full'
              />
            </div>
          </div>
          {/* details */}
          <div className='w-full md:w-1/2 bg-sky-300 rounded-md flex flex-col space-y-5 px-10 py-5 font-mono'>
            <p className='text-xl font-medium font-sans'>{pokemon.classification}</p>
            <div className='flex flex-col space-y-1'>
              <p>Type : </p>
              <ColorTag items={pokemon.types} color='bg-blue-400' style='!py-2 !rounded-md' />
            </div>
            <p>
              Height: {pokemon.height.minimum} - {pokemon.height.maximum}
            </p>
            <p>
              Weight: {pokemon.weight.minimum} - {pokemon.weight.maximum}
            </p>
            <div className='flex flex-col space-y-1'>
              <p>Weaknesses : </p>
              <ColorTag items={pokemon.weaknesses} color='bg-red-400' style='!py-2 !rounded-md' />
            </div>
            <div className='flex flex-col space-y-1'>
              <p>Resistant : </p>
              <ColorTag items={pokemon.resistant} color='bg-green-500' style='!py-2 !rounded-md' />
            </div>
            <button onClick={handleShowEvolutions} className='btn btn-blue'>
              Show Evolutions
            </button>
          </div>
        </div>
      </div>
      {/* Evolutions popup modal */}
      {showModal && evolutionsData ? (
        <Modal title='Evolutions' isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className='flex flex-col sm:flex-row justify-center items-center mt-3'>
            <EvolutionsPokeCard data={evolutionsData.pokemon} />
            {evolutionsData.pokemon?.evolutions?.map((item, index) => (
              <EvolutionsPokeCard
                key={item.id}
                data={item}
                datasLength={evolutionsData.pokemon.evolutions.length}
                dataIndex={index}
              />
            ))}
          </div>
        </Modal>
      ) : null}
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = first20PokemonNames.map(item => {
    return {
      params: {
        details: item.name,
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const {
    params: { details: pokeName },
  } = context;

  const { data } = await client.query({
    query: gql`
      query Pokemon($name: String) {
        pokemon(name: $name) {
          id
          number
          name
          types
          height {
            minimum
            maximum
          }
          weight {
            minimum
            maximum
          }
          classification
          weaknesses
          resistant
          image
        }
      }
    `,
    variables: {
      name: pokeName,
    },
  });

  if (!data.pokemon) {
    return {
      notFound: true,
    };
  }

  return {
    props: { pokemon: data.pokemon },
  };
}
