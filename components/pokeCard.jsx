import Image from "next/image";
import { useRouter } from "next/router";
import ColorTag from "./colorTag";

export default function PokeCard({ data }) {
  const router = useRouter();

  const handleRouteToDetailsPage = () => {
    router.push(`/${data.name}`);
  };

  return (
    <div className='w-full h-[300px]'>
      {/* image */}
      <div
        className='h-2/3 flex justify-center items-center p-8 bg-white rounded-md cursor-pointer shadow-md transition ease-in-out hover:scale-105 duration-300'
        onClick={handleRouteToDetailsPage}
      >
        <Image
          alt={data.name}
          src={data.image}
          width='0'
          height='0'
          sizes='(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 30vw'
          className='w-auto h-full'
        />
      </div>
      {/* details */}
      <div className='flex flex-col p-2'>
        <p className='text-sm text-gray-600'>&#35;{data.number}</p>
        <p className='text-xl'>{data.name}</p>
        <ColorTag items={data.types} color='bg-gray-300' style='!w-auto !px-2' />
      </div>
    </div>
  );
}
