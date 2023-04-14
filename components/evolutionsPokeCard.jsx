import Image from "next/image";
import { ChevronDoubleRightIcon, StopIcon } from "@heroicons/react/24/solid";
import ColorTag from "./colorTag";

export default function EvolutionsPokeCard({ data, dataIndex, datasLength }) {
  return (
    <div className=''>
      <div className='flex items-center'>
        <div className='w-[150px] h-[150px] flex justify-center items-center p-5 mx-1 bg-white rounded-full border-4 border-gray-800 overflow-hidden'>
          <Image
            alt={data?.name}
            src={data?.image}
            width='0'
            height='0'
            sizes='(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 30vw'
            className='w-auto h-full'
          />
        </div>
        {!datasLength ? (
          data?.evolutions ? (
            <ChevronDoubleRightIcon className='h-6 w-6' />
          ) : (
            <StopIcon className='h-5 w-5' />
          )
        ) : datasLength - 1 === dataIndex ? (
          <StopIcon className='h-5 w-5' />
        ) : (
          <ChevronDoubleRightIcon className='h-6 w-6' />
        )}
      </div>
      <div className='flex space-x-2'>
        <p>{data?.name}</p>
        <p className='text-gray-800'>&#35;{data?.number}</p>
      </div>
      <ColorTag items={data?.types} color='bg-gray-300 bg-opacity-50' style='!w-auto !px-2' />
    </div>
  );
}
