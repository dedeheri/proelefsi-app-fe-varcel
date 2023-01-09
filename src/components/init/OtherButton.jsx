function OtherButton({ label, ...rest }) {
  return (
    <div
      {...rest}
      className="font-medium cursor-pointer text-md border w-full h-10 md:h-11 flex items-center justify-center rounded-md hover:bg-gray-100 duration-300 space-x-3 dark:border-[#353535] dark:hover:bg-[#353535] dark:bg-[#353535]"
    >
      <h1 className="font-medium text-md  whitespace-nowrap flex justify-center">
        {label}
      </h1>
    </div>
  );
}

export default OtherButton;
