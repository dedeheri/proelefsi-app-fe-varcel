function Table() {
  return (
    <div className="animate-pulse">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="border-b dark:border-[#3A3B3C] px-4 py-5">
          <div className="flex space-x-2 items-center">
            {/* img */}
            <div className="dark:bg-[#3A3B3C] bg-gray-200 w-36 h-28 rounded-md" />
            <div className="space-y-2 w-full">
              {/* title */}
              <div className="dark:bg-[#3A3B3C] bg-gray-200 w-1/4 h-5 rounded-md" />
              {/* content */}
              <div className="dark:bg-[#3A3B3C] bg-gray-200 w-1/2 h-5 rounded-md" />
              <div className="dark:bg-[#3A3B3C] bg-gray-200 w-1/3 h-5 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Table;
