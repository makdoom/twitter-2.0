import { HiOutlineSearch } from "react-icons/hi";
import { followResults } from "../data/followResult.";
import { trendingResults } from "../data/trendingResult";
import Trending from "./Trending";

const Widget = () => {
  return (
    <div className="hidden lg:inline ml-5 xl:w-[350px] py-1 space-y-4">
      <div className=" sticky top-0 z-50 py-2 w-11/12 xl:w-full bg-primaryBackground">
        <div className="flex items-center bg-ternaryBackground p-3 rounded-xl relative">
          <HiOutlineSearch className="text-secondaryText text-lg z-50" />
          <input
            type="text"
            className="bg-transparent outline-none text-[#d9d9d9] absolute inset-0 pl-11  border border-transparent w-full  rounded-full placeholder-secondaryText"
            placeholder="Search Twitter"
          />
        </div>
      </div>

      <div className="text-[#d9d9d9] space-y-3 bg-ternaryBackground pt-2 rounded-xl w-11/12 xl:w-full">
        <h4 className="font-bold text-xl px-4">What's happening</h4>
        {trendingResults.map((result, index) => (
          <Trending key={index} result={result} />
        ))}
        <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-primaryColor  font-semibold">
          Show more
        </button>
      </div>

      <div className="text-[#d9d9d9] space-y-3 mt-3 bg-ternaryBackground pt-2 rounded-xl w-11/12 xl:w-full">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        {followResults.map((result, index) => (
          <div
            className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center"
            key={index}
          >
            <img
              src={result.userImg}
              width={50}
              height={50}
              objectFit="cover"
              className="rounded-full"
              alt="follow"
            />
            <div className="ml-4 leading-5 group">
              <h4 className="font-bold group-hover:underline">
                {result.username}
              </h4>
              <h5 className="text-secondaryText  text-[15px]">{result.tag}</h5>
            </div>
            <button className="ml-auto bg-primaryColor text-white rounded-full font-bold text-sm py-1.5 px-3.5">
              Follow
            </button>
          </div>
        ))}
        <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-primaryColor font-semibold">
          Show more
        </button>
      </div>
    </div>
  );
};
export default Widget;
