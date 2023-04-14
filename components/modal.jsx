import { XMarkIcon } from "@heroicons/react/24/solid";

export default function Modal({ isOpen, onClose, title, children }) {
  const handleClose = e => {
    if (e.target.id === "wrapper") onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id='wrapper'
      onClick={handleClose}
      className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'
    >
      <div className='bg-gray-500 flex flex-col rounded-md py-4 px-8 border border-gray-800'>
        {/* modal close btn */}
        <XMarkIcon
          onClick={onClose}
          className='h-6 w-6 place-self-end cursor-pointer hover:text-gray-300'
        />
        {/* modal title */}
        <p className='text-2xl'>{title}</p>
        {/* modal content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
