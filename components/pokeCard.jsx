import Image from "next/image";

export default function PokeCard({ data }) {
  return (
    <div className='w-[200px] h-[300px]'>
      {/* image */}
      <div className='h-2/3 flex justify-center items-center p-8 bg-white rounded-md'>
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
        <div className='flex space-x-2'>
          {data.types.map((type, i) => (
            <p key={i} className='bg-gray-300 text-sm px-2 rounded-md'>
              {type}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
