import client from "@/apollo-client";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { first20PokemonNames } from "@/data/pokemonNames";
import Image from "next/image";
import ColorTag from "@/components/colorTag";

export default function PokemonDetails({ pokemon }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className='h-[100vh] flex justify-center items-center'>
        <p className='text-2xl font-semibold'>Loading...</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto text-lg mb-10'>
      {/* title */}
      <div className='flex justify-center space-x-5 text-4xl mt-10'>
        <p className='font-semibold'>{pokemon.name}</p>
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
        </div>
      </div>
    </div>
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
