import { HiOutlineSparkles } from "react-icons/hi";
import InputTweet from "./InputTweet";

const Feed = () => {
  return (
    <div className="flex-grow sm:ml-[65px] xl:ml-[300px] border-l border-r border-gray-800 max-w-2xl">
      <div className="text-primaryText flex justify-between items-center py-3 px-3 sticky top-0 z-50 bg-black border-b border-gray-800">
        <p className="font-bold text-lg sm:text-xl">Home</p>
        <HiOutlineSparkles fontSize={20} className="font-bold cursor-pointer" />
      </div>

      {/* Input Tweet  */}
      <InputTweet />
    </div>
  );
};
export default Feed;
