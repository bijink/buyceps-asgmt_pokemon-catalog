export default function ColorTag({ items, color, style }) {
  return (
    <div className='flex flex-wrap items-center'>
      {items.map((item, i) => (
        <p
          key={i}
          className={`${style} ${color} text-sm w-[120px] text-center px-1 rounded-sm mr-2 mb-2`}
        >
          {item}
        </p>
      ))}
    </div>
  );
}
