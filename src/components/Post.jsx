import {
  HiDotsHorizontal,
  HiOutlineUpload,
  HiOutlineTrash,
} from "react-icons/hi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const Post = ({ image }) => {
  return (
    <div className="rounded-xl p-4 mt-4 bg-secondaryBackground  cursor-pointer">
      <div className="flex">
        <img
          src="https://lh3.googleusercontent.com/ogw/ADea4I6K2Iff2mb3KD9xK-vNjlz6HALyQO8g5G_4x_KlHmk=s32-c-mo"
          alt="user-profile"
          className="h-11 w-11 rounded-full mr-4"
        />
        <div className="flex justify-between w-full ">
          <div className="flex flex-col flex-grow w-full">
            <div className="flex items-center">
              <h4 className="text-[17px] font-bold mr-2">Makdoom Shaikh</h4>
              <span className="text-secondaryText text-[14px]">
                @shaikh_makdoom
              </span>
            </div>
            <span className="text-secondaryText text-sm">2 minutes ago</span>

            <p className="mt-3">Testing tweet 🚀🚀🚀</p>
            {image && (
              <div className="">
                <img
                  src="https://www.readree.com/wp-content/uploads/2021/01/Search-Engines-That-Search-for-Duplicate-images.jpg"
                  className="max-h-96 rounded-xl mt-4 object-contain"
                />
              </div>
            )}
            <div className="mt-5 flex w-full">
              <div className="p-3 hover:bg-opacity-80 w-full justify-center mr-4  text-sm flex items-center rounded-lg bg-ternaryBackground">
                <BsHeart />
                <span className="ml-2 text-[.79rem]">Likes</span>
              </div>
              <div className="p-3 hover:bg-opacity-80 w-full justify-center mr-4  text-sm flex items-center  rounded-lg bg-ternaryBackground">
                <IoChatbubbleOutline />
                <span className="ml-2 text-[.79rem]">Comment</span>
              </div>

              <div className="p-3 hover:bg-opacity-80 w-full justify-center mr-4  text-sm flex items-center  rounded-lg bg-ternaryBackground">
                <HiOutlineUpload className="text-xl" />
                <span className="ml-2 text-[.79rem]">Share</span>
              </div>
              <div className="p-3 px-4 hover:text-red-500 transition duration-200 ease-linear  justify-center mr-4  text-lg flex items-center  rounded-lg border-2 border-ternaryBackground">
                <HiOutlineTrash />
              </div>
            </div>
          </div>
          <HiDotsHorizontal className="mt-1.5 text-xl text-secondaryText" />
        </div>
      </div>
    </div>
  );
};
export default Post;
