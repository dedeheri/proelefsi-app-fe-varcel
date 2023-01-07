import { ArrowPathIcon } from "@heroicons/react/24/solid";

function TryAgain({ message, onClick }) {
  return (
    <div className="flex justify-between w-full">
      <p className="font-medium">{message}</p>
      <div
        onClick={onClick}
        className="flex cursor-pointer items-center space-x-1 text-green-600"
      >
        <ArrowPathIcon className="h-4" />
        <h1 className="font-medium">Try Again</h1>
      </div>
    </div>
  );
}

export default TryAgain;
