import {
  HiDotsHorizontal,
  HiOutlineUpload,
  HiOutlineTrash,
} from "react-icons/hi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { selectedModal, setModalOpen } from "../features/modal/modalSlice";
import Moment from "react-moment";

const Post = ({ id, post, postPage }) => {
  const dispatch = useDispatch();
  const modalState = useSelector(selectedModal);

  return (
    <div className="rounded-xl p-4 mt-4 bg-secondaryBackground cursor-pointer">
      <div className="flex">
        {!postPage && (
          <img
            src={post?.userImage}
            alt="user-profile"
            className="h-11 w-11 rounded-full mr-4"
          />
        )}
        <div className="flex justify-between w-full ">
          <div className="flex flex-col flex-grow w-full">
            <div className="flex items-center">
              <h4 className="text-[17px] font-bold mr-2">{post?.name}</h4>
              <span className="text-secondaryText text-[14px]">
                @{post?.userName}
              </span>
            </div>
            <span className="text-secondaryText text-sm">
              <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
            </span>

            <p className="mt-4">{post?.text}</p>
            {post?.image && (
              <div className="w-[90%]">
                <img
                  src={post?.image}
                  className="max-h-[20rem] rounded-xl mt-4 object-cover"
                  alt="tweetimg"
                />
              </div>
            )}

            <div className="mt-4 flex w-full">
              <div className="p-2 sm:p-3 hover:bg-opacity-80 w-full justify-center mr-4  text-sm flex items-center rounded-lg bg-ternaryBackground">
                <BsHeart />
                <span className=" ml-2 text-[.79rem] ">Likes</span>
              </div>
              <div
                className="p-3 hover:bg-opacity-80 w-full justify-center mr-4  text-sm flex items-center  rounded-lg bg-ternaryBackground"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setModalOpen(id));
                }}
              >
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
        </div>
        <HiDotsHorizontal className="mt-1.5 text-xl text-secondaryText" />
      </div>
    </div>
  );
};
export default Post;
