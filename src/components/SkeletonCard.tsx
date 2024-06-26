const SkeletonCard = () => {
  return (
    <div className="flex flex-col gap-4 bg-gray-200 rounded-xl shadow-md p-4 divide-y-2 animate-pulse">
      <div className="w-20 aspect-video mx-auto bg-gray-300 border border-gray-500 rounded"></div>
      <div className="flex flex-col gap-y-2 p-2">
        <div className="h-6 bg-gray-300 rounded w-3/4 mr-auto"></div>
        <div className="text-xs font-bold flex gap-x-1 items-baseline ">
          <div className="w-10 h-4 bg-gray-300 rounded"></div>
          <div className="pl-1 w-20 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="text-xs font-bold flex gap-x-1 items-baseline">
          <div className="w-10 h-4 bg-gray-300 rounded"></div>
          <div className="pl-1 w-20 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="text-xs font-bold flex gap-x-1 items-baseline">
          <div className="w-10 h-4 bg-gray-300 rounded"></div>
          <div className="pl-1 w-20 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
